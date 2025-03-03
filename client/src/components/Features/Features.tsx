import { PiStarFourFill } from "react-icons/pi";
import css from "./Features.module.css";
import AnimationWrapper from "../AnimationWrapper/AnimationWrapper";

import bigEllipse from "/svg/Ellipse-big.svg";
import smallEllipse from "/svg/Ellipse-small.svg";
import vrDesktop1x from "/images/desktop/headsets-desktop@1x.png";
import vrDesktop2x from "/images/desktop/headsets-desktop@2x.png";
import vrMobile1x from "/images/mobile/headsets-mobile@1x.png";
import vrMobile2x from "/images/mobile/headsets-mobile@2x.png";

const Features = ({}) => {
  return (
    <AnimationWrapper type="fadeIn" delay={0.2} onScroll>
      <div id="features" className={css.mainBox}>
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
                Inside-out tracking: Built-in sensors (cameras or other
                sensors).
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
            <source srcSet={bigEllipse} media="(min-width: 1440px)" />
            <img src={smallEllipse} alt="line" />
          </picture>
          <picture className={css.picture}>
            <source
              srcSet={`${vrDesktop1x} 1x, ${vrDesktop2x} 2x`}
              media="(min-width: 1440px)"
              className={css.featuresImg}
            />
            <source
              srcSet={`${vrMobile1x} 1x, ${vrMobile2x} 2x`}
              media="(min-width: 375px)"
            />
            <img src={vrDesktop1x} alt="virtual headsets" />
          </picture>
          <div className={css.gradient}></div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Features;
