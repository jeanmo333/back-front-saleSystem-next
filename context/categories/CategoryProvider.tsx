import { FC, useEffect, useState } from "react";
import axios from "axios";
import { amatecApi } from "../../api";

import { CategoryContext } from "./CategoryContext";
import { ICategory } from "../../interfaces";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks";

export const CategoryProvider: FC = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const { data } = await amatecApi.get(`/categories?user=${auth?._id}`);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
    }
  };

  const getCategory = async (
    _id: string
  ): Promise<{ category?: ICategory; hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.get(`/categories/${_id}`);
      const { category } = data;

      return {
        hasError: false,
        message: data.message,
        category,
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

  const registerCategory = async (
    category: ICategory
  ): Promise<{
    category?: ICategory;
    hasError?: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await amatecApi.post("/categories", {
        user: auth?._id,
        ...category,
      });
      const { categorySave } = data;

      setCategories([categorySave, ...categories]);
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

  const updateCategory = async (
    category: ICategory
  ): Promise<{ category?: ICategory; hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.put(
        `/categories/${category._id}`,
        category
      );

      const { categoryUpdate } = data;

      const categoriesEdit = categories.map((categoryState) =>
        categoryState._id === categoryUpdate._id
          ? categoryUpdate
          : categoryState
      );
      setCategories(categoriesEdit);

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

  const deleteCategory = async (_id: string) => {
    try {
      Swal.fire({
        title: "Estas Seguro?",
        text: "Esta accion no puede dehacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await amatecApi.delete(`/categories/${_id}`);
          const categoriesUpdate = categories.filter(
            (categoriesState) => categoriesState._id !== _id
          );
          setCategories(categoriesUpdate);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        setCategories,
        registerCategory,
        getCategory,
        updateCategory,
        deleteCategory,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};
