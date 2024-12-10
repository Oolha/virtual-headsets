import { NavLink } from "react-router-dom";
import css from "./NavMenu.module.css";

const NavMenu = ({}) => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={css.navLink}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={css.navLink}>
        Catalog
      </NavLink>
      <NavLink to="/contact" className={css.navLink}>
        Contact
      </NavLink>
      <NavLink to="/" className={css.navLink}>
        Features
      </NavLink>
    </nav>
  );
};

export default NavMenu;
