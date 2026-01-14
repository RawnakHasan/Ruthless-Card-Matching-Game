import { useState } from "react";
import { socket } from "../../lib/socket";
import { usePlayerStore } from "../../store/usePlayerStore";
import { useRoomIdStore } from "../../store/useRoomIdStore";
import type { Card, CardColor, WildCard } from "shared";
import ColorPicker from "./ColorPicker";

const PlayerHand = () => {
  const { roomId } = useRoomIdStore();
  const myHand = usePlayerStore((state) => state.hand);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedWildCard, setSelectedWildCard] = useState<WildCard | null>(
    null
  );

  const handleCardClick = (card: Card) => {
    // Check if it's a Wild card
    if (card.type === "Wild") {
      // Show color picker
      setSelectedWildCard(card as WildCard);
      setShowColorPicker(true);
    } else {
      // Play normal/action card directly
      socket.emit("playCard", { card, roomId });
    }
  };

  const handleColorSelect = (color: CardColor) => {
    if (!selectedWildCard) return;

    // Create card with chosen color
    const cardWithColor: WildCard = {
      ...selectedWildCard,
      chosenColor: color,
    };

    // Send to server
    socket.emit("playCard", { card: cardWithColor, roomId });

    // Reset state
    setShowColorPicker(false);
    setSelectedWildCard(null);
  };

  const handleCancel = () => {
    setShowColorPicker(false);
    setSelectedWildCard(null);
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4 px-4">
          {myHand.map((card) => (
            <img
              onClick={() => handleCardClick(card)}
              key={card.id}
              src={card.image}
              alt={card.id}
              className="w-16 active:scale-95 transition cursor-pointer hover:scale-110 hover:brightness-110"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {showColorPicker && (
        <ColorPicker
          onColorSelect={handleColorSelect}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default PlayerHand;
