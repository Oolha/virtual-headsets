import CompanyMenu from "../CompanyMenu/CompanyMenu";
import Logo from "../Logo/Logo";
import NavMenu from "../NavMenu/NavMenu";
import SocialLinks from "../SocialLinks/SocialLinks";
import Subscription from "../Subscription/Subscription";
import css from "./Footer.module.css";

import lineDesktop from "/images/desktop/Line-footer-desktop.png";
import lineMobile from "/images/mobile/Line-footer-mobile.png";

const Footer = ({}) => {
  return (
    <div id="contact" className={css.footer}>
      <div className={css.contentContainer}>
        <div className={css.footerBox}>
          <div className={css.logoAndLinksBox}>
            <Logo />
            <SocialLinks />
            <p className={css.phoneNumber}>(+994) 199-28-786</p>
          </div>

          <div className={css.navLinks}>
            <div className={css.container}>
              <h4 className={css.title}>Menu</h4>
              <NavMenu />
            </div>
            <div className={css.container}>
              <h4 className={css.title}>Company</h4>
              <CompanyMenu />
            </div>
          </div>
          <Subscription />
        </div>
        <div className={css.footerEndBox}>
          <picture className={css.linesPicture}>
            <source srcSet={lineDesktop} media="(min-width: 1440px)" />
            <source srcSet={lineMobile} media="(min-width: 320px)" />
            <img src={lineDesktop} alt="line" />
          </picture>
          <p className={css.rights}>© 2025 HoloGaze. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
