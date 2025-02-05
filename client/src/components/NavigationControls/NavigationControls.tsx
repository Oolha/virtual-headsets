import React from "react";
import css from "./NavigationControls.module.css";
import { Icon } from "../Icon/Icon";

type NavigationControlsProps = {
  onPrevClick: () => void;
  onNextClick: () => void;
};

export const NavigationControls = React.memo(
  ({ onPrevClick, onNextClick }: NavigationControlsProps) => (
    <div className={css.navigationContainer}>
      <button className={css.customPrevButton} onClick={onPrevClick}>
        <Icon id="icon-arrow-left" size={16} />
      </button>
      <button className={css.customNextButton} onClick={onNextClick}>
        <Icon id="icon-arrow-right" size={16} />
      </button>
    </div>
  )
);
