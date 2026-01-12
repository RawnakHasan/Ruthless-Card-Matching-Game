import type { Game } from "shared/dist";

export const handleReverseDrawFourCard = (game: Game) => {
  game.drawCount += 4;
  game.rotation *= -1;
};
