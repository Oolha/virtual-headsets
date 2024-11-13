import { NavLink } from "react-router-dom";
import css from "./NavBar.module.css";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const NavBar = ({}) => {
  const [isOpenNavigation, setOpenNavigation] = useState<boolean>(false);
  const toggleMenu = () => {
    setOpenNavigation(!isOpenNavigation);
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains(css.navMenu)) {
      setOpenNavigation(false);
    }
  };
  return (
    <nav className={css.nav}>
      <button className={css.menuBtn} onClick={toggleMenu}>
        {!isOpenNavigation ? <IoMdMenu className={css.menuIcon} /> : null}
      </button>

      <div
        className={`${css.navMenu} ${isOpenNavigation ? css.isOpen : ""}`}
        onClick={handleMenuClick}
      >
        <button onClick={toggleMenu} className={css.closeBtn}>
          <FaWindowClose className={css.navCloseBtn} />
        </button>
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
      </div>
    </nav>
  );
};

export default NavBar;
