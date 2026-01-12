import type { Game, Player } from "shared/dist";

export const getPlayerWithUsername = (game: Game, username: string): Player => {
  const playerWithUsername = game.players.find(
    (player) => player.username === username
  );

  if (!playerWithUsername) {
    throw new Error(`Player with username: ${username} not found`);
  }

  return playerWithUsername;
};

export const getPlayerWithPlayerId = (game: Game, socketId: string): Player => {
  const playerWithSocketId = game.players.find(
    (player) => player.uuid === socketId
  );

  if (!playerWithSocketId) {
    throw new Error(`Player with username: ${socketId} not found`);
  }

  return playerWithSocketId;
};

export const getCurrentPlayer = (game: Game): Player => {
  const currentPlayer = game.players.find(
    (player) => player.id === game.playerTurn
  );

  if (!currentPlayer) {
    throw new Error(`Player not Found`);
  }

  return currentPlayer;
};
