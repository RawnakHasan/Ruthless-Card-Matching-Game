import type { Card, Player } from "shared/dist";

export const getCardWithCardId = (player: Player, card: Card): Card => {
  const cardWithCardId = player.hand.find((c) => c.id === card.id);

  if (!cardWithCardId) {
    throw new Error(
      `Card with Card Id: ${card.id} wasn't found in ${player.username} hand`
    );
  }

  return cardWithCardId;
};
