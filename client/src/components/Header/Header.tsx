import { useEffect, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";

import css from "./Header.module.css";
import NavBar from "../NavBar/NavBar";
import Logo from "../Logo/Logo";
import SearchModal from "../SearchModal/SearchModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { performSearch } from "../../redux/search/searchOperations";
import SearchResults from "../SearchResults/SearchResults";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { SignInModal } from "../SignIn/SignIn";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
      setIsLoginModalOpen(true);
    }
  };
  const handleCartClick = () => {
    navigate("/cart");
  };

  const dispatch = useAppDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (searchTerm: string) => {
    dispatch(performSearch(searchTerm));
    setIsSearchOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    handleSearch(input.value);
  };

  return (
    <div className={css.header}>
      <div className={css.panel}>
        <div className={css.box1}>
          <NavBar />
        </div>
        <Logo />
        <div className={css.box2}>
          <form className={css.form} onSubmit={handleSubmit}>
            <input
              type="text"
              className={css.input}
              placeholder="Search games & products.."
            />
            <button type="submit" className={css.headerBtns}>
              <PiMagnifyingGlassBold className={css.icons} />
            </button>
          </form>

          <button
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
      {isLoginModalOpen && (
        <SignInModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default Header;
