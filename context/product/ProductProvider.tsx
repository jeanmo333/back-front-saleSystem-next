import { FC, useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";

import { IProduct } from "../../interfaces";
import { ProductContext } from "./ProductContext";
import { useAuth } from "../../hooks";

export const ProductProvider: FC = ({ children }) => {
  const { auth } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await amatecApi.get("/products");
      setProducts(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
    }
  };




  const registerProduct = async (
    product: IProduct
  ): Promise<{
    hasError?: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await amatecApi.post("/products", {
        user: auth?._id,
        ...product,
      });
      const { productSave } = data;
      setProducts([productSave, ...products]);
      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        // Methods
        registerProduct
      }}>
      {children}
    </ProductContext.Provider>
  );
};
