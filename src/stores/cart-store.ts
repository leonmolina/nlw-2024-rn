import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from "@/stores/helpers/cart-in-memory";

export interface CartProduct extends ProductProps {
  quantity: number;
}

interface StateProps {
  products: CartProduct[];
  add: (product: ProductProps) => void;
  remove: (product: CartProduct) => void;
  clear: () => void;
}

export const useCartStore = create<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) => set((state) => ({
    products: cartInMemory.add(state.products, product),
  })),
  remove: (product: CartProduct) => set((state) => ({
    products: cartInMemory.remove(state.products, product),
  })),
  clear: () => set({ products: cartInMemory.clear() }),
}))