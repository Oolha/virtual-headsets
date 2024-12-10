import CompanyMenu from "../CompanyMenu/CompanyMenu";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";
import NavMenu from "../NavMenu/NavMenu";
import SocialLinks from "../SocialLinks/SocialLinks";
import Subscription from "../Subscription/subscription";
import css from "./Footer.module.css";
import { useState } from "react";

const Footer = ({}) => {
  return (
    <div className={css.footerBox}>
      <div className={css.logoAndLinksBox}>
        <Logo />
        <SocialLinks />
      </div>
      <p className={css.phoneNumber}>(+994) 199-28-786</p>
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
  );
};

export default Footer;
