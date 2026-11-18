import { useEffect, useRef, useState } from 'react';
import { usePaginatedProducts } from '../hooks/useProductsQueries';
import { useCategories } from '../hooks/useCategories';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { CartDrawer } from '../components/CartDrawer';
import { ConfirmOrderModal } from '../components/ConfirmOrderModal';
import { useCartStore } from '../store/cartStore';


export function HomePage() {
  const [page, setPage] = useState(1);
  const perPage = 8;
  const [category, setCategory] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const items = useCartStore((state) => state.items); //llamamos al estado del carrito
  const clearCart = useCartStore((state) => state.clearCart); //en linea 29

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  //metodo de busqueda
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [search, setSearch] = useState('');
  const {
    data: productPage,
    isLoading,
    isError,
    error,
  } = usePaginatedProducts(search, category, page, perPage);
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();
  const products = productPage?.data ?? [];

  //metodo para calcular cantidad de productos en el carrito
  const cartItems = items;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false);
        cartButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen]);

  const closeCart = () => {
    setIsCartOpen(false);
    cartButtonRef.current?.focus();
  };
 
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
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Ej. Tiramisu"
              className="rounded-lg border border-rose-300 bg-white px-4 py-3 font-normal outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-rose-900">
            Filtrar por categoria
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200"
              disabled={isCategoriesLoading || isCategoriesError}
            >
              <option value="">Todas las categorias</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {isCategoriesError && (
              <span role="alert" className="text-sm font-normal text-red-600">
                No se pudieron cargar las categorias.
              </span>
            )}
          </label>
        </div>

        <button
          ref={cartButtonRef}
          type="button"
          aria-controls="cart-drawer"
          aria-expanded={isCartOpen}
          onClick={() => setIsCartOpen(true)}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 lg:hidden"
        >
          Ver carrito ({totalQuantity})
        </button>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <section aria-label="Dessert selection">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                Array.from({ length: perPage }, (_, index) => <ProductSkeleton key={index} />) //error no encontrado
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
            {!isLoading && !isError && productPage && productPage.pages > 1 && ( //manejo d errores y paginacion
              <nav
                aria-label="Paginacion de productos"
                className="mt-8 flex items-center justify-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                  disabled={!productPage.prev}
                  className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-900 hover:border-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-sm text-rose-900">
                  Pagina {page} de {productPage.pages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  disabled={!productPage.next}
                  className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-900 hover:border-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Siguiente
                </button>
              </nav>
            )}
          </section>

          {isCartOpen && (
            <button
              type="button"
              aria-label="Cerrar carrito"
              onClick={closeCart}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
          )}

          <CartDrawer
            items={cartItems}
            totalQuantity={totalQuantity}
            orderTotal={orderTotal}
            isOpen={isCartOpen}
            onClose={closeCart}
            onRemoveItem={removeItem}
            onConfirmOrder={() => {
              setIsCartOpen(false);
              setIsConfirmationOpen(true);
            }}
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