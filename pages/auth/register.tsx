import { useState, useContext } from "react";

import NextLink from "next/link";

import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import { AuthContext } from "../../context/auth";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useAuth } from "../../hooks";


type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { loading, registerUser } = useAuth();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();



  const onRegisterForm = async ({ name, email, password }: FormData) => {
    const { hasError, message } = await registerUser(name, email, password);

    if (!hasError) {
      setShowSuccess(true);
      setMessageSuccess(message!);
      setTimeout(() => setShowSuccess(false), 10000);
      reset();
      return;
    }

    if (hasError) {
      setShowError(true);
      setMessageError(message!);
      setTimeout(() => setShowError(false), 10000);
      reset();
      return;
    }


  };

 

  return (
    <AuthLayout title={"Registrar"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                component="h1"
                textAlign={"center"}
                marginY={2}>
                Crear cuenta
              </Typography>
              <Chip
                label={messageError}
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />


              <Chip
                label={messageSuccess}
                color="success"
                className="fadeIn"
                sx={{ display: showSuccess ? "flex" : "none" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre"
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
                type="email"
                label="Correo"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth>
                Registrar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between">
              
              <NextLink href="/" passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>

              
            <NextLink href="/auth/forgetPassword" passHref>
              <Link underline="always">olvide mi password</Link>
            </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
