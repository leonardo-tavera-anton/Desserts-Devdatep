import { useEffect, useRef } from 'react';
import type { CartItem } from '../types/product';

interface CartDrawerProps {
  items: CartItem[];
  totalQuantity: number;
  orderTotal: number;
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (productId: string) => void;
  onConfirmOrder: () => void;
}

export const CartDrawer = ({
  items,
  totalQuantity,
  orderTotal,
  isOpen,
  onClose,
  onRemoveItem,
  onConfirmOrder,
}: CartDrawerProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  return (
    <aside
      id="cart-drawer"
      role={isOpen ? 'dialog' : 'complementary'}
      aria-modal={isOpen || undefined}
      aria-labelledby="cart-title"
      className={`${
        isOpen
          ? 'fixed inset-y-0 right-0 z-50 h-dvh w-[min(90vw,24rem)] overflow-y-auto rounded-none'
          : 'hidden'
      } rounded-xl bg-white p-6 shadow-xl sm:p-8 lg:sticky lg:top-8 lg:block lg:h-fit lg:w-auto lg:max-w-none lg:overflow-visible lg:rounded-xl lg:shadow-sm`}
    >
      <div className="mb-6 flex items-center justify-between lg:mb-0">
        <h2 id="cart-title" className="text-2xl font-bold text-red-600">
          Your Cart ({totalQuantity})
        </h2>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar carrito"
          className="rounded-full border border-rose-300 px-3 py-1 text-rose-900 hover:bg-rose-50 lg:hidden"
        >
          &times;
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center py-8 text-center">
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt=""
            aria-hidden="true"
            className="mb-4 h-auto w-32"
          />
          <p className="text-sm font-semibold text-rose-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-6 max-h-[50vh] divide-y divide-rose-100 overflow-y-auto">
            {items.map(({ product, quantity }) => (
              <li key={product.name} className="flex items-center gap-3 py-4 first:pt-0">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-rose-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold text-red-600">{quantity}x</span>
                    <span className="ml-3 text-rose-500">@ ${product.price.toFixed(2)}</span>
                    <span className="ml-2 font-semibold text-rose-500">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveItem(product.id)} //modificado
                  aria-label={`Remove ${product.name} from cart`}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rose-300 text-xs text-rose-400 transition-colors hover:border-rose-900 hover:text-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  x 
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex items-center justify-between border-t border-rose-100 pt-5 text-sm text-rose-900">
            <span>Order Total</span>
            <strong className="text-2xl">${orderTotal.toFixed(2)}</strong>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-rose-50 p-3 text-center text-xs text-rose-900">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" aria-hidden="true" />
            <span>This is a <strong>carbon-neutral</strong> delivery</span>
          </div>

          <button
            type="button"
            onClick={onConfirmOrder}
            className="mt-6 w-full rounded-full bg-red-600 py-4 font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            Confirm Order
          </button>
        </>
      )}
    </aside>
  );
};
