import { playCard } from "@server/lib/helpers/cards/playCard";
import { getGame, sendGameDataToClient } from "@server/lib/helpers/game";
import type { CustomSocket } from "shared/dist";

export const handlePlayCard = (socket: CustomSocket) => {
  socket.on("playCard", ({ card, roomId }) => {
    const game = getGame(roomId, socket);

    playCard(game, card, socket);
    sendGameDataToClient(game, roomId);
  });
};
