import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import LoginPopup from "../Login/login";
import Footer from "../components/Footer/Footer";

const User = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Outlet/>
  );
};

export default User;
