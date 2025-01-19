import { PiStarFourFill } from "react-icons/pi";
import css from "./Features.module.css";
import { Icon } from "../Icon/Icon";

const Features = ({}) => {
  return (
    <div className={css.mainBox}>
      <div className={css.featuresBox}>
        <h3 className={css.title}>
          Our Virtual Headsets Shine with Unique Features!
        </h3>
        <ul className={css.list}>
          <li className={css.listItem}>
            <PiStarFourFill className={css.textIcon} />
            <p className={css.text}>
              High-resolution OLED or LCD screens: Provide sharp and clear
              visuals.
            </p>
          </li>
          <li className={css.listItem}>
            <PiStarFourFill className={css.textIcon} />
            <p className={css.text}>
              Inside-out tracking: Built-in sensors (cameras or other sensors).
            </p>
          </li>
          <li className={css.listItem}>
            <PiStarFourFill className={css.textIcon} />
            <p className={css.text}>
              High-resolution OLED or LCD screens: Provide sharp and clear
              visuals.
            </p>
          </li>
          <li className={css.listItem}>
            <PiStarFourFill className={css.textIcon} />
            <p className={css.text}>
              Refresh rate: Higher refresh rates reduce motion sickness and
              provide.
            </p>
          </li>
          <li className={css.listItem}>
            <PiStarFourFill className={css.textIcon} />
            <p className={css.text}>
              Eye tracking: Monitors the movement of the user's eyes, allowing
              for more.
            </p>
          </li>
          <li className={css.listItem}>
            <PiStarFourFill className={css.textIcon} />
            <p className={css.text}>
              Refresh rate: Higher refresh rates reduce motion sickness and
              provide.
            </p>
          </li>
        </ul>
      </div>
      <div className={css.pictureBox}>
        <picture className={css.linesPicture}>
          <source
            srcSet="../../../public/svg/Ellipse-big.svg"
            media="(min-width: 1440px)"
          />
          <img src="../../../public/svg/Ellipse-small.svg" alt="line" />
        </picture>
        <picture className={css.picture}>
          <source
            srcSet="../../../public/images/desktop/headsets-desktop@1x.png 1x,
                        ../../../public/images/desktop/headsets-desktop@2x.png 2x"
            media="(min-width: 1440px)"
            className={css.featuresImg}
          />
          <source
            srcSet="../../../public/images/mobile/headsets-mobile@1x.png 1x,
                                        ../../../public/images/mobile/headsets-mobile@2x.png 2x"
            media="(min-width: 375px)"
          />
          <img
            src="../../../public/images/desktop/headsets-desktop@1x.png 1x"
            alt="virtual headsets"
          />
        </picture>
        <div className={css.gradient}></div>
      </div>
    </div>
  );
};

export default Features;
