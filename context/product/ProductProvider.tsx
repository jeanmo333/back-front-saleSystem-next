import { FC, useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";

import { IProduct } from "../../interfaces";
import { ProductContext } from "./ProductContext";

export const ProductProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const token = Cookies.get("token");

    if (!token) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await amatecApi.get("/products", config);
      const { products } = data;
      setProducts(products);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        // Methods

        getProducts,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
