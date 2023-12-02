import React from "react";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ProtectedRoute from "./hoc/ProtectedRoute";
import AuthRoute from "./hoc/AuthRoute";

const App = () => {
  const routes = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthRoute>
          <LoginPage />,
        </AuthRoute>
      ),
    },
    {
      path: "/create",
      element: (
        <ProtectedRoute>
          <CreatePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <ProtectedRoute>
          <EditPage />
        </ProtectedRoute>
      ),
    },
  ];

  const element = useRoutes(routes);

  return element;
};

export default App;
