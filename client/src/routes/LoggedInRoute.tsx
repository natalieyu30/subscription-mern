import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context";

function LoggedInRoute() {
  const [state] = useContext(UserContext);

  if (state.loading) return <div>Loading...</div>;

  return state.data ? <Navigate to="/articles" /> : <Outlet />;
}

export default LoggedInRoute;
