import { FC } from "react";
import { Box, Typography } from "@mui/material";

import Head from "next/head";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="og:title" content={title} />
      </Head>

      <SideMenu />

      <nav>
        <Navbar />
      </nav>

      <Box
        sx={{
          margin: "30px auto",
          marginTop: "80px",
          maxWidth: { xs: "100%", md: "80%" },
          padding: "0px 30px",
        }}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon} {title}
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>

        <Box className="fadeIn">{children}</Box>
      </Box>
    </>
  );
};
