import css from "./SocialLinks.module.css";
import {
  PiTwitterLogoFill,
  PiInstagramLogoFill,
  PiDiscordLogoFill,
} from "react-icons/pi";
import { MdOutlineFacebook } from "react-icons/md";

const SocialLinks = ({}) => {
  return (
    <div className={css.links}>
      <button className={css.linkBtn}>
        <PiTwitterLogoFill className={css.linkIcon} />
      </button>
      <button className={css.linkBtn}>
        <PiInstagramLogoFill className={css.linkIcon} />
      </button>
      <button className={css.linkBtn}>
        <PiDiscordLogoFill className={css.linkIcon} />
      </button>
      <button className={css.linkBtn}>
        <MdOutlineFacebook className={css.linkIcon} />
      </button>
    </div>
  );
};

export default SocialLinks;
