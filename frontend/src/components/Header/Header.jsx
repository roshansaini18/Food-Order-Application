import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Fresh Meals, Made with ❤️</h2>
        <p>
          From comfort food to gourmet delights, explore a menu crafted with care 
          and delivered straight to your door. Fast, fresh, and unforgettable.
        </p>
        <button><a href="#explore-menu">Order Now</a></button>
      </div>
    </div>
  );
};

export default Header;
