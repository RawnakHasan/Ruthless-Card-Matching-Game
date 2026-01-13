import type { Card, Game } from "shared/dist";
import { getTopCard } from "../game";
import { isDrawCard } from "./isDrawCard";
import { canStackOn } from "./canStackOn";

export const isValidPlay = (game: Game, playedCard: Card): boolean => {
  const topCard = getTopCard(game);

  if (game.drawCount > 0) {
    if (!isDrawCard(playedCard)) {
      return false;
    }

    if (!canStackOn(topCard, playedCard)) {
      return false;
    }
  }

  // 🔒 DRAW LOCK
  if (isDrawCard(topCard)) {
    return isDrawCard(playedCard) && canStackOn(topCard, playedCard);
  }

  // Normal rules
  if (String(topCard.name) === String(playedCard.name)) return true;
  if (playedCard.type === "Wild") return true;

  const topColor =
    topCard.type === "Wild" ? topCard.chosenColor : topCard.color;

  return !!topColor && topColor === playedCard.color;
};
