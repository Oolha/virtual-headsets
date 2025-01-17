import { useEffect, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";

import css from "./Header.module.css";
import NavBar from "../NavBar/NavBar";
import Logo from "../Logo/Logo";
import SearchModal from "../SearchModal/SearchModal";
import {
  useAppDispatch,
  useAppSelector,
  useAuthModals,
} from "../../redux/hooks/hooks";
import { performSearch } from "../../redux/search/searchOperations";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { SignInModal } from "../SignIn/SignIn";
import { AuthModals } from "../AuthModals/AuthModals";

const Header = () => {
  const dispatch = useAppDispatch();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const {
    isSignInOpen,
    isSignUpOpen,
    openSignIn,
    openSignUp,
    closeSignIn,
    closeSignUp,
  } = useAuthModals();

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      isLoggedIn &&
      (currentPath === "/login" || currentPath === "/register")
    ) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      openSignIn();
    }
  };
  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      dispatch(performSearch(value));
    }
  };

  return (
    <div className={css.header}>
      <div className={css.panel}>
        <div className={css.box1}>
          <NavBar />
        </div>
        <Logo />
        <div className={css.box2}>
          <form className={css.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className={css.input}
              value={searchTerm}
              placeholder="Search games & products.."
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
            />
            <button type="submit" className={css.headerBtns}>
              <PiMagnifyingGlassBold className={css.icons} />
            </button>
          </form>

          <button //for mobile version
            className={`${css.headerBtns} ${css.mobileSearchBtn}`}
            onClick={() => setIsSearchOpen(true)}
          >
            <PiMagnifyingGlassBold className={css.icons} />
          </button>

          <div className={css.box2}>
            <button className={css.headerBtns} onClick={handleCartClick}>
              <BiShoppingBag className={css.icons} />
              {totalItems > 0 && (
                <span className={css.cartQuantity}>{totalItems}</span>
              )}
            </button>
          </div>

          <button className={css.headerBtns} onClick={handleProfileClick}>
            <Icon id="profile" className={css.icons} />
          </button>
        </div>
      </div>
      <AuthModals
        isSignInOpen={isSignInOpen}
        isSignUpOpen={isSignUpOpen}
        closeSignIn={closeSignIn}
        closeSignUp={closeSignUp}
        openSignIn={openSignIn}
        openSignUp={openSignUp}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchTerm={searchTerm}
        onSearchChange={handleSearchInput}
      />
    </div>
  );
};

export default Header;
