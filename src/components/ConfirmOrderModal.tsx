import type { CartItem } from './ProductCard';

interface ConfirmOrderModalProps {
  isOpen: boolean;
  items: CartItem[];
  orderTotal: number;
  onStartNewOrder: () => void;
}

export const ConfirmOrderModal = ({
  isOpen,
  items,
  orderTotal,
  onStartNewOrder,
}: ConfirmOrderModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        className="my-auto w-full max-w-[592px] rounded-2xl bg-white p-6 shadow-xl sm:p-10"
      >
        <img
          src="/assets/images/icon-order-confirmed.svg"
          alt=""
          aria-hidden="true"
          className="mb-5 h-10 w-10"
        />
        <h2 id="confirmation-title" className="mb-2 text-4xl font-bold text-rose-900">
          Order Confirmed
        </h2>
        <p className="mb-8 text-rose-500">We hope you enjoy your food!</p>

        <div className="mb-8 rounded-lg bg-rose-50 p-4 sm:p-6">
          <ul className="max-h-[40vh] divide-y divide-rose-100 overflow-y-auto">
            {items.map(({ product, quantity }) => (
              <li key={product.name} className="flex items-center gap-4 py-4 first:pt-0">
                <img
                  src={product.image.thumbnail}
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-12 shrink-0 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-rose-900">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold text-red-600">{quantity}x</span>
                    <span className="ml-3 text-rose-500">@ ${product.price.toFixed(2)}</span>
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-rose-900">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-rose-100 pt-5 text-sm text-rose-900">
            <span>Order Total</span>
            <strong className="text-2xl">${orderTotal.toFixed(2)}</strong>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartNewOrder}
          className="w-full rounded-full bg-red-600 py-4 font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        >
          Start New Order
        </button>
      </section>
    </div>
  );
};
