import type { CardColor, Game } from "shared/dist";
import { getNextPlayer, reshuffle } from "../../game";
import { drawCards } from "../../game/drawCards";

export const handleColorRouletteCard = (game: Game, chosenColor: CardColor) => {
  const targetPlayer = getNextPlayer(game);

  if (!targetPlayer) {
    console.log("Target player not found");
    return;
  }

  // Draw until a card matches the chosen color and is normal/action (not Wild)
  while (true) {
    if (game.deck.length === 0) reshuffle(game);

    const drawnCards = drawCards(game, 1);
    const drawnCard = drawnCards[0];

    if (!drawnCard) break;

    targetPlayer.hand.push(drawnCard);

    if (drawnCard.type !== "Wild" && drawnCard.color === chosenColor) {
      break; // stop drawing
    }
  }
};
