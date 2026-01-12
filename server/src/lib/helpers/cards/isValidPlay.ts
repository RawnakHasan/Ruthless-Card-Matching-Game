import type { Card, Game, Player } from "shared/dist";
import { getTopCard } from "../game";

export const isValidPlay = (
  player: Player,
  game: Game,
  playedCard: Card
): boolean => {
  const topCard = getTopCard(game);

  if (player.id !== game.playerTurn) {
    return false;
  }

  // If it is a wild card then it is always true
  if (playedCard.type === "Wild") return true;

  // If name matches it is always true
  if (playedCard.name === topCard.name) return true;

  // If color is same the it is always true
  if (
    playedCard.color ===
    (topCard.type === "Wild" ? topCard.chosenColor : topCard.color)
  )
    return true;

  return false;
};
