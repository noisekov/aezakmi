export type CurrencyCode =
  | "AUD"
  | "BRL"
  | "CAD"
  | "CHF"
  | "EUR"
  | "GBP"
  | "JPY"
  | "NZD";

export type Period = "1W" | "1M" | "3M" | "6M" | "1Y";

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  flag: string;
}

export interface ApiRate {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export interface CurrencyTableRow extends CurrencyInfo {
  previousRate: number | null;
  currentRate: number;
  change: number | null;
  changePercent: number | null;
  date: string;
}

export interface HistoryPoint {
  date: string;
  rate: number;
}
