import { PiMagnifyingGlassBold } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";

import css from "./Header.module.css";
import NavBar from "../NavBar/NavBar";
import Logo from "../Logo/Logo";

const Header = ({}) => {
  return (
    <div className={css.header}>
      <div className={css.panel}>
        <div className={css.box1}>
          <NavBar />
        </div>
        <Logo />
        <div className={css.box2}>
          <form className={css.form}>
            <input
              type="text"
              className={css.input}
              placeholder={"Search games & products.."}
            />
            <button className={css.headerBtns}>
              <PiMagnifyingGlassBold className={css.icons} />
            </button>
          </form>

          <button className={css.headerBtns}>
            <BiShoppingBag className={css.icons} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
