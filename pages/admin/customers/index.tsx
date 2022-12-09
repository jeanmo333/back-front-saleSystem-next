import NextLink from "next/link";
import { AddOutlined, Delete, Edit, FamilyRestroom } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { useCustomers } from "../../../hooks";
import { FullScreenLoading } from "../../../components/ui";

const CustomerPage = () => {
  const { customers, deleteCustomer, loading } = useCustomers();

  const rows = customers!.map((customer) => ({
    id: customer._id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    rut: customer.rut,
    web: customer.web,
    address2: customer.address2,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "email", headerName: "Correo", width: 200 },
    { field: "phone", headerName: "Telefono", width: 150 },
    { field: "rut", headerName: "Rut", width: 150 },
    { field: "web", headerName: "Web", width: 150 },
    { field: "address2", headerName: "Direccion", width: 200 },

    {
      field: "check",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <>
            <>
              <NextLink href={`/admin/customers/${row.id}`} passHref>
                <IconButton sx={{ marginRight: 2, color: "white" }}>
                  <Edit sx={{ color: "#FF5733", fontSize: 30 }} />
                </IconButton>
              </NextLink>

              <IconButton
                sx={{ marginRight: 2 }}
                onClick={() => deleteCustomer(row.id)}>
                <Delete sx={{ fontSize: 30, color: "#C70039" }} />
              </IconButton>
            </>
          </>
        );
      },
    },
  ];

  if (loading)
    return (
      <>
        <FullScreenLoading />
      </>
    );

  return (
    <AdminLayout
      title="Clientes"
      subTitle="Gestionar Clientes"
      icon={<FamilyRestroom />}>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <NextLink href="/admin/customers/newCustomer" passHref>
          <Button startIcon={<AddOutlined />} color="secondary">
            Crear Cliente
          </Button>
        </NextLink>
      </Box>

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

export default CustomerPage;
