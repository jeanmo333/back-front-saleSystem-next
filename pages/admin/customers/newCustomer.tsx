import { useRouter } from "next/router";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../../../components/layouts/FormLayout";
import Swal from "sweetalert2";

import { useCustomers } from "../../../hooks/useCustomers";

type FormData = {
  name: string;
  email: string;
  phone: string;
  rut: string;
  web: string;
  address2: string;
};

const newCustomer = () => {
  const router = useRouter();
  const { registerCustomer } = useCustomers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      rut: "",
      web: "",
      address2: "",
    },
  });

  const onRegisterCustomer = async ({
    name,
    email,
    phone,
    rut,
    web,
    address2,
  }: FormData) => {
    const { hasError, message } = await registerCustomer({
      name,
      email,
      phone,
      rut,
      address2,
      web,
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
                Agregar Cliente
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre cliente"
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
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Telefono"
                variant="outlined"
                type="phone"
                fullWidth
                {...register("phone", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Rut"
                variant="outlined"
                fullWidth
                {...register("rut", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.rut}
                helperText={errors.rut?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Web"
                variant="outlined"
                fullWidth
                {...register("web", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.web}
                helperText={errors.web?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Direccion"
                variant="outlined"
                fullWidth
                {...register("address2", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.address2}
                helperText={errors.address2?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth>
                Crear Cliente
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormLayout>
  );
};

export default newCustomer;
