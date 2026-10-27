import type { ReactNode } from "react";
import styles from "./CardFormField.module.css";

interface CardFormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

const CardFormField = ({
  label,
  error,
  required = false,
  children,
}: CardFormFieldProps) => {
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ""}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      {children}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default CardFormField;
