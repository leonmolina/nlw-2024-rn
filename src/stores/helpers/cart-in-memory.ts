import { ProductProps } from "@/utils/data/products"
import { CartProduct } from "../cart-store"

export const add = (products: CartProduct[], newProduct: ProductProps) => {
  const existingProduct = products.find(({ id }) => newProduct.id === id);

  if (!existingProduct) return [...products, { ...newProduct, quantity: 1 }];
  
  return products.map((product) => product.id === existingProduct.id 
    ? { ...product, quantity: product.quantity + 1 }
    : product
  );

}

export const remove = (products: CartProduct[], product: CartProduct) => {
  if (product.quantity === 1) return products.filter(({ id }) => id !== product.id);

  return products.map((item) => item.id === product.id
    ? { ...item, quantity: item.quantity - 1 }
    : item
  );
};

export const clear = () => [];