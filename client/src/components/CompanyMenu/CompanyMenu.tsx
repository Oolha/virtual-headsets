import { NavLink } from "react-router-dom";
import css from "./CompanyMenu.module.css";

const CompanyMenu = ({}) => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={css.navLink}>
        Login
      </NavLink>
      <NavLink to="/catalog" className={css.navLink}>
        Sign Up
      </NavLink>
      <NavLink to="/contact" className={css.navLink}>
        Privacy
      </NavLink>
      <NavLink to="/catalog" className={css.navLink}>
        Products
      </NavLink>
    </nav>
  );
};

export default CompanyMenu;
