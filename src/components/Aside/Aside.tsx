import styles from "./Aside.module.css";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

const Aside = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutAction = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className={`${styles.aside} ${menuOpen ? styles.open : ""}`}>
      <button
        className={styles.logo}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen && "Dashboard"}
      </button>

      <nav className={styles.menu}>
        {menuOpen && <span className={styles.menu__title}>Menu</span>}

        <NavLink
          to="/rates"
          end
          className={({ isActive }) =>
            [
              styles.menu__item,
              styles["menu__item-rates"],
              isActive ? styles.active : "",
            ]
              .filter(Boolean)
              .join(" ")
          }
        >
          {menuOpen ? "Exchange Rates" : "Rates"}
        </NavLink>

        <NavLink
          to="/cards"
          end
          className={({ isActive }) =>
            [
              styles.menu__item,
              styles["menu__item-cards"],
              isActive ? styles.active : "",
            ]
              .filter(Boolean)
              .join(" ")
          }
        >
          {menuOpen ? "Kanban Cards" : "Cards"}
        </NavLink>
      </nav>

      <button className={styles.logout} onClick={logoutAction}>
        Logout
      </button>
    </div>
  );
};

export default Aside;
