import type { Game, Card, Player } from "shared/dist";
import { handleCardEffect } from "./handleCardEffect";

export const playCard = (player: Player, game: Game, card: Card) => {
  player.hand = player.hand.filter((c) => c.id !== card.id);

  handleCardEffect(game, card);

  game.discardPile.push(card);
};
