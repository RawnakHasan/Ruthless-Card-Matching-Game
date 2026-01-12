import type { Game } from "shared/dist";

export const handleReverseCard = (game: Game) => {
  game.rotation *= -1;
};
