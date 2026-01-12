import {
  dealCardsToPlayer,
  fisherYatesShuffle,
  generateDeck,
  getGame,
} from "@server/lib/helpers/game";
import { sendGameDataToClient } from "@server/lib/helpers/game/sendGameDataToClient";
import type { CustomIo, CustomSocket } from "shared/dist";

export const handleStartGame = (socket: CustomSocket) => {
  socket.on("startGame", ({ roomId }) => {
    // Gets the Game Obj with roomId given from client
    const game = getGame(roomId, socket);

    // If the requester isn't the host then game doesn't start
    if (socket.id !== game.hostSocketId) {
      throw new Error(
        `Non Host tried to start a Game with Room Code ${roomId}`
      );
    }

    // If only the host is present and no other player the game doesn't start
    if (game.players.length < 2) {
      throw new Error(`There is only one Player in the Game`);
    }

    // generateDeck() function generates a full deck of UNO No Mercy Cards and Uses Fisher Yates Algorithm to shuffle them
    const shuffledDeck = fisherYatesShuffle(generateDeck());

    // Game Phase changes for updates in client
    game.gamePhase = "playing";

    // Card are dealed to players
    dealCardsToPlayer(game, shuffledDeck, 25);

    // First card from the deck is inserted into the discard Pile & rest of the cards are assigned to deck Pile
    const topCard = shuffledDeck.shift()!;
    game.discardPile = [topCard];
    game.deck = shuffledDeck;

    // Game Data gets send to the client
    sendGameDataToClient(game, roomId);
  });
};
