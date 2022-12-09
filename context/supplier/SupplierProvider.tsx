import { FC, useEffect, useState } from "react";
import axios from "axios";
import { amatecApi } from "../../api";

import { SuplierContext } from "./SupplierContext";
import { ISupplier } from "../../interfaces";
import { useAuth } from "../../hooks";
import Swal from "sweetalert2";

export const SupplierProvider: FC = ({ children }) => {
  const { auth } = useAuth();
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    setLoading(true)
    try {
      const { data } = await amatecApi.get("/suppliers");
      setSuppliers(data);
      setLoading(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
    }
  };



  const getSupplier = async (
    _id: string
  ): Promise<{ supplier?: ISupplier; hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.get(`/suppliers/${_id}`);
      const { supplier } = data;

      return {
        hasError: false,
        message: data.message,
        supplier,
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

  const registerSupplier = async (
    supplier: ISupplier
  ): Promise<{
    supplier?: ISupplier;
    hasError?: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await amatecApi.post("/suppliers", {
        user: auth?._id,
        ...supplier,
      });
      const { supplierSave } = data;
      setSuppliers([supplierSave, ...suppliers]);
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

  const updateSupplier = async (
    supplier: ISupplier
  ): Promise<{ supplier?: ISupplier; hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.put(
        `/suppliers/${supplier._id}`,
        supplier
      );

      const { supplierUpdate } = data;

      const supplierEdit = suppliers.map((supplierState) =>
      supplierState._id === supplierUpdate._id
          ? supplierUpdate
          : supplierState
      );
      setSuppliers(supplierEdit);

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

  const deleteSupplier = async (_id: string) => {
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
          await amatecApi.delete(`/suppliers/${_id}`);
          const suppiersUpdate = suppliers.filter(
            (supplierState) => supplierState._id !== _id
          );
          setSuppliers(suppiersUpdate);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <SuplierContext.Provider
      value={{
        suppliers,
        loading,
        getSupplier,
        registerSupplier,
        updateSupplier,
        deleteSupplier 
      }}>
      {children}
    </SuplierContext.Provider>
  );
};
