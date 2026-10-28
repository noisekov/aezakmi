import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { store } from "../../store/store";
import Button from "../../components/Button/Button";
import { login } from "../../store/authSlice";
import { validateEmail, validatePassword } from "../../utils/validateLogin";

const Login = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setErrors((previous) => ({
      ...previous,
      login: previous.login ? validateEmail(value) : "",
    }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setErrors((previous) => ({
      ...previous,
      password: previous.password ? validatePassword(value) : "",
    }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const loginValue = formData.get("login");
    const passwordValue = formData.get("password");
    const email = typeof loginValue === "string" ? loginValue.trim() : "";
    const password = typeof passwordValue === "string" ? passwordValue : "";

    const nextErrors = {
      login: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(nextErrors);

    if (nextErrors.login || nextErrors.password) {
      return;
    }

    store.dispatch(login(email));
    navigate("/cards", { replace: true });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={submit} noValidate>
        <h1 className={styles.title}>Log in</h1>
        <p className={styles.subtitle}>Welcome Back</p>

        <div className={styles.inputContainer}>
          <div className={styles.inputField}>
            <input
              className={`${styles.input} ${styles.inputEmail} ${
                errors.login ? styles.inputInvalid : ""
              }`}
              type="email"
              name="login"
              placeholder="Email Address"
              onChange={handleLoginChange}
            />

            {errors.login && (
              <p className={styles.inputError}>{errors.login}</p>
            )}
          </div>

          <div className={styles.inputField}>
            <input
              className={`${styles.input} ${styles.inputPassword} ${
                errors.password ? styles.inputInvalid : ""
              }`}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />

            {errors.password && (
              <p className={styles.inputError}>{errors.password}</p>
            )}
          </div>
        </div>

        <Button className={styles.btn} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
