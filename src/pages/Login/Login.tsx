import { validateUser } from "../../utils/validateUser";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { store } from "../../store/store";
import Button from "../../components/Button/Button";
import { login } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginVal = formData.get("login");
    const passwordVal = formData.get("password");

    const isValidUser = validateUser(loginVal, passwordVal);

    if (isValidUser && loginVal && typeof loginVal === "string") {
      store.dispatch(login(loginVal));
      navigate("/cards", { replace: true });
    } else {
      //ошибки валидации
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={submit}>
        <h1 className={styles.title}>Log in</h1>
        <p className={styles.subtitle}>Welcome Back</p>
        <div className={styles.input__container}>
          <input
            className={`${styles.input} ${styles.input__email}`}
            type="text"
            name="login"
            placeholder="Email Address"
          />
          <input
            className={`${styles.input} ${styles.input__password}`}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <Button className={styles.btn} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
