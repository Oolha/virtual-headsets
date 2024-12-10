import { IoMdMenu, IoMdArrowForward } from "react-icons/io";
import { PiMagnifyingGlassBold, PiStarFourFill } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";

import css from "./Header.module.css";
import NavBar from "../NavBar/NavBar";
import Logo from "../Logo/Logo";
import SocialLinks from "../SocialLinks/SocialLinks";

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
      <div className={css.headerBox}>
        <div className={css.firstHeaderBox}>
          <div>
            <h3 className={css.productName}>virtual headsets</h3>
            <picture className={css.linesPicture}>
              <source
                srcSet="../../../public/svg/big-virtual-headsets.svg"
                media="(min-width: 1024px)"
              />
              <img
                src="../../../public/svg/small-virtual-headsets.svg"
                alt="line"
              />
            </picture>
          </div>

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
          <SocialLinks />
        </div>
        <div className={css.secondHeaderBox}>
          <div className={css.pictureBox}>
            <picture className={css.picture}>
              <source
                srcSet="../../../public/images/desktop/hero-desktop@1x.png 1x,
                        ../../../public/images/desktop/hero-desktop@2x.png 2x"
                media="(min-width: 1024px)"
                className={css.heroImg}
              />
              <source
                srcSet="../../../public/images/mobile/hero-mobile@1x.png 1x,
                                        ../../../public/images/mobile/hero-mobile@2x.png 2x"
                media="(min-width: 375px)"
              />
              <img
                src="../../../public/images/desktop/hero-desktop@1x.png 1x"
                alt="man in virtual headsets"
              />
            </picture>
            <picture className={css.linePicture}>
              <source
                srcSet="../../../public/svg/big-line-under-heroImg.svg"
                media="(min-width: 1024px)"
              />
              <img
                src="../../../public/svg/small-line-under-heroImg.svg"
                alt="line"
              />
            </picture>
          </div>

          <div className={css.iconsBox}>
            <div className={css.iconsBox1}>
              <img
                src="../../../public/svg/school.svg"
                alt="school"
                className={css.iconsSvg}
              />
              <p className={css.iconsBoxText}> Enhanced Education</p>
            </div>
            <div className={css.iconsBox2}>
              <img
                src="../../../public/svg/sport.svg"
                alt="training"
                className={css.iconsSvg}
              />
              <p className={css.iconsBoxText}>Training and Simulation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
