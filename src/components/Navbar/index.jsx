import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
      <Link to={"/create"}>Create</Link>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Navbar;
