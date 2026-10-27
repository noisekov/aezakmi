import { useEffect, useState } from "react";
import { formatDate } from "../../utils/currencyFormatters";
import type { CurrencyCode, Period } from "../../types/currency";
import styles from "./CurrencyRates.module.css";
import useExchangeRates from "../../hooks/useExchangeRates";
import useCurrencyHistory from "../../hooks/useCurrencyHistory";
import CurrencyTable from "../CurrencyTable/CurrencyTable";
import CurrencyDetails from "../CurrencyDetails/CurrencyDetails";

const CurrencyRates = () => {
  const { rows, loading, error } = useExchangeRates();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode | null>(
    null,
  );
  const [period, setPeriod] = useState<Period>("1M");

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (
        target.closest("[data-currency-table]") ||
        target.closest("[data-currency-details]")
      ) {
        return;
      }

      setSelectedCurrency(null);
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  const selectedRow = rows.find((row) => row.code === selectedCurrency);

  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useCurrencyHistory(selectedCurrency, period);

  function handleSelectCurrency(code: CurrencyCode) {
    setSelectedCurrency(code);
  }

  return (
    <section
      className={`${styles.page} ${selectedRow ? styles.pageWithDetails : ""}`}
    >
      <div className={styles.mainColumn}>
        <header className={styles.headingRow}>
          <h1 className={styles.pageTitle}>Exchange rates</h1>

          <span className={styles.dateBadge}>
            {rows[0] ? formatDate(rows[0].date) : "Latest rates"}
          </span>
        </header>

        <CurrencyTable
          rows={rows}
          selectedCurrency={selectedCurrency}
          loading={loading}
          error={error}
          onSelect={handleSelectCurrency}
        />
      </div>

      {selectedRow && (
        <CurrencyDetails
          currency={selectedRow}
          period={period}
          history={history}
          loading={historyLoading}
          error={historyError}
          onPeriodChange={setPeriod}
        />
      )}
    </section>
  );
};
export default CurrencyRates;
