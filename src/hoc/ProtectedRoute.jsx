import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <div>{children || <Outlet />}</div>;
};

export default ProtectedRoute;
