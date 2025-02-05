import css from "./VRHeadsets.module.css";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  selectError,
  selectVRHeadsets,
} from "../../redux/virtual-headsets/selectors";
import { VROneHeadset } from "../VROneHeadset/VROneHeadset";
import { fetchAllVrHeadsets } from "../../redux/virtual-headsets/operations";
import { Swiper as SwiperType } from "swiper";
import { NavigationControls } from "../NavigationControls/NavigationControls";
import { useWindowSize } from "../../hooks/useWindowSize";
import { VRSwiper } from "../VRSwiper/VRSwiper";
import Loader from "../Loader/Loader";
import FirstLoading from "../FirstLoading/FirstLoading";

import "swiper/css";
import "swiper/css/navigation";

const MemoizedVROneHeadset = React.memo(VROneHeadset);

const DESKTOP_WIDTH = 1440;

const VRHeadsetsList = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectVRHeadsets);
  const isError = useAppSelector(selectError);
  const { width } = useWindowSize();

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const isDesktop = useMemo(() => width >= DESKTOP_WIDTH, [width]);

  const handlePrevClick = useCallback(() => {
    if (swiper) swiper.slidePrev();
  }, [swiper]);

  const handleNextClick = useCallback(() => {
    if (swiper) swiper.slideNext();
  }, [swiper]);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = performance.now();
      try {
        await dispatch(fetchAllVrHeadsets()).unwrap();
      } catch (error) {
        console.error("Failed to fetch headsets:", error);
      } finally {
        setIsInitialLoad(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((headset) => {
        new Image().src = headset.photo;
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
    return <div>Error loading data: {isError}</div>;
  }

  return (
    <div className={css.wrapperBox}>
      <div className={css.arrowsBox}>
        <h2 className={css.title}>Featured Gears</h2>
        {isDesktop && (
          <NavigationControls
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
        )}
      </div>

      <div className={css.listWrapper}>
        {isDesktop ? (
          <VRSwiper data={data} onSwiperInit={setSwiper} />
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

export default React.memo(VRHeadsetsList);
