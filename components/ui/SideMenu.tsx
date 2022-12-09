import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AdminPanelSettings,
  Home,
  Category,
  FamilyRestroom,
  ShoppingCart,
  PointOfSale,
  PeopleAlt,
  ExitToApp,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAuth, useUi } from "../../hooks";

export const SideMenu = () => {
  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useUi();
  const { auth, logout } = useAuth();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="left"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}>
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <>
            <ListItem button onClick={() => navigateTo("/admin")}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>

            <ListItem button onClick={() => navigateTo("/admin/categories")}>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary={"Categorias"} />
            </ListItem>
          </>

          <ListItem button onClick={() => navigateTo("/admin/customers")}>
            <ListItemIcon>
              <FamilyRestroom />
            </ListItemIcon>
            <ListItemText primary={"Clientes"} />
          </ListItem>

          <ListItem button onClick={() => navigateTo("/admin/products")}>
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary={"Productos"} />
          </ListItem>

          <ListItem button onClick={() => navigateTo("/admin/sales")}>
            <ListItemIcon>
              <PointOfSale />
            </ListItemIcon>
            <ListItemText primary={"Ventas"} />
          </ListItem>

          <ListItem button onClick={() => navigateTo("/admin/suppliers")}>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary={"Proveedores"} />
          </ListItem>

          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>

          {/* Admin */}
          {auth?.role.includes("admin") && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem button onClick={() => navigateTo("/admin/users")}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
