import type { CurrencyInfo, Period } from "../types/currency";

export const CURRENCIES: CurrencyInfo[] = [
  { code: "AUD", name: "Australian Dollar", flagCode: "au" },
  { code: "BRL", name: "Brazilian Real", flagCode: "br" },
  { code: "CAD", name: "Canadian Dollar", flagCode: "ca" },
  { code: "CHF", name: "Swiss Franc", flagCode: "ch" },
  { code: "EUR", name: "Euro", flagCode: "eu" },
  { code: "GBP", name: "British Pound", flagCode: "gb" },
  { code: "JPY", name: "Japanese Yen", flagCode: "jp" },
  { code: "NZD", name: "New Zealand Dollar", flagCode: "nz" },
];

const DAYS = {
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  HALF_YEAR: 180,
  YEAR: 365,
} as const;

export const PERIOD_DAYS: Record<Period, number> = {
  "1W": DAYS.WEEK,
  "1M": DAYS.MONTH,
  "3M": DAYS.QUARTER,
  "6M": DAYS.HALF_YEAR,
  "1Y": DAYS.YEAR,
};

export const PERIODS: { label: Period; days: number }[] = [
  { label: "1W", days: DAYS.WEEK },
  { label: "1M", days: DAYS.MONTH },
  { label: "3M", days: DAYS.QUARTER },
  { label: "6M", days: DAYS.HALF_YEAR },
  { label: "1Y", days: DAYS.YEAR },
];
