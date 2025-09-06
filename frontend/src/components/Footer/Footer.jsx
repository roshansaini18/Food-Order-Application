import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <h1 className="footer-logo">Snackify</h1>
          <p>
            Hungry? We’ve got you covered!  
            From quick bites to full meals, Snackify delivers happiness right to your door.  
            Fast, fresh, and always tasty – because you deserve better cravings.  
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">F</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">X</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">in</a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>📞 +91 95717 81242</li>
            <li>📧 roshansainims957178@gmail.com</li>
            <li>📍 Rajasthan, India</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        © {new Date().getFullYear()} Snackify | Made with ❤️ by Roshan Saini
      </p>
    </div>
  );
};

export default Footer;
