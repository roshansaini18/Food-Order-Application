import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { Spin } from "antd";

import Success from "./pages/Success";
import Failure from "./pages/Failure";

// Lazy loaded pages
const LoginPage = lazy(() => import("../src/Login/login"));
const Admin = lazy(() => import("../src/ADM/admin"));
const User = lazy(() => import("../src/User/user"));

// Lazy loaded Admin sub-pages
const Add = lazy(() => import("../src/ADM/pages/Add/Add"));
const List = lazy(() => import("../src/ADM/pages/List/List"));
const Orders = lazy(() => import("../src/ADM/pages/Orders/Orders"));

// Lazy loaded User sub-pages
const Home = lazy(() => import("../src/pages/Home/Home"));
const Cart = lazy(() => import("../src/pages/Cart/Cart"));
const Order = lazy(() => import("../src/pages/MyOrders/MyOrders"));
const PlaceOrder = lazy(() => import("../src/pages/PlaceOrder/PlaceOrder"));

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // NEW loading state

  // Check token validity on app load and set loading false after check
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
    setLoadingAuth(false);
  }, []);

  // Protected route component waits for auth check
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (loadingAuth) {
      // Optionally render null or a spinner while auth is checking
      return null;
    }
    if (!tokenValid || !currentUser) {
      return <Navigate to="/" replace />; // not logged in
    }
    if (!allowedRoles.includes(currentUser.userType)) {
      return <Navigate to="/" replace />; // wrong role
    }
    return children;
  };

  const url = "https://food-order-application-backend.onrender.com";

  if (loadingAuth) {
    // Full app loading spinner during auth validation
    return (
      <div className="p-10 text-center" style={{ minHeight: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" tip="Checking authentication..." />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-10 text-center"><Spin size="large" /></div>}>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />

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

          {/* User protected routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <User currentUser={currentUser} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
            <Route path="placeorder" element={<PlaceOrder />} />
            <Route path="order-success" element={<Success />} />
            <Route path="order-failure" element={<Failure />} />
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
