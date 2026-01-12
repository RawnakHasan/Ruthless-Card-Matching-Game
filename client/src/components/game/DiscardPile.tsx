import { Card } from "shared";
import { useDiscardPile } from "../../hooks/gameSelectors";

function rotationFromCard(card: Card) {
  const str = card.id ?? "";
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) % 360;
}

const DiscardPile = () => {
  const discardPile = useDiscardPile();

  return (
    <div className="flex items-center justify-center aspect-square size-40 relative">
      {discardPile.length === 0 ? (
        <span className="text-center">Game Didn't Started yet</span>
      ) : (
        <>
          {discardPile.map((card, index) => (
            <img
              key={index}
              src={card.image}
              className="absolute inset-0"
              style={{
                transform: `rotate(${rotationFromCard(card)}deg)`,
                zIndex: discardPile.length - index,
              }}
              draggable={false}
            />
          ))}
        </>
      )}
    </div>
  );
};
export default DiscardPile;
