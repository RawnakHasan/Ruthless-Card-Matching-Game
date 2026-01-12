import type { Game } from "shared/dist";

export const handleSkipAllCard = (game: Game) => {
  game.playerTurn = game.playerTurn;
};
