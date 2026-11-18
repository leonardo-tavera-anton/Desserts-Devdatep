import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProductsMutations';
import { ProductForm } from '../components/ProductForm';
import type { Product } from '../types/product';
import type { ProductFormValues } from '../schemas/productSchema';

const emptyProductValues: ProductFormValues = {
  name: '',
  category: '',
  price: 0,
  image: {
    thumbnail: '',
    mobile: '',
    tablet: '',
    desktop: '',
  },
};

export function ProductManagementPage()
{
    const[editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
    const { data: products = [], isLoading, isError, error } = useProducts();
        const createMutation = useCreateProduct();
        const updateMutation = useUpdateProduct();
        const deleteMutation = useDeleteProduct();

        const handleFormSubmit = (values: ProductFormValues) => {
            const onSuccess = () => setEditingProduct(null);

            if (editingProduct) {
                updateMutation.mutate(
                { id: editingProduct.id, product: values },
                
                { onSuccess }
                );
            } else {
                createMutation.mutate(values, { onSuccess });
            }
            };
            return (
                <main className="min-h-screen bg-rose-50 px-6 py-10 sm:px-8">
                    <div className="mx-auto max-w-4xl space-y-6">
                    <Link to="/" className="inline-flex font-semibold text-red-600 hover:underline">
                        Volver a la tienda
                    </Link>
                    <h1 className="text-3xl font-bold text-rose-900">Administrar productos</h1>

                    <ProductForm
                    key={editingProduct?.id ?? 'new'}
                    defaultValues={editingProduct ?? emptyProductValues}
                    onSubmit={handleFormSubmit}
                    submitLabel={editingProduct ? 'Guardar cambios' : 'Crear producto'}
                    />

                    {isLoading && <p className="text-sm text-rose-500">Cargando productos...</p>}
                    {isError && <p role="alert" className="text-sm text-red-600">{error.message}</p>}

                    {!isLoading && !isError && products.map((product) => (
                    <article key={product.id} className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-semibold text-rose-900">{product.name}</span>
                        <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(product)}
                          className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-900 transition-colors hover:border-red-600 hover:text-red-600"
                        >
                        Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(product)}
                          className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                        >
                        Eliminar
                        </button>
                        </div>
                    </article>
                    ))}
                    {pendingDelete && (
                        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
                            <section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="delete-title"
                            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                            >
                            <h2 id="delete-title" className="text-xl font-bold text-rose-900">¿Eliminar {pendingDelete.name}?</h2>
                            <p className="mt-2 text-sm text-rose-500">Esta acción no se puede deshacer.</p>

                            <div className="mt-6 flex justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setPendingDelete(null)}
                              className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-900 hover:bg-rose-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                deleteMutation.mutate(pendingDelete.id, {
                                    onSuccess: () => setPendingDelete(null),
                                })
                                }
                                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                            >
                                Confirmar
                            </button>
                            </div>
                            </section>
                        </div>
                        )}


                        {createMutation.isError && <p role="alert" className="text-sm text-red-600">No se pudo crear: {createMutation.error.message}</p>}
                        {updateMutation.isError && <p role="alert" className="text-sm text-red-600">No se pudo editar: {updateMutation.error.message}</p>}
                        {deleteMutation.isError && <p role="alert" className="text-sm text-red-600">No se pudo eliminar: {deleteMutation.error.message}</p>}
                    </div>
                </main>
            );
}


