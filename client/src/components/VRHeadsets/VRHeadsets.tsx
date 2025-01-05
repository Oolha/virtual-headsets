import {
  selectError,
  selectIsLoading,
  selectVRHeadsets,
} from "../../redux/virtual-headsets/selectors";
import { useSelector } from "react-redux";
import { VROneHeadset } from "../VROneHeadset/VROneHeadset";
import { useEffect, useState } from "react";
import { fetchAllVrHeadsets } from "../../redux/virtual-headsets/operations";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import css from "./VRHeadsets.module.css";
import { Navigation } from "swiper/modules";
import { Icon } from "../Icon/Icon";

const VRHeadsetsList = () => {
  const dispatch = useAppDispatch();
  const data = useSelector(selectVRHeadsets);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllVrHeadsets()).unwrap();
      } catch (error) {
        console.error("Failed to fetch headsets:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handlePrevClick = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleNextClick = () => {
    if (swiper) swiper.slideNext();
  };

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
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <VROneHeadset item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ul className={css.list}>
            {data.map((item, index) => (
              <VROneHeadset item={item} key={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VRHeadsetsList;
