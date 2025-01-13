import CompanyMenu from "../CompanyMenu/CompanyMenu";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";
import NavMenu from "../NavMenu/NavMenu";
import SocialLinks from "../SocialLinks/SocialLinks";
import Subscription from "../Subscription/Subscription";
import css from "./Footer.module.css";

const Footer = ({}) => {
  return (
    <div className={css.footer}>
      <div className={css.footerBox}>
        <div className={css.logoAndLinksBox}>
          <Logo />
          <SocialLinks />
          <p className={css.phoneNumber}>(+994) 199-28-786</p>
        </div>

        <div className={css.navLinks}>
          <div>
            <h4 className={css.title}>Menu</h4>
            <NavMenu />
          </div>
          <div>
            <h4 className={css.title}>Company</h4>
            <CompanyMenu />
          </div>
        </div>
        <Subscription />
      </div>
      <div className={css.footerEndBox}>
        <picture className={css.linesPicture}>
          <source
            srcSet="../../../public/images/desktop/Line-footer-desktop.png"
            media="(min-width: 1440px)"
          />
          <source
            srcSet="../../../public/images/mobile/Line-footer-mobile.png"
            media="(min-width: 320px)"
          />
          <img
            src="../../../public/images/desktop/Line-footer-desktop.png"
            alt="line"
          />
        </picture>
        <p className={css.rights}>© 2025 HoloGaze. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
