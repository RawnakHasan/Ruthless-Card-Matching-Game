import {
  getGame,
  getPlayerWithPlayerId,
  reshuffle,
  sendGameDataToClient,
  updatePlayerTurn,
} from "@server/lib/helpers/game";
import { drawCards } from "@server/lib/helpers/game/drawCards";
import type { CustomSocket } from "shared/dist";

export const handleGetCard = (socket: CustomSocket) => {
  socket.on("getCard", ({ roomId, socketId }) => {
    const game = getGame(roomId, socket);
    const player = getPlayerWithPlayerId(game, socketId);

    if (game.playerTurn !== player.id) {
      return;
    }

    const totalDraw = game.drawCount > 0 ? game.drawCount : 1;
    const drawnCards = drawCards(game, totalDraw);

    player.hand.push(...drawnCards);
    game.drawCount = 0;

    updatePlayerTurn(game);
    sendGameDataToClient(game, roomId);
  });
};
