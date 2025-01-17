import css from "./VROneHeadset.module.css";
import { VRHeadset } from "../../redux/types";
import { Icon } from "../Icon/Icon";
import { useNavigate } from "react-router-dom";
import { RiHeartAdd2Line, RiHeartFill } from "react-icons/ri";
import { selectFavorites } from "../../redux/favorites/selectors";
import {
  useAppDispatch,
  useAppSelector,
  useAuthModals,
} from "../../redux/hooks/hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favorites/slice";
import { notification } from "antd";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { useState } from "react";
import { SignInModal } from "../SignIn/SignIn";
import { AuthModals } from "../AuthModals/AuthModals";

interface VROneHeadsetProps {
  item: VRHeadset;
}

export const VROneHeadset: React.FC<VROneHeadsetProps> = ({ item }) => {
  const navigate = useNavigate();

  const {
    isSignInOpen,
    isSignUpOpen,
    openSignIn,
    openSignUp,
    closeSignIn,
    closeSignUp,
  } = useAuthModals();

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  const isFavorite = favorites.some((fav) => fav._id === item._id);

  const handleClick = (id: string) => {
    try {
      navigate(`/catalog/${id}`);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      openSignIn();
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(item._id));
      notification.success({
        message: "Removed from favorites",
        description: `${item.name} has been removed from your favorites`,
        placement: "topRight",
      });
    } else {
      dispatch(addToFavorites(item));
      notification.success({
        message: "Added to favorites",
        description: `${item.name} has been added to your favorites`,
        placement: "topRight",
      });
    }
  };

  return (
    <>
      <div className={css.item} onClick={() => handleClick(item._id)}>
        <div className={css.vrItem}>
          <div className={css.infoBox}>
            <div className={css.favContainer}>
              <h4 className={css.title}>{item.name}</h4>
              <button className={css.favoriteBtn} onClick={handleFavoriteClick}>
                {isFavorite ? (
                  <RiHeartAdd2Line
                    className={`${css.favoriteIcon} ${css.active}`}
                  />
                ) : (
                  <RiHeartAdd2Line className={css.favoriteIcon} />
                )}
              </button>
            </div>

            <p className={css.text}>{item.compatibility}</p>
            <ul className={css.list}>
              <li className={css.listItem}>
                <Icon id="prize" size={16} />
                <p>1st Prize Education Supporter </p>
              </li>
              <li className={css.listItem}>
                <Icon id="warranty" size={16} />
                <p>{item.technicalSpecifications.guarantee} warranty</p>
              </li>
              <li className={css.listItem}>
                <Icon id="safety" size={16} />
                <p>Environment safety</p>
              </li>
            </ul>
            <div className={css.detAndPrice}>
              <div className={css.boxBtn}>
                <button
                  className={css.detailsBtn}
                  onClick={() => handleClick(item._id)}
                >
                  See details
                </button>
                <Icon id="seeDetails" size={13} />
              </div>

              <p className={css.price}>€{item.price}</p>
            </div>
          </div>

          <div className={css.box}></div>
        </div>
        <div className={css.imgBox}>
          <img src={item.photo} alt={item.name} className={css.img} />
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
    </>
  );
};
