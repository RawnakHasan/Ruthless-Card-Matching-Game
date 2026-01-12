import { Player } from "shared";
import { create } from "zustand";

interface PlayerStore extends Player {
  setPlayer: (player: Player) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  hand: [],
  host: false,
  id: 0,
  username: "",
  uuid: "",
  setPlayer: (player) => set((state) => ({ ...state, ...player })),
}));
