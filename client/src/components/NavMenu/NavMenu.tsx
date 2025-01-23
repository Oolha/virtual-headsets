import { NavLink, useNavigate } from "react-router-dom";
import css from "./NavMenu.module.css";
import { handleSectionNavigation, navLinks } from "../../config/navigation";

const NavMenu = ({}) => {
  const navigate = useNavigate();
  return (
    <nav className={css.nav}>
      {navLinks.map(({ path, label, isSection }) => (
        <NavLink
          key={label}
          to={path}
          className={css.navLink}
          onClick={(e) => handleSectionNavigation(path, isSection, e, navigate)}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavMenu;
