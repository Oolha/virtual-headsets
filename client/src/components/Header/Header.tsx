// Header.tsx
import { useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";

import css from "./Header.module.css";
import NavBar from "../NavBar/NavBar";
import Logo from "../Logo/Logo";
import SearchModal from "../SearchModal/SearchModal";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { performSearch } from "../../redux/search/searchOperations";
import SearchResults from "../SearchResults/SearchResults";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

          {/* Мобільна кнопка пошуку */}
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
        </div>
      </div>

      {/* Модальне вікно пошуку для мобільної версії */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default Header;
