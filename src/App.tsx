import { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ConfirmOrderModal } from './components/ConfirmOrderModal';
import type { CartItem, Product } from './types/product';
import data from './data/data.json';

export function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const products = data.products as Product[];

  const cartItems: CartItem[] = products.flatMap((product) => {
    const quantity = quantities[product.name] ?? 0;
    return quantity > 0 ? [{ product, quantity }] : [];
  });

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const orderTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const increaseQuantity = (productName: string) => {
    setQuantities((current) => ({
      ...current,
      [productName]: (current[productName] ?? 0) + 1,
    }));
  };

  const decreaseQuantity = (productName: string) => {
    setQuantities((current) => {
      const next = { ...current };
      const quantity = next[productName] ?? 0;

      if (quantity <= 1) {
        delete next[productName];
      } else {
        next[productName] = quantity - 1;
      }

      return next;
    });
  };

  const removeProduct = (productName: string) => {
    setQuantities((current) => {
      const next = { ...current };
      delete next[productName];
      return next;
    });
  };

  const startNewOrder = () => {
    setQuantities({});
    setIsConfirmationOpen(false);
  };

  return (
    <main className="min-h-screen bg-rose-50 px-6 pb-8 pt-6 lg:px-0 lg:pb-16 lg:pt-20">
      <div className="mx-auto max-w-[1216px]">
        <Header />
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <section aria-label="Dessert selection">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.name}
                  product={product}
                  quantity={quantities[product.name] ?? 0}
                  onAdd={() => increaseQuantity(product.name)}
                  onIncrement={() => increaseQuantity(product.name)}
                  onDecrement={() => decreaseQuantity(product.name)}
                />
              ))}
            </div>
          </section>

          <CartDrawer
            items={cartItems}
            totalQuantity={totalQuantity}
            orderTotal={orderTotal}
            onRemoveItem={removeProduct}
            onConfirmOrder={() => setIsConfirmationOpen(true)}
          />
        </div>
      </div>

      <ConfirmOrderModal
        isOpen={isConfirmationOpen}
        items={cartItems}
        orderTotal={orderTotal}
        onStartNewOrder={startNewOrder}
      />
    </main>
  );
}
