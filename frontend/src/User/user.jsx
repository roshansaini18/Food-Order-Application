import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import Verify from "../pages/Verify/Verify";
import MyOrders from "../pages/MyOrders/MyOrders";
import LoginPopup from "../Login/login";
import Footer from "../components/Footer/Footer";

const User = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<PlaceOrder />} />
        <Route path="verify" element={<Verify />} />
        <Route path="myorders" element={<MyOrders />} />
        
        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default User;
