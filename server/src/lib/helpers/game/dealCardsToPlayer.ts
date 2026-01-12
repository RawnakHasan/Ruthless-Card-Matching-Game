import type { Card, Game } from "shared/dist";

export const dealCardsToPlayer = (
  game: Game,
  shuffledDeck: Card[],
  cardPerPlayer: number
) => {
  game.players.forEach(
    (player) => (player.hand = shuffledDeck.splice(0, cardPerPlayer))
  );
};
