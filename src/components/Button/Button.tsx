import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  typeBtn?: "apply" | "cancel";
}

const Button = ({
  children,
  className = "",
  typeBtn = "apply",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className} ${styles[`button--${typeBtn}`]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
