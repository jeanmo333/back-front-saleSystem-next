import NextLink from "next/link";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../../../components/layouts/AuthLayout";
import { useEffect, useState } from "react";
import amatecApi from "../../../api/amatecApi";
import { GetServerSideProps, NextPage } from "next";
import { ErrorOutline } from "@mui/icons-material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FullScreenLoading } from "../../../components/ui/FullScreenLoading";

interface Props {
  token: string;
}

type FormData = {
  password: string;
};

const NewPasswordPage: NextPage<Props> = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [showError, setShowError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [passwordModify, setPasswordModify] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await amatecApi(`/auth/confirmToken/${token}`);
        setTokenValid(true);
      } catch (error) {
        setShowError(true);
        if (axios.isAxiosError(error)) {
          setMessageError(error.response?.data.message);
        }
      }
      setLoading(false);
    };
    comprobarToken();
  }, []);

  const onNewPassword = async ({ password }: FormData) => {
    try {
      const url = `/auth/newPassword/${token}`;
      const { data } = await amatecApi.post(url, { password });
      setMessageSuccess(data.message);
      setTokenValid(true);
      setShowSuccess(true);
      setPasswordModify(true);
      reset();
    } catch (error) {
      setShowError(true);
      if (axios.isAxiosError(error)) {
        setMessageError(error.response?.data.message);
      }
      reset();
    }
  };


  
  if (loading)
    return (
      <>
        <FullScreenLoading />
      </>
    );

  return (
    <AuthLayout title={"Nuevo password"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <form onSubmit={handleSubmit(onNewPassword)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {tokenValid && (
                <Typography
                  variant="h1"
                  component="h1"
                  textAlign="center"
                  marginBottom={3}>
                  Recupera Tu Acceso
                </Typography>
              )}

              <Chip
                label={messageError}
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none", marginBottom: 2 }}
              />

              <Chip
                label={messageSuccess}
                color="success"
                className="fadeIn"
                sx={{ display: showSuccess ? "flex" : "none" }}
              />
            </Grid>
            {tokenValid && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label=" Coloca tu nuevo password"
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
                    Guardar
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </form>

        {passwordModify && (
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            marginTop={4}>
            <NextLink href="/" passHref>
              <Link underline="always">Iniciar Sesión</Link>
            </NextLink>
          </Grid>
        )}
      </Box>
    </AuthLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { token = "" } = query;

  return {
    props: {
      token,
    },
  };
};

export default NewPasswordPage;
