import { CURRENCIES, PERIOD_DAYS } from "../utils/currencies";
import { getDateString } from "../utils/currencyFormatters";
import type {
  ApiRate,
  CurrencyCode,
  CurrencyTableRow,
  HistoryPoint,
  Period,
} from "../types/currency";

const API_URL = "https://api.frankfurter.dev/v2";

function isApiRate(value: unknown): value is ApiRate {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "date" in value &&
    typeof value.date === "string" &&
    "base" in value &&
    typeof value.base === "string" &&
    "quote" in value &&
    typeof value.quote === "string" &&
    "rate" in value &&
    typeof value.rate === "number" &&
    Number.isFinite(value.rate) &&
    value.rate > 0
  );
}

async function fetchRateSeries(
  quotes: string[],
  from: string,
  to: string,
  signal: AbortSignal,
): Promise<ApiRate[]> {
  const url = new URL(`${API_URL}/rates`);

  url.searchParams.set("base", "USD");
  url.searchParams.set("quotes", quotes.join(","));
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    throw new Error("Не удалось получить курсы валют.");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("API вернул некорректные данные.");
  }

  return data.filter(isApiRate);
}

export async function getTableRates(
  signal: AbortSignal,
): Promise<CurrencyTableRow[]> {
  const today = new Date();
  const from = new Date(today);

  from.setDate(from.getDate() - 30);

  const rates = await fetchRateSeries(
    CURRENCIES.map((currency) => currency.code),
    getDateString(from),
    getDateString(today),
    signal,
  );

  const rows: CurrencyTableRow[] = [];

  for (const currency of CURRENCIES) {
    const currencyRates = rates
      .filter((item) => item.quote === currency.code)
      .sort((a, b) => a.date.localeCompare(b.date));

    const latest = currencyRates[currencyRates.length - 1];

    if (!latest) {
      continue;
    }

    const previous = currencyRates[currencyRates.length - 2];

    const previousRate = previous?.rate ?? null;
    const currentRate = latest.rate;

    const change = previousRate !== null ? currentRate - previousRate : null;

    const changePercent =
      previousRate !== null && previousRate !== 0 && change !== null
        ? (change / previousRate) * 100
        : null;

    rows.push({
      ...currency,
      previousRate,
      currentRate,
      change,
      changePercent,
      date: latest.date,
    });
  }

  if (rows.length === 0) {
    throw new Error("API не вернул доступные курсы валют.");
  }

  return rows;
}

export async function getCurrencyHistory(
  currency: CurrencyCode,
  period: Period,
  signal: AbortSignal,
): Promise<HistoryPoint[]> {
  const today = new Date();
  const from = new Date(today);

  from.setDate(from.getDate() - PERIOD_DAYS[period]);

  const rates = await fetchRateSeries(
    [currency],
    getDateString(from),
    getDateString(today),
    signal,
  );

  return rates
    .filter((item) => item.quote === currency)
    .map((item) => ({
      date: item.date,
      rate: item.rate,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
