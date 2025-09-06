import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ width: '200px', padding: '20px', background: '#f5f5f5' }}>
      <div className="sidebar-options" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <NavLink 
          to="add" 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.add_icon} alt='add_icon' />
          <p>Add Items</p>
        </NavLink>
        <NavLink 
          to="list" 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.order_icon} alt='list_icon' />
          <p>List Items</p>
        </NavLink>
        <NavLink 
          to="orders" 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.order_icon} alt='orders_icon' />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
