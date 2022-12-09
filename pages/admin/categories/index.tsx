import NextLink from "next/link";
import { AddOutlined, Category, Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { Box, Button, Grid, IconButton } from "@mui/material";

import { useCategories } from "../../../hooks";
import { FullScreenLoading } from "../../../components/ui";

const CategoryPage = () => {
  const { categories, deleteCategory, loading } = useCategories();

  const rows = categories!.map((category) => ({
    id: category._id,
    name: category.name,
    description: category.description,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "description", headerName: "Descripcion", width: 350 },

    {
      field: "check",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <>
            <>
              <NextLink href={`/admin/categories/${row.id}`} passHref>
                <IconButton sx={{ marginRight: 2, color: "white" }}>
                  <Edit sx={{ color: "#FF5733", fontSize: 30 }} />
                </IconButton>
              </NextLink>

              <IconButton
                sx={{ marginRight: 2 }}
                onClick={() => deleteCategory(row.id)}>
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
      title="Categorias"
      subTitle="Gestionar Categorias"
      icon={<Category />}>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <NextLink href="/admin/categories/newCategory" passHref>
          <Button startIcon={<AddOutlined />} color="secondary">
            Crear categoria
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

export default CategoryPage;
