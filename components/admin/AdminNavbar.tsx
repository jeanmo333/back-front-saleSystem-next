import NextLink from "next/link";

import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";

export const AdminNavbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
              Shopi
            </Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: { xs: "block", sm: "block" } }}>
          <IconButton sx={{ marginRight: 2, color: "white" }}>
            <DehazeIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
