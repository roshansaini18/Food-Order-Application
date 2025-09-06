import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "../src/Login/login";
import Admin from "../src/ADM/admin";
import User from "../src/User/user";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);

  // Check token validity on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setTokenValid(true);
    }
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!tokenValid || !currentUser || !allowedRoles.includes(currentUser.userType)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
      <Routes>
        <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin  currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/*"
          element={
              <User/>
          }
        />
      </Routes>
  );
}

export default App;
