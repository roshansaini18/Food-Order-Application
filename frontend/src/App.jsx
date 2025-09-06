import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "../src/Login/login";
import Admin from "../src/ADM/admin";
import User from "../src/User/user";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />

      {/* Admin Dashboard (no protection) */}
      <Route path="/admin/*" element={<Admin currentUser={currentUser} />} />

      {/* User Dashboard (no protection) */}
      <Route path="/user/*" element={<User />} />
    </Routes>
  );
}

export default App;
