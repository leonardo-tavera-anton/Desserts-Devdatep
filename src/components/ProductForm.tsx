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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div> //register name dentro del campo del producto q se nombrara
        <label htmlFor="name">Nombre:</label>
        <input id="name" {...register('name')} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
    </div>
    </form>
  );
};
