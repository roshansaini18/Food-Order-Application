import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import "./login.css";

const LoginPage = ({ setCurrentUser }) => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const endpoint =
      currentState === "Login" ? "/api/user/login" : "/api/user/register";
    const newUrl = url + endpoint;

    try {
      const payload = { ...data };
      if (currentState === "Sign Up") {
        payload.userType = "user"; // new accounts default to "user"
      }

      const response = await axios.post(newUrl, payload);

      if (response.data.success) {
        const token = response.data.token;
        const userType =
          currentState === "Sign Up" ? "user" : response.data.userType;

        // ✅ Store token & user info
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userType", userType);
        const userData = {
          name: response.data.name || data.name,
          email: response.data.email || data.email,
          userType,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        // ✅ Update App state
        setCurrentUser(userData);

        // ✅ Navigate based on role
        if (userType === "admin") navigate("/admin");
        else navigate("/user");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login/Register error:", error);
      alert("Something went wrong!");
    }
  };

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    if (token && userType) {
      setToken(token);
      if (userType === "admin") navigate("/admin");
      else navigate("/user");
    }
  }, [navigate, setToken]);

  return (
    <div className="login-page">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-welcome">
          <h1>Welcome to Snackify!</h1>
          <p>Order your favorite snacks and enjoy fast delivery.</p>
        </div>

        <h2>{currentState}</h2>
        <div className="login-inputs">
          {currentState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {currentState === "Login" ? (
          <p className="switch-text">
            Don't have an account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
