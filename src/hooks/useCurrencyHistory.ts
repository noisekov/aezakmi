import { useEffect, useState } from "react";
import { getCurrencyHistory } from "../services/currencyApi";
import type { CurrencyCode, HistoryPoint, Period } from "../types/currency";

interface HistoryState {
  key: string;
  history: HistoryPoint[];
  error: string;
}

export default function useCurrencyHistory(
  currency: CurrencyCode | null,
  period: Period,
) {
  const [result, setResult] = useState<HistoryState | null>(null);

  const requestKey = currency ? `${currency}:${period}` : null;

  useEffect(() => {
    if (currency === null) {
      return;
    }

    const controller = new AbortController();

    const selectedCurrency = currency;
    const key = `${selectedCurrency}:${period}`;

    async function loadHistory() {
      try {
        const data = await getCurrencyHistory(
          selectedCurrency,
          period,
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        setResult({
          key,
          history: data,
          error: "",
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setResult({
          key,
          history: [],
          error:
            error instanceof Error ? error.message : "Ошибка загрузки истории.",
        });
      }
    }

    void loadHistory();

    return () => controller.abort();
  }, [currency, period]);

  const currentResult =
    requestKey !== null && result?.key === requestKey ? result : null;

  return {
    history: currentResult?.history ?? [],

    loading: requestKey !== null && currentResult === null,

    error: currentResult?.error ?? "",
  };
}
