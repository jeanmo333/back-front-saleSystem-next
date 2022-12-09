import { useRouter } from "next/router";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormLayout } from "../../../components/layouts/FormLayout";
import { useCategories } from "../../../hooks";
import Swal from "sweetalert2";
import { GetServerSideProps, NextPage } from "next";

type FormData = {
  name: string;
  description: string;
};

type Props = {
  _id: string;
};

const EditCategory: NextPage<Props> = ({ _id }) => {
  const router = useRouter();
  const { updateCategory, getCategory } = useCategories();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    (async () => {
      const { category } = await getCategory(_id);
      if (category?.name) {
        if (category?.name === undefined) return;
        setValue("name", category!.name);
        setValue("description", category!.description);
      }
    })();
  }, []);

  const onUpdadeCategory = async ({ name, description }: FormData) => {
    const { hasError, message } = await updateCategory({
      _id,
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
      return;
    }
  };

  return (
    <FormLayout title="">
      <form onSubmit={handleSubmit(onUpdadeCategory)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2} className="fadeIn">
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign={"center"}>
                Editando categoria
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
                Editar Categoria
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

export default EditCategory;
