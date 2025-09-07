import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

// ✅ Lazy loaded pages
const LoginPage = lazy(() => import("../src/Login/login"));
const Admin = lazy(() => import("../src/ADM/admin"));
const User = lazy(() => import("../src/User/user"));

// ✅ Lazy loaded Admin sub-pages
const Add = lazy(() => import("../src/ADM/pages/Add/Add"));
const List = lazy(() => import("../src/ADM/pages/List/List"));
const Orders = lazy(() => import("../src/ADM/pages/Orders/Orders"));

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);

  // ✅ Check token validity on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setTokenValid(true);
    } else {
      setCurrentUser(null);
      setTokenValid(false);
    }
  }, []);

  // ✅ Protected route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!tokenValid || !currentUser) {
      return <Navigate to="/" replace />; // not logged in
    }
    if (!allowedRoles.includes(currentUser.userType)) {
      return <Navigate to="/" replace />; // wrong role
    }
    return children;
  };

  const url = "http://localhost:4000";

  return (
    <BrowserRouter>
      {/* Suspense wrapper for all lazy components */}
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <Routes>
          {/* Public route */}
          <Route
            path="/"
            element={<LoginPage setCurrentUser={setCurrentUser} />}
          />

          {/* Admin protected routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin currentUser={currentUser} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="add" replace />} />
            <Route path="add" element={<Add url={url} />} />
            <Route path="item" element={<List url={url} />} />
            <Route path="orders" element={<Orders url={url} />} />
          </Route>

          {/* User protected route */}
          <Route
            path="/user/*"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <User currentUser={currentUser} />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
