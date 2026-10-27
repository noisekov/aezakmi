import Body from "../Body/Body";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors";
import Aside from "../Aside/Aside";
import styles from "./Page.module.css";

const Page = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <>
      <div className={styles.page}>
        {isAuthenticated && <Aside />}
        <Body />
      </div>
    </>
  );
};

export default Page;
