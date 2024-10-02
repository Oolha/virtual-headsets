import { IoMdMenu, IoMdArrowForward } from "react-icons/io";
import {
  PiMagnifyingGlassBold,
  PiStarFourFill,
  PiTwitterLogoFill,
  PiInstagramLogoFill,
  PiDiscordLogoFill,
} from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineExplore, MdOutlineFacebook } from "react-icons/md";

import css from "./Header.module.css";

const Header = ({}) => {
  return (
    <div className={css.header}>
      <div className={css.panel}>
        <div className={css.box1}>
          <button className={css.menuBtn}>
            <IoMdMenu className={css.menuIcon} />
          </button>
        </div>
        <h3 className={css.nameBrand}>
          <span className={css.span}>Holo</span>Gaze
          <span className={css.span}>.</span>
        </h3>
        <div className={css.box2}>
          <button className={css.headerBtns}>
            <PiMagnifyingGlassBold className={css.icons} />
          </button>
          <button className={css.headerBtns}>
            <BiShoppingBag className={css.icons} />
          </button>
        </div>
      </div>
      <h3 className={css.productName}>virtual headsets</h3>
      <h2 className={css.title}>Experience a new dimension of reality</h2>
      <div className={css.textBox}>
        <PiStarFourFill className={css.textIcon} />
        <p className={css.text}>
          Step into the future with our virtual headset, come to life right
          before your eyes
        </p>
      </div>
      <div className={css.btnsBox}>
        <button className={css.visitStoreBtn}>
          Visit Store <IoMdArrowForward className={css.arrowIcon} />
        </button>
        <button className={css.exploreBtn}>
          <MdOutlineExplore className={css.exploreIcon} />
          Explore
        </button>
      </div>
      <p className={css.textFollowUs}>Follow us</p>
      <div className={css.links}>
        <button className={css.linkBtn}>
          <PiTwitterLogoFill className={css.linkIcon} />
        </button>
        <button className={css.linkBtn}>
          <PiInstagramLogoFill className={css.linkIcon} />
        </button>
        <button className={css.linkBtn}>
          <PiDiscordLogoFill className={css.linkIcon} />
        </button>
        <button className={css.linkBtn}>
          <MdOutlineFacebook className={css.linkIcon} />
        </button>
      </div>
    </div>
  );
};

export default Header;
