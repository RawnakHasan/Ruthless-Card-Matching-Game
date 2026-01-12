import {
  getGame,
  getPlayerWithPlayerId,
  reshuffle,
  sendGameDataToClient,
  updatePlayerTurn,
} from "@server/lib/helpers/game";
import type { CustomSocket } from "shared/dist";

export const handleGetCard = (socket: CustomSocket) => {
  socket.on("getCard", ({ roomId, socketId }) => {
    const game = getGame(roomId, socket);

    const player = getPlayerWithPlayerId(game, socketId);

    if (game.playerTurn === player.id) {
      if (game.deck.length === 0) {
        reshuffle(game);
      }
      const getCard = game.deck.shift();

      if (!getCard) {
        throw new Error("couldn't get card from deck");
      }

      player.hand.push(getCard);
      updatePlayerTurn(game);
    }

    sendGameDataToClient(game, roomId);
  });
};
