import { createContext, Dispatch, SetStateAction } from "react";
import { ICategory } from "../../interfaces";

interface ContextProps {
  categories?: ICategory[];

  loading: boolean;

  setCategories: Dispatch<SetStateAction<ICategory[]>>;

  registerCategory: (
    category: ICategory
  ) => Promise<{ category?: ICategory; hasError?: boolean; message?: string }>;

  updateCategory: (
    category: ICategory
  ) => Promise<{ category?: ICategory; hasError?: boolean; message?: string }>;

  getCategory: (
    id: string
  ) => Promise<{ category?: ICategory; hasError?: boolean; message?: string }>;

  deleteCategory: (id: string) => void;
}

export const CategoryContext = createContext({} as ContextProps);
