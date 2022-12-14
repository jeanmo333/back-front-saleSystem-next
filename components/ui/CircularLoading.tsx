import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export const CircularLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center">
      <CircularProgress thickness={2} size={25} color="inherit" />
    </Box>
  );
};
