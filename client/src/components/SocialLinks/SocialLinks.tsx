import css from "./SocialLinks.module.css";
import {
  PiTwitterLogoFill,
  PiInstagramLogoFill,
  PiDiscordLogoFill,
} from "react-icons/pi";
import { MdOutlineFacebook } from "react-icons/md";

const SocialLinks = ({}) => {
  return (
    <div className={css.socialIconsWrapper}>
      <div
        className={css.socialLink}
        data-tooltip="Demo project - links are for demonstration purposes only"
      >
        <PiTwitterLogoFill className={css.linkIcon} />
      </div>
      <div
        className={css.socialLink}
        data-tooltip="Demo project - links are for demonstration purposes only"
      >
        <PiInstagramLogoFill className={css.linkIcon} />
      </div>
      <div
        className={css.socialLink}
        data-tooltip="Demo project - links are for demonstration purposes only"
      >
        <PiDiscordLogoFill className={css.linkIcon} />
      </div>
      <div
        className={css.socialLink}
        data-tooltip="Demo project - links are for demonstration purposes only"
      >
        <MdOutlineFacebook className={css.linkIcon} />
      </div>
    </div>
  );
};
export default SocialLinks;
