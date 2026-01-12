import type { Card, CustomSocket, Game, Player } from "shared/dist";
import { getTopCard } from "../game";
import { io } from "@server/index";

export const isValidPlay = (
  player: Player,
  game: Game,
  playedCard: Card
): boolean => {
  const topCard = getTopCard(game);

  if (player.id !== game.playerTurn) {
    io.to(player.uuid).emit("errors", "Not your turn");
    return false;
  }

  if (playedCard.name === topCard.name) {
    // If name matches it is always true
    return true;
  } else if (playedCard.type === "Wild") {
    // If it is a wild card then it is always true
    return true;
  } else if (
    playedCard.color ===
    (topCard.type === "Wild" ? topCard.chosenColor : topCard.color)
  ) {
    // If color is same the it is always true
    return true;
  }

  return false;
};
