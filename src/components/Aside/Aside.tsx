import styles from "./Aside.module.css";
import { useAppDispatch } from "../../store/hooks";
import Button from "../Button/Button";
import { logout } from "../../store/authSlice";

const Aside = () => {
  const dispatch = useAppDispatch();

  const logoutAction = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.aside}>
      <div>button block</div>
      <Button onClick={logoutAction}>Выйти</Button>
    </div>
  );
};

export default Aside;
