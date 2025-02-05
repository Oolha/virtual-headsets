import {
  selectError,
  selectIsLoading,
  selectVRHeadsets,
} from "../../redux/virtual-headsets/selectors";
import { VROneHeadset } from "../VROneHeadset/VROneHeadset";
import React, { useCallback, useEffect, useState } from "react";
import { fetchAllVrHeadsets } from "../../redux/virtual-headsets/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import css from "./VRHeadsets.module.css";
import { Navigation } from "swiper/modules";
import { Icon } from "../Icon/Icon";
import Loader from "../Loader/Loader";
import FirstLoading from "../FirstLoading/FirstLoading";

const MemoizedVROneHeadset = React.memo(VROneHeadset);

const VRHeadsetsList = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectVRHeadsets);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isError = useAppSelector(selectError);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = performance.now();
      try {
        await dispatch(fetchAllVrHeadsets()).unwrap();
      } catch (error) {
        console.error("Failed to fetch headsets:", error);
      } finally {
        const endTime = performance.now();
        console.log(`Total loading time: ${endTime - startTime}ms`);
        setIsInitialLoad(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const prefetchData = async () => {
      data.forEach((headset) => {
        const img = new Image();
        img.src = headset.photo;
      });
    };

    if (data.length > 0) {
      prefetchData();
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevClick = useCallback(() => {
    if (swiper) swiper.slidePrev();
  }, [swiper]);

  const handleNextClick = useCallback(() => {
    if (swiper) swiper.slideNext();
  }, [swiper]);

  if (isInitialLoad) {
    return (
      <div className={css.loadingContainer}>
        <Loader />
        <FirstLoading />
      </div>
    );
  }
  if (isError) {
    return <div>Error loading data: {isError}</div>;
  }

  return (
    <div className={css.wrapperBox}>
      <div className={css.arrowsBox}>
        <h2 className={css.title}>Featured Gears</h2>
        {isDesktop && (
          <div className={css.navigationContainer}>
            <button className={css.customPrevButton} onClick={handlePrevClick}>
              <Icon id="icon-arrow-left" size={16} />
            </button>
            <button className={css.customNextButton} onClick={handleNextClick}>
              <Icon id="icon-arrow-right" size={16} />
            </button>
          </div>
        )}
      </div>

      <div className={css.listWrapper}>
        {isDesktop ? (
          <Swiper
            onSwiper={(swiper: SwiperType) => setSwiper(swiper)}
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={70}
            className={css.sliderContainer}
          >
            {data.map((item) => (
              <SwiperSlide key={item._id}>
                <MemoizedVROneHeadset item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ul className={css.list}>
            {data.map((item) => (
              <MemoizedVROneHeadset item={item} key={item._id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VRHeadsetsList;
