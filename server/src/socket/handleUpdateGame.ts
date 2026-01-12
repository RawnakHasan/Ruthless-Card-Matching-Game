import { getGame, sendGameDataToClient } from "@server/lib/helpers/game";
import type { CustomSocket } from "shared/dist";

export const handleUpdateGame = (socket: CustomSocket) => {
  socket.on("updateGame", ({ roomId }) => {
    // The Game instance is searched and prepared for sending to client
    const game = getGame(roomId, socket);

    // Game data Gets send to every Player in the same room
    sendGameDataToClient(game, roomId);
  });
};
