import type { Card, Game } from "shared/dist";
import {
  handleDrawTwoCard,
  handleDrawFourCard,
  handleDrawSixCard,
  handleDrawTenCard,
  handleSevensSwap,
  handleZerosPass,
  handleReverseCard,
  handleSkipCard,
  handleSkipAllCard,
  handleDiscardAllCard,
  handleReverseDrawFourCard,
  handleColorRouletteCard,
} from "./CardEffects";

export const handleCardEffect = (game: Game, card: Card) => {
  switch (card.type) {
    case "Normal":
      switch (card.name) {
        case 0:
          handleZerosPass(game);
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          handleSevensSwap(game);
          break;
        case 8:
          break;
        case 9:
          break;
      }
      break;
    case "Action":
      switch (card.name) {
        case "Reverse":
          handleReverseCard(game);
          break;
        case "Skip":
          handleSkipCard(game);
          break;
        case "Draw 2":
          handleDrawTwoCard(game);
          break;
        case "Draw 4":
          handleDrawFourCard(game);
          break;
        case "Skip All":
          handleSkipAllCard(game);
          break;
        case "Discard All":
          handleDiscardAllCard(game, card.color);
          break;
      }
      break;
    case "Wild":
      switch (card.name) {
        case "Reverse Draw 4":
          handleReverseDrawFourCard(game);
          break;
        case "Draw 6":
          handleDrawSixCard(game);
          break;
        case "Draw 10":
          handleDrawTenCard(game);
          break;
        case "Color Roulette":
          handleColorRouletteCard(game, card.chosenColor!);
          break;
      }
      break;
  }
};
