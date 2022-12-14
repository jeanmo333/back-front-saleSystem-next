import NextLink from "next/link";
import { AddOutlined, ShoppingCart } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { useProducts } from "../../../hooks";

const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 150 },
  { field: "description", headerName: "Descripcion", width: 200 },
  { field: "purchase_price", headerName: "Precio Compra", width: 150 },
  { field: "sale_price", headerName: "Precio Venta", width: 150 },
  { field: "stock", headerName: "Stock", width: 150 },
];

const ProductPage = () => {
  const { products } = useProducts();

  console.log(products);

  const rows = products!.map((product) => ({
    id: product._id,
    name: product.name,
    description: product.description,
    purchase_price: product.purchase_price,
    sale_price: product.sale_price,
    stock: product.inStock,
  }));

  return (
    <AdminLayout
      title="Productos"
      subTitle="Gestionar Productos"
      icon={<ShoppingCart />}>

      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <NextLink href="/admin/products/NewProduct" passHref>
          <Button startIcon={<AddOutlined />} color="secondary">
            Crear Producto
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

export default ProductPage;
