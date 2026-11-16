import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-rose-50 px-6 text-center">
      <section className="rounded-2xl bg-white p-10 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-600">404</p>
        <h1 className="mt-3 text-3xl font-bold text-rose-900">Producto no encontrado</h1>
        <p className="mt-3 text-rose-500">No existe un producto con esa direcci&oacute;n.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Volver a la tienda
        </Link>
      </section>
    </main>
  );
}