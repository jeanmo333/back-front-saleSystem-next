import { createContext } from "react";
import { ISupplier } from "../../interfaces";

interface ContextProps {
  suppliers?: ISupplier[];
  loading: boolean;

  getSupplier: (_id: string) => Promise<{
    supplier?: ISupplier;
    hasError: boolean;
    message?: string;
}>


registerSupplier: (supplier: ISupplier) => Promise<{
  supplier?: ISupplier | undefined;
  hasError?: boolean | undefined;
  message?: string | undefined;
}>


updateSupplier: (supplier: ISupplier) => Promise<{
  supplier?: ISupplier | undefined;
  hasError: boolean;
  message?: string | undefined;
}>

deleteSupplier: (_id: string) => Promise<void>

}

export const SuplierContext = createContext({} as ContextProps);
