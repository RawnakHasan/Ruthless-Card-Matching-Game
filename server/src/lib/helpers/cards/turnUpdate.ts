import type { Card, Game } from "shared/dist";
import { getNextPlayer } from "../game";

export const turnUpdate = (game: Game, card: Card) => {
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
      if (card.name === "Skip All" || card.name === "Skip") {
        skipTurnAdvance = true;
      }
      break;
  }

  if (!skipTurnAdvance) {
    const { id: nextPlayerId } = getNextPlayer(game);
    game.playerTurn = nextPlayerId;
  }
};
