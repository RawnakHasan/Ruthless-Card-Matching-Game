import { socket } from "../../lib/socket";
import { usePlayerStore } from "../../store/usePlayerStore";
import { useRoomIdStore } from "../../store/useRoomIdStore";

const PlayerHand = () => {
  const { roomId } = useRoomIdStore();

  const myHand = usePlayerStore((state) => state.hand);

  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4 px-4">
        {myHand.map((card) => (
          <img
            onClick={() => socket.emit("playCard", { card, roomId })}
            key={card.id}
            src={card.image}
            alt={card.id}
            className="w-16 active:scale-95 transition cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
