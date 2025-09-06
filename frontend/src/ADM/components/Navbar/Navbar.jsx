import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Logout
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="navbar-title">Admin Panel</div>

      {user && (
        <div className="navbar-right">
          <div className="profile-pic">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <span className="user-name">{user.name}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
