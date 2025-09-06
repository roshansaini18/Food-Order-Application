import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "../src/Login/login";
import Admin from "../src/ADM/admin";
import User from "../src/User/user";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <HashRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />

        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<Admin currentUser={currentUser} />} />

        {/* User Dashboard */}
        <Route path="/user/*" element={<User />} />

        {/* 👇 Catch all: redirect anything unknown to base URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
