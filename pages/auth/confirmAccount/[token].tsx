import NextLink from "next/link";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { AuthLayout } from "../../../components/layouts";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import amatecApi from "../../../api/amatecApi";
import axios from "axios";
import { ErrorOutline } from "@mui/icons-material";
import { FullScreenLoading } from "../../../components/ui/FullScreenLoading";
import { useRouter } from "next/router";

interface Props {
  token: string;
}

const ConfirmAcountPage: NextPage<Props> = ({ token }) => {
  const [accountConfirm, setAccountConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [showError, setShowError] = useState(false);
  const [messageError, setMessageError] = useState("");


  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/auth/confirmAccount/${token}`;
        const { data } = await amatecApi(url);
        setAccountConfirm(true);
        setShowSuccess(true);
        setMessageSuccess(data.message);
      } catch (error) {
        setShowError(true);
        if (axios.isAxiosError(error)) {
          setMessageError(error.response?.data.message);
        }
      }

      setLoading(false);
    };
    confirmAccount();
  }, []);

  if (loading)
    return (
      <>
        <FullScreenLoading />
      </>
    );

  return (
    <AuthLayout title={"Confirmar cuenta"}>
      <Box sx={{ width: 400, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {accountConfirm && (
              <Typography
                variant="h1"
                component="h1"
                textAlign="center"
                marginBottom={3}>
                Confirmando Tu Cuenta
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

          {accountConfirm && (
            <Grid item xs={12}>
              <NextLink href="/" passHref>
                <Button
                  color="secondary"
                  className="circular-btn"
                  size="large"
                  fullWidth>
                  Iniciar Sesión
                </Button>
              </NextLink>
            </Grid>
          )}
        </Grid>
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

export default ConfirmAcountPage;
