import styles from "./Aside.module.css";
import { useAppDispatch } from "../../store/hooks";
import Button from "../Button/Button";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router";

const Aside = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutAction = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.aside}>
      <div>button block</div>
      <Button typeBtn={"apply"} onClick={logoutAction}>
        Выйти
      </Button>
    </div>
  );
};

export default Aside;
