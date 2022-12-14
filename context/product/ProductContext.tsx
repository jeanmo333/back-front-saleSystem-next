import { createContext } from "react";
import { IProduct } from "../../interfaces";

interface ContextProps {
  products?: IProduct[];

  registerProduct: (product: IProduct) => Promise<{
    hasError?: boolean;
    message?: string;
}>;


}

export const ProductContext = createContext({} as ContextProps);
