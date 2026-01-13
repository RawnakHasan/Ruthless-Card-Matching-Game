import {
  getGame,
  getPlayerWithPlayerId,
  sendGameDataToClient,
} from "@server/lib/helpers/game";
import { drawCards } from "@server/lib/helpers/game/drawCards";
import { getNextPlayer } from "@server/lib/helpers/game";
import type { CustomSocket } from "shared/dist";

export const handleGetCard = (socket: CustomSocket) => {
  socket.on("getCard", ({ roomId, socketId }) => {
    const game = getGame(roomId, socket);
    const player = getPlayerWithPlayerId(game, socketId);

    if (game.playerTurn !== player.id) {
      socket.emit("errors", "Not your turn");
      return;
    }

    // Calculate draw amount
    const totalDraw = game.drawCount > 0 ? game.drawCount : 1;

    // Draw cards
    const drawnCards = drawCards(game, totalDraw);
    player.hand.push(...drawnCards);

    // ✅ CRITICAL: Reset drawCount AFTER drawing
    game.drawCount = 0;

    // Advance turn
    const { id: nextPlayerId } = getNextPlayer(game);
    game.playerTurn = nextPlayerId;

    sendGameDataToClient(game, roomId);
  });
};
