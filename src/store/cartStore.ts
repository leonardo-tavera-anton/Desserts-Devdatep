import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product } from '../types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({ //primero se define el estado inicial y las acciones del carrito ya no set,get
        items: [],
        
        addItem: (product) =>
        set((state) => {
            const alreadyAdded = state.items.some(
            (item) => item.product.id === product.id
            );

            if (alreadyAdded) {
            return {
                items: state.items.map((item) =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
            };
            }

            return {
            items: [...state.items, { product, quantity: 1 }],
            };
        }),
        
        removeItem: (productId) =>
        set((state) => ({
            items: state.items.filter(
            (item) => item.product.id !== productId
            ),
        })),

        incrementItem: (productId) =>
        set((state) => ({
            items: state.items.map((item) =>
            item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
        })),

        decrementItem: (productId) =>
        set((state) => ({
            items: state.items
            .map((item) =>
                item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

        clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', //nombre de la clave en el almacenamiento
        storage: createJSONStorage(() => localStorage), //usar localStorage para persistencia
    }
  )
  
);



