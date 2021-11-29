import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context";

function ProtectedRoute() {
  const [state] = useContext(UserContext);

  if (state.loading) return <div>Loading...</div>;

  return state.data ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
