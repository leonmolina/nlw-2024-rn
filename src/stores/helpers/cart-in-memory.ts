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