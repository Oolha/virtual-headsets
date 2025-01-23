import { NavLink, useLocation, useNavigate } from "react-router-dom";
import css from "./NavBar.module.css";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import MobileMenu from "../MobileMenu/MobileMenu";
import { handleSectionNavigation, navLinks } from "../../config/navigation";

const NavBar = ({}) => {
  const navigate = useNavigate();
  const [isOpenNavigation, setOpenNavigation] = useState<boolean>(false);

  const linkVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <nav className={css.nav}>
      <button className={css.menuBtn} onClick={() => setOpenNavigation(true)}>
        <IoMdMenu className={css.menuIcon} />
      </button>

      <div className={css.navMenu}>
        {navLinks.map(({ path, label, isSection }) => (
          <NavLink
            key={label}
            to={path}
            className={css.navLink}
            onClick={(e) =>
              handleSectionNavigation(path, isSection, e, navigate)
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <MobileMenu
        isOpen={isOpenNavigation}
        onClose={() => setOpenNavigation(false)}
      >
        {navLinks.map(({ path, label, isSection }) => (
          <motion.div key={label} variants={linkVariants}>
            <NavLink
              to={path}
              className={css.navLink}
              onClick={(e) =>
                handleSectionNavigation(path, isSection, e, navigate, () =>
                  setOpenNavigation(false)
                )
              }
            >
              {label}
            </NavLink>
          </motion.div>
        ))}
      </MobileMenu>
    </nav>
  );
};

export default NavBar;
