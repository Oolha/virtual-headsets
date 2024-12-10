import css from "./Logo.module.css";

const Logo = ({}) => {
  return (
    <div>
      <h3 className={css.nameBrand}>
        <span className={css.span}>Holo</span>Gaze
        <span className={css.span}>.</span>
      </h3>
    </div>
  );
};

export default Logo;
