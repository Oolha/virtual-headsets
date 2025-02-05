import { useCallback, useState } from "react";
import { Swiper as SwiperType } from "swiper";

export const useGameSwiper = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handlePrevClick = useCallback(() => {
    if (swiper) swiper.slidePrev();
  }, [swiper]);

  const handleNextClick = useCallback(() => {
    if (swiper) swiper.slideNext();
  }, [swiper]);

  return {
    swiper,
    setSwiper,
    handlePrevClick,
    handleNextClick,
  };
};
