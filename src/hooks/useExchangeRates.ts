import { useEffect, useState } from "react";
import type { CurrencyTableRow } from "../types/currency";
import { getTableRates } from "../services/currencyApi";

const useExchangeRates = () => {
  const [rows, setRows] = useState<CurrencyTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadRates() {
      setLoading(true);
      setError("");

      try {
        const data = await getTableRates(controller.signal);
        setRows(data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Ошибка загрузки курсов.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadRates();

    return () => controller.abort();
  }, []);

  return { rows, loading, error };
};

export default useExchangeRates;
