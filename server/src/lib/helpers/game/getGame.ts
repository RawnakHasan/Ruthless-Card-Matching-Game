import { Games } from "@server/games";
import { io } from "@server/index";
import type { CustomSocket, Game } from "shared/dist";

export const getGame = (roomId: string, socket: CustomSocket): Game => {
  const game = Games.get(roomId);

  if (!game) {
    io.to(socket.id).emit("roomNotFoundError", {
      message: `Game with Room Id ${roomId} couldn't be found`,
    });
    io.to(socket.id).emit("roomExistence", false);
    throw new Error(`Game not found for roomId: ${roomId}`);
  }

  return game;
};
