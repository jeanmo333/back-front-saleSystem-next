import { useRouter } from "next/router";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../../../components/layouts/FormLayout";
import { useAuth, useCategories } from "../../../hooks";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { amatecApi } from "../../../api";

type FormData = {
  name: string;
  description: string;
};

const NewCategory = () => {
  const router = useRouter();
  const { registerCategory } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", description: "" },
  });

  const onRegisterCategory = async ({ name, description }: FormData) => {
    const { hasError, message } = await registerCategory({
      name,
      description,
    });
    if (!hasError) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.replace("/admin/categories");
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
      reset();
      return;
    }
  };

  return (
    <FormLayout title="">
      <form onSubmit={handleSubmit(onRegisterCategory)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2} className="fadeIn">
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign={"center"}>
                Agregar categoria
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre categoria"
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
            <Grid item xs={12}>
              <TextField
                label="Descripcion"
                variant="outlined"
                fullWidth
                {...register("description", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth>
                Crear Categoria
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormLayout>
  );
};

export default NewCategory;
