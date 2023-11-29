import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
        <Route path="/edit/:id" element={<EditPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
