import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Add from './pages/Add/Add';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const url = "https://food-order-application-backend.onrender.com";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content" style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* Default redirect from /admin to /admin/add */}
            <Route path="/" element={<Navigate to="add" replace />} />
            <Route path="add" element={<Add url={url} />} />
            <Route path="list" element={<List url={url} />} />
            <Route path="orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
