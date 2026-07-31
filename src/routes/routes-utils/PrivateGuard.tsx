import { Navigate, Outlet } from "react-router-dom";
import { useNavigation } from "../../context/navigation";

export const PrivateGuard = () => {
  const { allowAccess } = useNavigation();

  return allowAccess ? <Outlet /> : <Navigate to="/search" replace />;
};
