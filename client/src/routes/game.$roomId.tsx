import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useRoomIdStore } from "../store/useRoomIdStore";
import Sidebar from "../components/game/Sidebar";
import GameBoard from "../components/game/GameBoard";
import { useGameStore } from "../store/useGameStore";
import { usePlayerStore } from "../store/usePlayerStore";

export const Route = createFileRoute("/game/$roomId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { roomId } = Route.useParams();

  const { setRoomId } = useRoomIdStore();
  const navigate = useNavigate();

  const { setGameState } = useGameStore();
  const { setPlayer } = usePlayerStore();

  if (!socket.connected) {
    socket.connect();
  }

  useEffect(() => {
    socket.emit("checkRoomExistence", roomId);

    socket.emit("updateGame", { roomId });

    setRoomId(roomId);
  }, [roomId, setRoomId]);

  socket.on("roomExistence", (roomExistence) => {
    if (roomExistence === false) {
      navigate({ to: "/" });
    }
  });

  socket.on("gameUpdate", (game) => {
    setGameState(game);
  });

  socket.on("userDataUpdate", (player) => {
    setPlayer(player);
  });

  return (
    <div className="h-screen flex p-4">
      <Sidebar />
      <div className="border mx-4" />
      <GameBoard />
    </div>
  );
}
