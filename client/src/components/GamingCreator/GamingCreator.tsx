import AnimationWrapper from "../AnimationWrapper/AnimationWrapper";
import css from "./GamingCreator.module.css";
import { FaArrowRight } from "react-icons/fa6";

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
                srcSet="../../../public/images/desktop/gaming-creator-desktop@1x.png 1x,
                        ../../../public/images/desktop/gaming-creator-desktop@2x.png 2x"
                media="(min-width: 1440px)"
              />
              <source
                srcSet="../../../public/images/mobile/gaming-creator-mobile@1x.png 1x,
                                        ../../../public/images/mobile/gaming-creator-mobile@2x.png 2x"
                media="(min-width: 375px)"
              />
              <img
                src="../../../public/images/desktop/gaming-creator-desktop@1x.png 1x"
                alt="woman in virtual headsets"
              />
            </picture>
          </div>
          <div className={css.twitterPost}>
            <div className={css.nickNameBox}>
              <picture className={css.pictureIcon}>
                <source
                  srcSet="../../../public/images/desktop/icon@1x.png 1x,
                        ../../../public/images/desktop/icon@2x.png 2x"
                  media="(min-width: 375px)"
                  className={css.gamingCreatorIcon}
                />
                <img
                  src="../../../public/images/desktop/icon@1x.png 1x"
                  alt="icon"
                />
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
              <img
                src="../../../public/svg/Comment-Stroke Icon-2.svg"
                alt="comment"
              />
              <img
                src="../../../public/svg/Retweet-Stroke Icon-2.svg"
                alt="retweet"
              />
              <img
                src="../../../public/svg/Heart-Stroke Icon-2.svg"
                alt="heart"
              />
              <img
                src="../../../public/svg/Share-Stroke icon-2.svg"
                alt="share"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default GamingCreator;
