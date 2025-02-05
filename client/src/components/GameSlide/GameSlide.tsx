import React from "react";
import { Game } from "../../redux/types";
import css from "./GameSlide.module.css";

interface GameSlideProps {
  game: Game;
  onClick: (id: string) => void;
  getClipPath: (id: string) => string;
}

export const GameSlide = React.memo(
  ({ game, onClick, getClipPath }: GameSlideProps) => (
    <div className={css.listItem} onClick={() => onClick(game._id)}>
      <div className={css.imageWrapper}>
        <svg className={css.svg}>
          <defs>
            <clipPath id={`clipPath-${game._id}`}>
              <path d={getClipPath(game._id)} />
            </clipPath>
          </defs>
          <path
            d={getClipPath(game._id)}
            fill="none"
            stroke="rgba(189, 0, 255, 0.2)"
            strokeWidth="4"
          />
        </svg>
        <img
          src={game.photo}
          alt={game.name}
          className={css.img}
          loading="lazy"
          style={{
            clipPath: `url(#clipPath-${game._id})`,
          }}
        />
      </div>
      <p className={css.gameName}>{game.name}</p>
    </div>
  )
);
