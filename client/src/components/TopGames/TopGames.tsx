import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks/hooks";
import css from "./TopGames.module.css";

import {
  selectError,
  selectGames,
  selectIsLoading,
} from "../../redux/games/selectors";
import { useEffect } from "react";
import { fetchTop5Games } from "../../redux/games/operations";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TopGames = ({}) => {
  const dispatch = useAppDispatch();
  const data = useSelector(selectGames);

  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTop5Games());
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className={css.topGamesBox}>
      <div className={css.gamesTextBox}>
        <h3 className={css.title}>Top Games</h3>
        <p className={css.text}>
          If you buy video of 2 games, you will receive 1 video game for free,
          along with a <span className={css.span}>50%</span> discount.
        </p>
      </div>

      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1.5}
        className={css.swiper}
        allowTouchMove={true}
      >
        {data.map((game) => (
          <SwiperSlide key={game._id} className={css.swiperSlide}>
            <div className={css.listItem}>
              <div className={css.imageWrapper}>
                {/* <svg className={css.svg}>
                  <defs>
                    <clipPath id={`clipPath-${game._id}`}>
                      <path d="M0 0 L186 0 L233 48 L233 240 L0 240 Z" />
                    </clipPath>
                  </defs>
                  <path
                    d="M0 0 L186 0 L233 48 L233 240 L0 240 Z"
                    fill="none"
                    stroke="rgba(189, 0, 255, 0.2)"
                    strokeWidth="4"
                  />
                </svg> */}
                <img
                  src={game.photo}
                  alt={game.name}
                  className={css.img}
                  style={{
                    clipPath: `url(#clipPath-${game._id})`,
                  }}
                />
              </div>
              <p className={css.gameName}>{game.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {isError}</p>}
    </div>
  );
};

export default TopGames;
