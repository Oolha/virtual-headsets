import css from "./CatalogHero.module.css";
import vrVideo from "../../../public/video/vr-headset-video.mp4";

const CatalogHero = ({}) => {
  return (
    <div className={css.videoContainer}>
      <video className={css.fullWidthVideo} autoPlay muted loop>
        <source src={vrVideo} type="video/mp4" />
        Your browser does not support video.
      </video>
      <div className={css.overlay}>
        <div className={css.textWrapper}>
          <h2 className={css.title}>
            Enhance Your Reality. Get Your VR Headset Today!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CatalogHero;
