import type { CardColor, Game } from "shared/dist";
import { getNextPlayer, reshuffle } from "../../game";

export const handleColorRouletteCard = (game: Game, chosenColor: CardColor) => {
  const targetPlayer = getNextPlayer(game);

  if (!targetPlayer) throw new Error("Target player not found");

  // Draw until a card matches the chosen color and is normal/action (not Wild)
  while (true) {
    if (game.deck.length === 0) {
      reshuffle(game);
    }

    const drawnCard = game.deck.shift()!; // draw from top

    targetPlayer.hand.push(drawnCard);

    if (drawnCard.type !== "Wild" && drawnCard.color === chosenColor) {
      break; // stop drawing
    }
  }
};
