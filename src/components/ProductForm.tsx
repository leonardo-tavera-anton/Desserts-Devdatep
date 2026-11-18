import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductFormValues } from '../schemas/productSchema';
//importaciones para react hook form validando los datos con el esquema ZOD


interface ProductFormProps { //interfaz contenedora del boton y los datos del formulario
  defaultValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  submitLabel: string;
}

export const ProductForm = ({ defaultValues, onSubmit, submitLabel }: ProductFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  //register devolvera name dentro del campo del producto q se nombrara
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-xl bg-white p-6 shadow-sm">
    <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-rose-900">Nombre:</label>
        <input id="name" {...register('name')} className="w-full rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200" />
        {errors.name && <p role="alert" className="text-sm text-red-600">{errors.name.message}</p>}
    </div>
    <div className="grid gap-2">
        <label htmlFor="category" className="text-sm font-semibold text-rose-900">Categoria:</label>
        <input id="category" {...register('category')} className="w-full rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200" />
        <p className="text-xs text-rose-500">Las categorias nuevas se registran al guardar el producto</p>
        {errors.category && <p role="alert" className="text-sm text-red-600">{errors.category.message}</p> }
        
    </div>
    <div className="grid gap-2">
        <label htmlFor="price" className="text-sm font-semibold text-rose-900">Precio:</label>
        <input id="price" {...register('price',{valueAsNumber: true})} className="w-full rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200" />
        {errors.price && <p role="alert" className="text-sm text-red-600">{errors.price.message}</p> }
    </div>


    <div className="grid gap-2">
    <label htmlFor="image-thumbnail" className="text-sm font-semibold text-rose-900">Imagen thumbnail:</label>
    <input id="image-thumbnail" {...register('image.thumbnail')} className="w-full rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200" />
    {errors.image?.thumbnail && (
        <p role="alert" className="text-sm text-red-600">{errors.image.thumbnail.message}</p>
    )}
    </div>

    <div className="grid gap-2">
    <label htmlFor="image-mobile" className="text-sm font-semibold text-rose-900">Imagen mobile:</label>
    <input id="image-mobile" {...register('image.mobile')} className="w-full rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200" />
    {errors.image?.mobile && (
        <p role="alert" className="text-sm text-red-600">{errors.image.mobile.message}</p>
    )}
    </div>

    <div className="grid gap-2">
    <label htmlFor="image-tablet" className="text-sm font-semibold text-rose-900">Imagen tablet:</label>
    <input id="image-tablet" {...register('image.tablet')} className="w-full rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200" />
    {errors.image?.tablet && (
        <p role="alert" className="text-sm text-red-600">{errors.image.tablet.message}</p>
    )}
    </div>

    <div className="grid gap-2">
    <label htmlFor="image-desktop" className="text-sm font-semibold text-rose-900">Imagen desktop:</label>
    <input id="image-desktop" {...register('image.desktop')} className="w-full rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200" />
    {errors.image?.desktop && (
        <p role="alert" className="text-sm text-red-600">{errors.image.desktop.message}</p>
    )}
    </div>
                <button type="submit" className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">{submitLabel}</button>
    </form>
    
  );
};
