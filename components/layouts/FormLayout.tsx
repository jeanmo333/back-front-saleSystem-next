import { FC } from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  // children: React.ReactNode;
}

export const FormLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <SideMenu />

      <nav>
        <Navbar />
      </nav>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px">
          {children}
        </Box>
      </main>
    </>
  );
};
