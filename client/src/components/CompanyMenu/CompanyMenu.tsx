import { useState } from "react";
import { NavLink } from "react-router-dom";

import css from "./CompanyMenu.module.css";
import { SignInModal } from "../SignIn/SignIn";
import { SignUpModal } from "../SignUp/SignUp";

const CompanyMenu = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
      <nav className={css.nav}>
        <button
          onClick={() => setIsSignInOpen(true)}
          className={css.authButton}
        >
          Login
        </button>
        <button
          onClick={() => setIsSignUpOpen(true)}
          className={css.authButton}
        >
          Sign Up
        </button>
        <NavLink to="/privacy" className={css.navLink}>
          Privacy
        </NavLink>
        <NavLink to="/products" className={css.navLink}>
          Products
        </NavLink>
      </nav>

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </>
  );
};

export default CompanyMenu;
