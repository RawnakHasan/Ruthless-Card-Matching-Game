import type { Player } from "shared/dist";

export const createPlayer = (
  playersLength: number,
  username: string,
  socketId: string,
  isHost = false
): Player => {
  return {
    id: playersLength,
    uuid: socketId,
    username,
    hand: [],
    host: isHost,
  };
};
