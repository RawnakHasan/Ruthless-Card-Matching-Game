import type { CardColor } from "shared";

interface ColorPickerProps {
  onColorSelect: (color: CardColor) => void;
  onCancel: () => void;
}

const ColorPicker = ({ onColorSelect, onCancel }: ColorPickerProps) => {
  const colors: { name: CardColor; hex: string }[] = [
    { name: "Red", hex: "#FF5249" },
    { name: "Blue", hex: "#53A5DC" },
    { name: "Green", hex: "#34C838" },
    { name: "Yellow", hex: "#F4D84B" },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-background rounded-2xl p-8 max-w-md w-full mx-4 border-4 border-text shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Choose a Color</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => onColorSelect(color.name)}
              className="group relative p-8 rounded-xl border-4 border-text hover:scale-105 transition-all active:scale-95 shadow-lg hover:shadow-2xl"
              style={{ backgroundColor: color.hex }}
            >
              <span className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {color.name}
              </span>
              <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/20 transition-colors" />
            </button>
          ))}
        </div>

        <button
          onClick={onCancel}
          className="w-full py-3 bg-error text-white rounded-lg font-semibold hover:bg-error/90 transition border-2 border-text active:scale-95"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
