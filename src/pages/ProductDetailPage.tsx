import { isAxiosError } from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { NotFoundPage } from './NotFoundPage';

export function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(id ?? '');

  if (!id) return <NotFoundPage />;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-rose-50 px-6 py-10">
        <div className="mx-auto max-w-4xl animate-pulse rounded-xl bg-white p-8">
          <div className="mb-6 aspect-[4/3] rounded-xl bg-rose-200" />
          <div className="mb-3 h-4 w-1/3 rounded bg-rose-200" />
          <div className="mb-4 h-8 w-2/3 rounded bg-rose-200" />
          <div className="h-6 w-1/4 rounded bg-rose-200" />
        </div>
      </main>
    );
  }

  if (isError) {
    if (isAxiosError(error) && error.response?.status === 404) { //si no presenta
      return <NotFoundPage />;
    }

    return (
      <main className="min-h-screen bg-rose-50 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-8">
          <p role="alert" className="text-red-600">
            No se pudo cargar el producto: {error.message}
          </p>
          <Link to="/" className="mt-6 inline-block font-semibold text-red-600 hover:underline">
            Volver a los postres
          </Link>
        </div>
      </main>
    );
  }

  if (!product) return <NotFoundPage />;

  return (
    <main className="min-h-screen bg-rose-50 px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="mb-6 inline-block font-semibold text-red-600 hover:underline">
          &larr; Volver a los postres
        </Link>
        <article className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
          <img
            src={product.image.desktop}
            alt={product.name}
            className="h-full w-full rounded-xl object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="mb-2 text-sm text-rose-500">{product.category}</p>
            <h1 className="text-3xl font-bold text-rose-900">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold text-red-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}