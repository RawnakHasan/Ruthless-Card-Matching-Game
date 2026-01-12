import type { Game } from "shared/dist";

export const handleDrawTenCard = (game: Game) => {
  game.drawCount += 10;
};
