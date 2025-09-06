import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setToken("");
    setUser(null);
    navigate("/"); // redirect to home page
  };

  const handleSignIn = () => {
    navigate("/"); // redirect to login page
  };

  return (
    <div className="navbar">
      {/* App Name */}
      <div className="navbar-title">Snackify</div>

      {/* Navbar Menu */}
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <Link
            to="myorders"
            onClick={() => setMenu("Orders")}
            className={menu === "Orders" ? "active" : ""}
          >
            Orders
          </Link>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setMenu("About-us")}
            className={menu === "About-us" ? "active" : ""}
          >
            About
          </a>
        </li>
      </ul>

      {/* Right Side */}
      <div className="navbar-right">
        <Link to="cart" className="cart-link">
          Cart {getTotalCartAmount() > 0 && <span className="dot"></span>}
        </Link>

        {!token ? (
          <button onClick={handleSignIn} className="signin-btn">
            Sign In
          </button>
        ) : (
          <>
            <div className="navbar-profile">
              <div className="profile-pic">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <ul className="navbar-profile-dropdown">
                <li className="profile-info">
                  <p>
                    <strong>{user?.name}</strong>
                  </p>
                  <p className="email">{user?.email}</p>
                </li>
              </ul>
            </div>
            <button onClick={logout} className="logout-btn-navbar">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
