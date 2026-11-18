import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { CartDrawer } from '../components/CartDrawer';
import { ConfirmOrderModal } from '../components/ConfirmOrderModal';
import { useCartStore } from '../store/cartStore';


export function HomePage() {
  //declaramos
  const [category, setCategory] = useState('');
  const items = useCartStore((state) => state.items); //llamamos al estado del carrito
  const clearCart = useCartStore((state) => state.clearCart); //en linea 29

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  //metodo de busqueda
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data: products = [], isLoading, isError, error } = useProducts(search, category);
  const { data: allProducts = [] } = useProducts();

  const categories = Array.from(new Set(allProducts.map((product) => product.category)));//extraer categorias unicas

  //metodo para calcular cantidad de productos en el carrito
  const cartItems = items;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
 
  //metodo nueva orden
  const startNewOrder = () => {
    clearCart();
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
                Array.from({ length: 6 }, (_, index) => <ProductSkeleton key={index} />) //error no encontrado
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
                    key={product.id} //mas
                    product={product} //mas
                    quantity={items.find((item) => item.product.id === product.id)?.quantity ?? 0}
                    onAdd={() => addItem(product)}
                    onIncrement={() => incrementItem(product.id)}
                    onDecrement={() => decrementItem(product.id)}
                  />
                ))
              )}
            </div>
          </section>

          <CartDrawer
            items={cartItems}
            totalQuantity={totalQuantity}
            orderTotal={orderTotal}
            onRemoveItem={removeItem}
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