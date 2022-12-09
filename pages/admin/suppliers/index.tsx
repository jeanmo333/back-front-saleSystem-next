import NextLink from "next/link";
import {AddOutlined, Delete, Edit, PeopleAlt } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { FullScreenLoading } from "../../../components/ui";
import { useSuppliers } from "../../../hooks";



const SupplierPage = () => {
  const { suppliers, loading, deleteSupplier } = useSuppliers();

  const rows = suppliers!.map((supplier) => ({
    id: supplier._id,
    name: supplier.name,
    email: supplier.email,
    phone: supplier.phone,
    rut: supplier.rut,
    web: supplier.web,
  }));



  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "email", headerName: "Correo", width: 200 },
    { field: "phone", headerName: "Telefono", width: 200 },
    { field: "rut", headerName: "Rut", width: 200 },
    { field: "web", headerName: "Web", width: 200 },


    {
      field: "check",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <>
            <>
              <NextLink href={`/admin/suppliers/${row.id}`} passHref>
                <IconButton sx={{ marginRight: 2, color: "white" }}>
                  <Edit sx={{ color: "#FF5733", fontSize: 30 }} />
                </IconButton>
              </NextLink>

              <IconButton
                sx={{ marginRight: 2 }}
                onClick={() => deleteSupplier(row.id)}>
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
      title="Proveedores"
      subTitle="Gestionar Proveedores"
      icon={< PeopleAlt />}>
      
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <NextLink href="/admin/suppliers/newSupplier" passHref>
          <Button startIcon={<AddOutlined />} color="secondary">
            Crear proveedor
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

export default SupplierPage;
