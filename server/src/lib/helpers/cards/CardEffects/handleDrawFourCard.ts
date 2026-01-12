import type { Game } from "shared/dist";

export const handleDrawFourCard = (game: Game) => {
  game.drawCount += 4;
};
