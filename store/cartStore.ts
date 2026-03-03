import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
        );

        if (existingIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += item.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.size === size && i.color === color)
          ),
        });
      },
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        const items = get().items.map((item) =>
          item.productId === productId && item.size === size && item.color === color
            ? { ...item, quantity }
            : item
        );
        set({ items });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'deity-cart',
      storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      }),
    }
  )
);
