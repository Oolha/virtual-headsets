import css from "./Subscription.module.css";

const Subscription = ({}) => {
  return (
    <div className={css.subscrBox}>
      <h4 className={css.title}>Subscribe Our News Letter</h4>
      <p className={css.text}>
        Sure, please provide your email address to subscribe to newsletter
      </p>
      <input
        type="text"
        placeholder="Enter your mail..."
        className={css.input}
      />
      <button className={css.btn}>Subscribe</button>
      <picture className={css.linesPicture}>
        <source
          srcSet="../../../public/images/desktop/Line-footer-desktop.png"
          media="(min-width: 1440px)"
        />
        <source
          srcSet="../../../public/images/mobile/Line-footer-mobile.png"
          media="(min-width: 320px)"
        />
        <img
          src="../../../public/images/desktop/Line-footer-desktop.png"
          alt="line"
        />
      </picture>
      <p className={css.rights}>© 2025 HoloGaze. All rights reserved.</p>
    </div>
  );
};

export default Subscription;
