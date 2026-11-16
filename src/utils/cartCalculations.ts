import type { Product, CartItem } from '../types/product';
//evitar carga al home  con calculos del carrito centralizados
export const getCartData = (products: Product[], quantities: Record<string, number>) => {
  const cartItems: CartItem[] = products.flatMap((product) => {
    const quantity = quantities[product.name] ?? 0;
    return quantity > 0 ? [{ product, quantity }] : [];
  });

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const orderTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return { cartItems, totalQuantity, orderTotal };
};
