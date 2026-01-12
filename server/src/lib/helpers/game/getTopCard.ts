import type { Card, Game } from "shared/dist";

export const getTopCard = (game: Game): Card => {
  const topCard = game.discardPile[0];

  if (!topCard) {
    throw new Error(`No Cards In Discard Pile`);
  }

  return topCard;
};
