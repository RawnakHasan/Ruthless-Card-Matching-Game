import { isValidPlay } from "@server/lib/helpers/cards/isValidPlay";
import { playCard } from "@server/lib/helpers/cards/playCard";
import { turnUpdate } from "@server/lib/helpers/cards/turnUpdate";
import {
  getGame,
  getPlayerWithPlayerId,
  sendGameDataToClient,
} from "@server/lib/helpers/game";
import type { CustomSocket } from "shared/dist";

export const handlePlayCard = (socket: CustomSocket) => {
  socket.on("playCard", ({ card, roomId }) => {
    const game = getGame(roomId, socket);

    const currentPlayer = getPlayerWithPlayerId(game, socket.id);

    if (currentPlayer.id !== game.playerTurn) {
      socket.emit("errors", "Not your Turn Now");
      return;
    }

    if (card.type === "Wild" && !card.chosenColor) {
      socket.emit("errors", "Wild card must have a chosen color");
      return;
    }

    if (!isValidPlay(game, card)) {
      socket.emit("errors", "Card is not valid");
      return;
    }

    playCard(currentPlayer, game, card);
    turnUpdate(game, card);

    sendGameDataToClient(game, roomId);
  });
};
