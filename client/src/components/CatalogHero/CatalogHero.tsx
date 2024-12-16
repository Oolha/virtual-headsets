import css from "./CatalogHero.module.css";
import { useState } from "react";
import vrVideo from "../../../public/video/vr-headset-video.mp4";

const CatalogHero = ({}) => {
  return (
    <div className={css.videoContainer}>
      <video className={css.fullWidthVideo} autoPlay muted loop>
        <source src={vrVideo} type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>
      <div className={css.overlay}>
        <h2 className={css.title}>
          Enhance Your Reality. Get Your VR Headset Today!
        </h2>
      </div>
    </div>
  );
};

export default CatalogHero;
