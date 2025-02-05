import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { VRHeadset } from "../../redux/types";
import { MemoizedVROneHeadset } from "../VROneHeadset/VROneHeadset";
import css from "./VRSwiper.module.css";
import React from "react";

type VRSwiperProps = {
  data: VRHeadset[];
  onSwiperInit: (swiper: SwiperType) => void;
};

export const VRSwiper: React.FC<VRSwiperProps> = React.memo(
  ({ data, onSwiperInit }) => {
    return (
      <Swiper
        onSwiper={onSwiperInit}
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
    );
  }
);
