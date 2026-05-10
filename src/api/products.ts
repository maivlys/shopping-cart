
import type { Product } from "../types/Product";

export const fetchProducts = async (): Promise<Product[]> => {

  const response = await fetch("/data/data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await response.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 300);
  });
}
