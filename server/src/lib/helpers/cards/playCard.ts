import type { Game, Card } from "shared/dist";
import { isValidPlay } from "./isValidPlay";
import { getCurrentPlayer, getNextPlayer } from "../game";
import { handleCardEffect } from "./handleCardEffect";

export const playCard = (game: Game, card: Card) => {
  const currentPlayer = getCurrentPlayer(game);

  if (!isValidPlay(currentPlayer, game, card)) {
    throw new Error("Invalid Card Play");
  }

  currentPlayer.hand = currentPlayer.hand.filter((c) => c.id !== card.id);

  handleCardEffect(game, card);

  game.discardPile.push(card);

  let skipTurnAdvance = false;

  switch (card.type) {
    case "Wild":
      if (
        card.name === "Reverse Draw 4" ||
        card.name === "Draw 6" ||
        card.name === "Draw 10" ||
        card.name === "Color Roulette"
      ) {
        skipTurnAdvance = true; // the effect handles turn advancement
      }
      break;
    case "Action":
      if (card.name === "Skip All") skipTurnAdvance = true;
      break;
  }

  if (!skipTurnAdvance) {
    const { id: nextPlayerId } = getNextPlayer(game);
    game.playerTurn = nextPlayerId;
  }
};
