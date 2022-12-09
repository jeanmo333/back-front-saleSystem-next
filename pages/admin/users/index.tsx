
import { PeopleOutline } from "@mui/icons-material";

import { DataGrid, GridColDef} from "@mui/x-data-grid";
import { Grid } from "@mui/material";

import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { useAuth } from "../../../hooks";

const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "email", headerName: "Correo", width: 200 },
  { field: "roles", headerName: "Roles", width: 200 },
];



const UsersPage = () => {
  const { users } = useAuth();


  const rows = users!.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  }));



  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
