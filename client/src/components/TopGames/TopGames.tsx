import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import css from "./TopGames.module.css";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  selectError,
  selectGames,
  selectIsLoading,
} from "../../redux/games/selectors";
import { fetchTop5Games } from "../../redux/games/operations";
import { useNavigate } from "react-router-dom";
import { useGameSwiper } from "../../hooks/useGameSwiper";
import { GameNavigationControls } from "../GameNavigationControls/GameNavigationControls";
import { GameSlide } from "../GameSlide/GameSlide";

import Loader from "../Loader/Loader";
import FirstLoading from "../FirstLoading/FirstLoading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TopGames = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector(selectGames);
  const isLoading = useAppSelector(selectIsLoading);
  const isError = useAppSelector(selectError);

  const { swiper, setSwiper, handlePrevClick, handleNextClick } =
    useGameSwiper();

  const handleClick = useCallback(
    (id: string) => {
      try {
        navigate(`/game/${id}`);
      } catch (error) {
        console.error("Navigation failed:", error);
      }
    },
    [navigate]
  );

  const getClipPath = useCallback((id: string) => {
    const isDesktop = window.matchMedia("(min-width: 1440px)").matches;
    return isDesktop
      ? `M0 0 L300 0 L348 80 L348 361 L0 361 Z`
      : `M0 0 L186 0 L233 48 L233 240 L0 240 Z`;
  }, []);

  const swiperConfig = useMemo(
    () => ({
      breakpoints: {
        545: { slidesPerView: 2, spaceBetween: 24 },
        768: { slidesPerView: 2.5, spaceBetween: 24 },
        930: { slidesPerView: 3, spaceBetween: 32.5 },
        1440: { slidesPerView: 3, spaceBetween: 32.5 },
      },
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTop5Games()).unwrap();
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setIsInitialLoad(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((game) => {
        const img = new Image();
        img.src = game.photo;
      });
    }
  }, [data]);

  if (isInitialLoad) {
    return (
      <div className={css.loadingContainer}>
        <Loader />
        <FirstLoading />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {isError}</p>;
  }

  return (
    <div className={css.topGamesBox}>
      <div className={css.gamesTextBox}>
        <h3 className={css.title}>Top Games</h3>
        <p className={css.text}>
          If you buy video of 2 games, you will receive 1 video game for free,
          along with a <span className={css.span}>50%</span> discount.
        </p>
        <GameNavigationControls
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
      </div>

      <Swiper
        onSwiper={(swiper: SwiperType) => setSwiper(swiper)}
        modules={[Navigation]}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1.5}
        className={css.swiper}
        breakpoints={swiperConfig.breakpoints}
        allowTouchMove={true}
      >
        {data.map((game) => (
          <SwiperSlide key={game._id} className={css.swiperSlide}>
            <GameSlide
              game={game}
              onClick={handleClick}
              getClipPath={getClipPath}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {isLoading && !isInitialLoad && (
        <div className={css.lightLoader}>Updating...</div>
      )}
    </div>
  );
};

export default React.memo(TopGames);
