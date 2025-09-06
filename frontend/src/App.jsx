import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "../src/Login/login";
import Admin from "../src/ADM/admin";
import User from "../src/User/user";

// 👇 Helper to handle refresh redirect
function RefreshHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      // If user refreshes → send them to base URL
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return null;
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      {/* 👇 mount refresh handler */}
      <RefreshHandler />

      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />

        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<Admin currentUser={currentUser} />} />

        {/* User Dashboard */}
        <Route path="/user/*" element={<User />} />

        {/* Catch all: redirect anything unknown to base URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
