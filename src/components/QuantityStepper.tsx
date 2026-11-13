interface QuantityStepperProps {
  quantity: number;
  productName: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityStepper = ({
  quantity,
  productName,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) => {
  return (
    <div className="mx-auto flex w-full max-w-40 items-center justify-between rounded-full bg-red-600 px-4 py-3 font-semibold text-white shadow-md">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${productName}`}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-white transition-colors hover:bg-white hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        -
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${productName}`}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-white transition-colors hover:bg-white hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        +
      </button>
    </div>
  );
};
