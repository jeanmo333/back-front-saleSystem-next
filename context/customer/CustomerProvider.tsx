import { FC, useEffect, useState } from "react";
import axios from "axios";
import { amatecApi } from "../../api";

import { ICustomer } from "../../interfaces";
import { CustomerContext } from "./CostomerContext";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks";

export const CustomerProvider: FC = ({ children }) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await amatecApi.get("/customers");
      setCustomers(data);
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

  const getCustomer = async (
    _id: string
  ): Promise<{ customer?: ICustomer; hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.get(`/customers/${_id}`);
      const { customer } = data;

      return {
        hasError: false,
        message: data.message,
        customer,
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

  const registerCustomer = async (
    customer: ICustomer
  ): Promise<{
    customer?: ICustomer;
    hasError?: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await amatecApi.post("/customers", {
        user: auth?._id,
        ...customer,
      });
      const { customerSave } = data;
      setCustomers([customerSave, ...customers]);
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

  const updateCustomer = async (
    customer: ICustomer
  ): Promise<{ customer?: ICustomer; hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.put(
        `/customers/${customer._id}`,
        customer
      );

      const { customerUpdate } = data;

      const customersEdit = customers.map((customerState) =>
        customerState._id === customerUpdate._id
          ? customerUpdate
          : customerState
      );
      setCustomers(customersEdit);

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

  const deleteCustomer = async (_id: string) => {
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
          await amatecApi.delete(`/customers/${_id}`);
          const customersUpdate = customers.filter(
            (customerState) => customerState._id !== _id
          );
          setCustomers(customersUpdate);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        loading,
        getCustomer,
        registerCustomer,
        updateCustomer,
        deleteCustomer,
        setCustomers,
      }}>
      {children}
    </CustomerContext.Provider>
  );
};
