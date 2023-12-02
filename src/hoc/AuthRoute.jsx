import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }

  return <div>{children || <Outlet />}</div>;
};

export default AuthRoute;
