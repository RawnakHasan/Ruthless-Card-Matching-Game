import type { Game } from "shared/dist";
import { skipPlayers } from "../../game";

export const handleSkipCard = (game: Game) => {
  const skippedPlayer = skipPlayers(game);

  // Update playerTurn to the next player after skipping
  game.playerTurn = skippedPlayer.id;
};
