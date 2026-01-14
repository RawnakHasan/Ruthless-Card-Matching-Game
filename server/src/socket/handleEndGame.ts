import { Games } from "@server/games";
import type { CustomSocket } from "shared/dist";
import { io } from "server";

export const handleEndGame = (socket: CustomSocket) => {
  socket.on("endGame", ({ roomId }) => {
    Games.delete(roomId);
    io.to(roomId).emit("gameEnded", "Game Finsihed");
  });
};
