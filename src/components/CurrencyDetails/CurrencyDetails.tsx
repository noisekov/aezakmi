import { PERIODS } from "../../utils/currencies";
import { formatPercent, formatRate } from "../../utils/currencyFormatters";
import type {
  CurrencyTableRow,
  HistoryPoint,
  Period,
} from "../../types/currency";
import styles from "./CurrencyDetails.module.css";
import RateChart from "../RateChart/RateChart";

interface CurrencyDetailsProps {
  currency: CurrencyTableRow;
  period: Period;
  history: HistoryPoint[];
  loading: boolean;
  error: string;
  onPeriodChange: (period: Period) => void;
}

const CurrencyDetails = ({
  currency,
  period,
  history,
  loading,
  error,
  onPeriodChange,
}: CurrencyDetailsProps) => {
  const firstPoint = history[0];
  const lastPoint = history[history.length - 1];

  const changePercent =
    firstPoint && lastPoint && firstPoint.rate !== 0
      ? ((lastPoint.rate - firstPoint.rate) / firstPoint.rate) * 100
      : null;

  let changeClass = styles.neutral;

  if (changePercent !== null && changePercent > 0) {
    changeClass = styles.positive;
  } else if (changePercent !== null && changePercent < 0) {
    changeClass = styles.negative;
  }

  return (
    <aside className={styles.panel} data-currency-details>
      <div className={styles.heading}>
        <span className={styles.flag}>{currency.flag}</span>

        <div className={styles.headingText}>
          <h2 className={styles.title}>USD / {currency.code}</h2>

          <p className={styles.subtitle}>{currency.name} per 1 USD</p>
        </div>
      </div>

      <div className={styles.rateSummary}>
        <span className={styles.bigRate}>
          {formatRate(currency.currentRate)}
        </span>

        {!loading && changePercent !== null && (
          <span className={`${styles.changeBadge} ${changeClass}`}>
            {changePercent > 0 ? "▲" : changePercent < 0 ? "▼" : "•"}{" "}
            {formatPercent(changePercent)}
          </span>
        )}
      </div>

      <RateChart points={history} loading={loading} error={error} />

      <div
        className={styles.periods}
        role="group"
        aria-label="Historical period"
      >
        {PERIODS.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`${styles.periodButton} ${
              period === item.label ? styles.periodButtonActive : ""
            }`}
            onClick={() => onPeriodChange(item.label)}
            aria-pressed={period === item.label}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default CurrencyDetails;
