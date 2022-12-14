import NextLink from "next/link";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { validations } from "../../utils";
import { AuthContext } from "../../context/auth";
import { ErrorOutline } from "@mui/icons-material";
import { useAuth } from "../../hooks";

type FormData = {
  email: string;
};

const FogetPasswordPage = () => {
  const { loading, forgetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const onForgetForm = async ({ email }: FormData) => {
    const { hasError, message } = await forgetPassword(email);

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
    <AuthLayout title={"Olvidar password"}>
      <form onSubmit={handleSubmit(onForgetForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                component="h1"
                textAlign="center"
                marginBottom={2}>
                Recupera Tu Acceso
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
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth>
                Enviar Instrucciones
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between">
              <NextLink href="/" passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>

              <NextLink href="/auth/register" passHref>
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default FogetPasswordPage;
