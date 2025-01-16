import { useNavigate } from "react-router-dom";
import { selectFavorites } from "../../redux/favorites/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import css from "./Favorites.module.css";
import { removeFromFavorites } from "../../redux/favorites/slice";
import { notification } from "antd";
import { Icon } from "../Icon/Icon";

const Favorites = ({}) => {
  const favorites = useAppSelector(selectFavorites);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    try {
      navigate(`/catalog/${id}`);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  const handleDeleteFromFavorites = (
    e: React.MouseEvent,
    itemId: string,
    itemName: string
  ) => {
    e.stopPropagation();
    dispatch(removeFromFavorites(itemId));
    notification.success({
      message: "Removed from favorites",
      description: `${itemName} has been removed from your favorites`,
      placement: "topRight",
    });
  };
  return (
    <div className={css.favoritesSection}>
      <h3 className={css.sectionTitle}>My Favorites</h3>
      {favorites.length === 0 ? (
        <p className={css.emptyMessage}>No favorite devices yet</p>
      ) : (
        <div className={css.favoritesGrid}>
          {favorites.map((item) => (
            <div
              key={item._id}
              className={css.cartItem}
              onClick={() => handleClick(item._id)}
            >
              <div className={css.photoBox}>
                <img
                  src={item.photo}
                  alt={item.name}
                  className={css.itemImage}
                />
                <div className={css.itemDetails}>
                  <h3>{item.name}</h3>
                  <div className={css.dumpContainer}>
                    <p className={css.price}>Price: €{item.price}</p>
                    <button
                      className={css.dumpBtn}
                      onClick={(e) =>
                        handleDeleteFromFavorites(e, item._id, item.name)
                      }
                    >
                      <Icon id="dump" className={css.icon} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
