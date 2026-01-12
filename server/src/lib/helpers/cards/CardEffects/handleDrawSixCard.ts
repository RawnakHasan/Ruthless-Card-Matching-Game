import type { Game } from "shared/dist";

export const handleDrawSixCard = (game: Game) => {
  game.drawCount += 6;
};
