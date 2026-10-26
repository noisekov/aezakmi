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
      navigate("/");
    } else {
      //ошибки валидации
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={submit}>
        <input
          className={styles.input}
          type="text"
          name="login"
          placeholder="Введите ваш логин"
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Введите ваш пароль"
        />
        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
};

export default Login;
