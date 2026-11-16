import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { getCartData } from '../utils/cartCalculations';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { CartDrawer } from '../components/CartDrawer';
import { ConfirmOrderModal } from '../components/ConfirmOrderModal';


export function HomePage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { data: products = [], isLoading, isError, error } = useProducts(search, category);
  const { data: allProducts = [] } = useProducts();
  const categories = Array.from(new Set(allProducts.map((product) => product.category)));//extraer categorias unicas

  const { cartItems, totalQuantity, orderTotal } = getCartData(allProducts, quantities);  //calculos del carrito
  const updateQuantity = (name: string, delta: number) => {    //acciones del carrito simplificadas

    setQuantities((prev) => {
      const next = { ...prev };
      const newQty = (next[name] ?? 0) + delta;
      if (newQty <= 0) delete next[name];
      else next[name] = newQty;
      return next;
    });
  };

  const removeProduct = (name: string) => setQuantities((prev) => {
    const next = { ...prev };
    delete next[name];
    return next;
  });

  const startNewOrder = () => {
    setQuantities({});
    setIsConfirmationOpen(false);
  };

  return (
    <main className="min-h-screen bg-rose-50 px-6 pb-8 pt-6 lg:px-0 lg:pb-16 lg:pt-20">
      <div className="mx-auto max-w-[1216px]">
        <Header />
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-rose-900">
            Buscar por nombre
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ej. Tiramisu"
              className="rounded-lg border border-rose-300 bg-white px-4 py-3 font-normal outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-rose-900">
            Filtrar por categoria
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200"
            >
              <option value="">Todas las categorias</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <section aria-label="Dessert selection">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                Array.from({ length: 6 }, (_, index) => <ProductSkeleton key={index} />)
              ) : isError ? (
                <p role="alert" className="col-span-full text-red-600">
                  No se pudieron cargar los productos: {error.message}
                </p>
              ) : products.length === 0 ? (
                <p className="col-span-full py-8 text-center text-sm font-semibold text-rose-500">
                  No se encontraron postres con esos filtros.
                </p>
              ) : (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantities[product.name] ?? 0}
                    onAdd={() => updateQuantity(product.name, 1)}
                    onIncrement={() => updateQuantity(product.name, 1)}
                    onDecrement={() => updateQuantity(product.name, -1)}
                  />
                ))
              )}
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