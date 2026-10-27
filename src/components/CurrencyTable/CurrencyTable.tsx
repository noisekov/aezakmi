import type { KeyboardEvent } from "react";
import type { CurrencyCode, CurrencyTableRow } from "../../types/currency";
import {
  formatChange,
  formatDate,
  formatPercent,
  formatRate,
} from "../../utils/currencyFormatters";
import styles from "./CurrencyTable.module.css";

interface CurrencyTableProps {
  rows: CurrencyTableRow[];
  selectedCurrency: CurrencyCode | null;
  loading: boolean;
  error: string;
  onSelect: (code: CurrencyCode) => void;
}

const CurrencyTable = ({
  rows,
  selectedCurrency,
  loading,
  error,
  onSelect,
}: CurrencyTableProps) => {
  function handleKeyDown(
    event: KeyboardEvent<HTMLTableRowElement>,
    code: CurrencyCode,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(code);
    }
  }

  if (loading) {
    return <div className={styles.message}>Loading exchange rates...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.tableCard} data-currency-table>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Previous</th>
              <th>Course</th>
              <th>Change</th>
              <th>Change %</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((currency) => {
              const isSelected = selectedCurrency === currency.code;

              let changeClass = "";

              if (currency.change !== null) {
                if (currency.change > 0) {
                  changeClass = styles.positive;
                } else if (currency.change < 0) {
                  changeClass = styles.negative;
                }
              }

              return (
                <tr
                  data-currency-row
                  key={currency.code}
                  className={isSelected ? styles.selectedRow : ""}
                  onClick={() => onSelect(currency.code)}
                  onKeyDown={(event) => handleKeyDown(event, currency.code)}
                  tabIndex={0}
                  aria-selected={isSelected}
                >
                  <td>
                    <div className={styles.currencyInfo}>
                      <span
                        className={`fi fi-${currency.flagCode} ${styles.flag}`}
                        role="img"
                        aria-label={currency.name}
                      />

                      <span className={styles.currencyCode}>
                        {currency.code}
                      </span>

                      <span className={styles.currencyName}>
                        {currency.name}
                      </span>
                    </div>
                  </td>

                  <td>
                    {currency.previousRate === null
                      ? "—"
                      : formatRate(currency.previousRate)}
                  </td>

                  <td className={styles.course}>
                    {formatRate(currency.currentRate)}
                  </td>

                  <td className={changeClass}>
                    {formatChange(currency.change)}
                  </td>

                  <td className={changeClass}>
                    {formatPercent(currency.changePercent)}
                  </td>

                  <td className={styles.date}>{formatDate(currency.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <p className={styles.message}>No currency data available.</p>
      )}
    </div>
  );
};

export default CurrencyTable;
