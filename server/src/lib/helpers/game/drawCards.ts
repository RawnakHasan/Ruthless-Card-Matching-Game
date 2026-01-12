import type { Card, Game } from "shared/dist";
import { reshuffle } from "./reshuffle";

export const drawCards = (game: Game, drawCount: number = 1): Card[] => {
  const drawnCards: Card[] = [];

  for (let i = 0; i < drawCount; i++) {
    if (game.deck.length === 0) {
      reshuffle(game);

      if (game.deck.length === 0) break;
    }

    const card = game.deck.shift()!;

    drawnCards.push(card);
  }

  return drawnCards;
};
