import { createContext } from "react";
import { IProduct } from "../../interfaces";

interface ContextProps {
  products?: IProduct[];

  getProducts: () => void;
}

export const ProductContext = createContext({} as ContextProps);
