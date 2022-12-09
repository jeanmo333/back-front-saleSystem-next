import { useRouter } from "next/router";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../../../components/layouts/FormLayout";
import Swal from "sweetalert2";
import { GetServerSideProps, NextPage } from "next";
import { useSuppliers } from "../../../hooks";

type FormData = {
  name: string;
  email: string;
  phone: string;
  rut: string;
  web: string;
  address2: string;
};

type Props = {
  _id: string;
};

const EditSupplier: NextPage<Props> = ({ _id }) => {
  const router = useRouter();
  const { getSupplier, updateSupplier } = useSuppliers();

  const {
    register,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    (async () => {
      if (_id) {
        const { supplier } = await getSupplier(_id);
        if (supplier?.name === undefined) return;
        setValue("name", supplier!.name);
        setValue("email", supplier!.email);
        setValue("phone", supplier!.phone);
        setValue("rut", supplier!.rut);
        setValue("web", supplier!.web);
        setValue("address2", supplier!.address2);
      }
    })();
  }, [router]);

  const onUpdateSupplier = async ({
    name,
    email,
    phone,
    rut,
    web,
    address2,
  }: FormData) => {
    const { hasError, message } = await updateSupplier({
      _id,
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
      router.replace("/admin/suppliers");
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
      <form onSubmit={handleSubmit(onUpdateSupplier)} noValidate>
        <Box
          sx={{
            width: { xs: 350, sm: 600 },
            padding: "10px 20px",
            marginTop: { xs: 35, sm: 20 },
          }}>
          <Grid container spacing={2} className="fadeIn">
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign={"center"}>
                Editando proveedor
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
                Editar proveedor
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { _id = "" } = query;
  return {
    props: {
      _id,
    },
  };
};

export default EditSupplier;
