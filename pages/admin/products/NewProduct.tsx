import { useRouter } from "next/router";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../../../components/layouts/FormLayout";
import Swal from "sweetalert2";

import { useAuth, useProducts, useSuppliers } from "../../../hooks";

type FormData = {
  name: string;
  description?: string;
  purchase_price: number;
  sale_price: number;
  inStock: number;
  category: string;
  supplier: string;
  user: string;
};

const NewProduct = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const { suppliers } = useSuppliers();
  const { registerProduct } = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      purchase_price: 0,
      sale_price: 0,
      inStock: 0,
      category: "",
      supplier: "",
      user: auth?.name,
    },
  });

  const onRegisterCustomer = async ({
    name,
    description,
    purchase_price,
    sale_price,
    inStock,
    category,
    supplier,
  }: FormData) => {
    const { hasError, message } = await registerProduct({
      name,
      description,
      purchase_price,
      sale_price,
      inStock,
      category,
      supplier,
    });
    if (!hasError) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.replace("/admin/customers");
      return;
    }

    if (hasError) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
  };

  return (
    <FormLayout title="">
      <form onSubmit={handleSubmit(onRegisterCustomer)} noValidate>
        <Box
          sx={{
            width: { xs: 350, sm: 600 },
            padding: "10px 20px",
            marginTop: { xs: 35, sm: 20 },
          }}>
          <Grid container spacing={2} className="fadeIn">
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign={"center"}>
                Agregar Producto
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre producto"
                variant="outlined"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Descripcion"
                variant="outlined"
                type="text"
                fullWidth
                {...register("description", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio Compra"
                variant="outlined"
                type="phone"
                fullWidth
                {...register("purchase_price", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.purchase_price}
                helperText={errors.purchase_price?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio Venta"
                variant="outlined"
                fullWidth
                {...register("sale_price", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.sale_price}
                helperText={errors.sale_price?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock"
                variant="outlined"
                fullWidth
                {...register("inStock", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.inStock}
                helperText={errors.inStock?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Buscar Categoria"
                variant="outlined"
                fullWidth
                {...register("category", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Buscar proveedor"
                variant="outlined"
                fullWidth
                {...register("supplier", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.supplier}
                helperText={errors.supplier?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Usuario"
                variant="outlined"
                fullWidth
                {...register("user", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.user}
                helperText={errors.user?.message}
              />
            </Grid>

            {/**
                 <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={suppliers!}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Movie" />
                 
                )}
              />
            </Grid>
               */}

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth>
                Crear Producto
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormLayout>
  );
};

export default NewProduct;
