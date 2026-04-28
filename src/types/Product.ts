export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string[];
  color_filter: string[];
  type: string[];
  colorOptions: {
    color: string;
    id: number;
  }[];
  material: string;
  length: string;
};