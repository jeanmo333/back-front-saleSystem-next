import { DashboardOutlined, PointOfSale } from "@mui/icons-material";
import React from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

const SalesPage = () => {
  return (
    <AdminLayout
      title="Ventas"
      subTitle="Gestionar Ventas"
      icon={<PointOfSale />}>
      <div>SalesPage</div>
    </AdminLayout>
  );
};

export default SalesPage;
