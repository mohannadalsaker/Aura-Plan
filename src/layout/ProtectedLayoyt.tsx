import { getLsValue } from "@/shared/utils";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayoyt = () => {
  const token = getLsValue("token");
  return token ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedLayoyt;
