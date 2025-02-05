import React from "react";
import css from "./GameNavigationControls.module.css";
import { Icon } from "../Icon/Icon";

interface GameNavigationControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const GameNavigationControls = React.memo(
  ({ onPrevClick, onNextClick }: GameNavigationControlsProps) => (
    <div className={css.navigationContainer}>
      <button onClick={onPrevClick} className={css.customPrevButton}>
        <Icon id="icon-arrow-left" size={16} />
      </button>
      <button onClick={onNextClick} className={css.customNextButton}>
        <Icon id="icon-arrow-right" size={16} />
      </button>
    </div>
  )
);
