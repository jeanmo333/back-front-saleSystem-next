import { ICategory } from "./category";
import { ISupplier } from "./supplier";

export interface IProduct {
    id            : string;
    name          : string;
    description   : string;
    purchase_price: number;
    sale_price    : number;
    stock         :number;
    category      :ICategory;
    suplier       :ISupplier;
    createdAt?    : string;
    updatedAt?    : string;


  }
  