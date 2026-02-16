"use client";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  max = 99,
}: QuantitySelectorProps) {
  const handleIncrement = () => {
    if (quantity < max) onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  return (
    <div className="flex items-center border border-border rounded-lg w-fit">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-9 h-9 flex items-center justify-center text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary rounded-l-lg smooth-transition"
      >
        -
      </button>
      <span className="w-9 h-9 flex items-center justify-center text-sm font-medium tabular-nums border-x border-border">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="w-9 h-9 flex items-center justify-center text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary rounded-r-lg smooth-transition"
      >
        +
      </button>
    </div>
  );
}
