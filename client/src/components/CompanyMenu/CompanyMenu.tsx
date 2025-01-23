import { NavLink } from "react-router-dom";
import css from "./CompanyMenu.module.css";
import { useAuthModals } from "../../redux/hooks/hooks";
import { AuthModals } from "../AuthModals/AuthModals";

const CompanyMenu = () => {
  const {
    isSignInOpen,
    isSignUpOpen,
    openSignIn,
    openSignUp,
    closeSignIn,
    closeSignUp,
  } = useAuthModals();

  return (
    <>
      <nav className={css.nav}>
        <button onClick={openSignIn} className={css.authButton}>
          Login
        </button>
        <button onClick={openSignUp} className={css.authButton}>
          Sign Up
        </button>
        <NavLink to="/" className={css.navLink}>
          Privacy
        </NavLink>
      </nav>
      <AuthModals
        isSignInOpen={isSignInOpen}
        isSignUpOpen={isSignUpOpen}
        closeSignIn={closeSignIn}
        closeSignUp={closeSignUp}
        openSignIn={openSignIn}
        openSignUp={openSignUp}
      />
    </>
  );
};

export default CompanyMenu;
