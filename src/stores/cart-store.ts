import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware"

import { ProductProps } from "@/utils/data/products";
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

export const useCartStore = create(persist<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) => set((state) => ({
    products: cartInMemory.add(state.products, product),
  })),
  remove: (product: CartProduct) => set((state) => ({
    products: cartInMemory.remove(state.products, product),
  })),
  clear: () => set({ products: cartInMemory.clear() }),
}), {
  name: "nlw-expert:cart",
  storage: createJSONStorage(() => AsyncStorage),
}));
