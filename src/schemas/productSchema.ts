import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio'),
  category: z.string().trim().min(1, 'La categoría es obligatoria'),
  price: z.number().positive('El precio debe ser mayor o igual a 0'), //exige q sea mayor a 0 .positive
  image: z.object({
  thumbnail: z.string().trim().min(1, 'Falta la imagen thumbnail'),
  mobile: z.string().trim().min(1, 'Falta la imagen mobile'), //predefinido
  tablet: z.string().trim().min(1, 'Falta la imagen tablet'), //predefinido
  desktop: z.string().trim().min(1, 'Falta la imagen desktop'), //predefinido
}),
});

export type ProductFormValues = z.infer<typeof productSchema>;