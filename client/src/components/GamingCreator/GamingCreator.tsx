import AnimationWrapper from "../AnimationWrapper/AnimationWrapper";
import css from "./GamingCreator.module.css";
import { FaArrowRight } from "react-icons/fa6";

import creatorDesk1x from "/images/desktop/gaming-creator-desktop@1x.png";
import creatorDesk2x from "/images/desktop/gaming-creator-desktop@2x.png";
import creatorMob1x from "/images/mobile/gaming-creator-mobile@1x.png";
import creatorMob2x from "/images/mobile/gaming-creator-mobile@2x.png";
import icon1x from "/images/desktop/icon@1x.png";
import icon2x from "/images/desktop/icon@2x.png";
import { Icon } from "../Icon/Icon";

const GamingCreator = ({}) => {
  return (
    <AnimationWrapper type="fadeIn" delay={0.2} onScroll>
      <div className={css.mainBox}>
        <div className={css.gamingCreatorBox}>
          <h3 className={css.title}>Jane Wilson, Gaming Creator</h3>
          <p className={css.text}>
            A virtual headset creator is an individual or company that
            specializes in designing and manufacturing virtual reality headsets,
            also known as VR headsets.
          </p>
          <div
            className={css.blogBtn}
            data-tooltip="Demo project - links are for demonstration purposes only"
          >
            <p>Read my blog</p>
            <FaArrowRight className={css.arrow} />
          </div>
        </div>

        <div className={css.box}>
          <div className={css.pictureBox}>
            <picture className={css.picture}>
              <source
                srcSet={`${creatorDesk1x} 1x, ${creatorDesk2x} 2x`}
                media="(min-width: 1440px)"
              />
              <source
                srcSet={`${creatorMob1x} 1x, ${creatorMob2x} 2x`}
                media="(min-width: 375px)"
              />
              <img src={creatorDesk1x} alt="woman in virtual headsets" />
            </picture>
          </div>
          <div className={css.twitterPost}>
            <div className={css.nickNameBox}>
              <picture className={css.pictureIcon}>
                <source
                  srcSet={`${icon1x} 1x, ${icon2x} 2x`}
                  media="(min-width: 375px)"
                  className={css.gamingCreatorIcon}
                />
                <img src={icon1x} alt="icon" />
              </picture>
              <div className={css.namesBox}>
                <p className={css.name}>Jane Wilson</p>
                <p className={css.nickname}>@jjwilson</p>
              </div>
            </div>
            <p className={css.postTitle}>
              Virtual headsets of the future is live!
            </p>
            <p className={css.date}>
              09:28 · 2/21/20 ·{" "}
              <span className={css.twitter}>Twitter Web App</span>
            </p>
            <div className={css.line}></div>
            <div className={css.activity}>
              <p className={css.date}>
                <span className={css.span}>24,5k</span> Retweets
              </p>
              <p className={css.date}>
                <span className={css.span}>104,21k</span> Likes
              </p>
            </div>
            <div className={css.line}></div>
            <div className={css.postIcons}>
              <Icon id="comment" size={18} />
              <Icon id="retweet" size={20} />
              <Icon id="like" size={18} />
              <Icon id="share" size={18} />
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default GamingCreator;
