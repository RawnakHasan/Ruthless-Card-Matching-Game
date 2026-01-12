import { getGame } from "@server/lib/helpers/game";
import type { CustomSocket } from "shared/dist";

export const handleRoomExistence = (socket: CustomSocket) => {
  socket.on("checkRoomExistence", (roomId) => {
    getGame(roomId, socket);
  });
};
