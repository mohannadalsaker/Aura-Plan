import { DashboardLayout } from "@/shared/layout";
import { getLsValue } from "@/shared/utils";
import { Navigate, Outlet } from "react-router-dom";

function RootLayout() {
  const token = getLsValue("token");
  return token ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default RootLayout;
