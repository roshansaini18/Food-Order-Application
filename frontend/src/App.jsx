import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "../src/Login/login";
import Admin from "../src/ADM/admin";
import User from "../src/User/user";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />

        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<Admin currentUser={currentUser} />} />

        {/* User Dashboard */}
        <Route path="/user/*" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
