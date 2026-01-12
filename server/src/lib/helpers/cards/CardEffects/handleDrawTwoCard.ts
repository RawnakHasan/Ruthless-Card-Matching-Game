import type { Game } from "shared/dist";

export const handleDrawTwoCard = (game: Game) => {
  game.drawCount += 2;
};
