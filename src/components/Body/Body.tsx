import styles from "./Body.module.css";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div className={styles.body}>
      <Outlet />
    </div>
  );
};

export default Body;
