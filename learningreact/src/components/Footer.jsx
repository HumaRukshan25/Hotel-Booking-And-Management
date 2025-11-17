// Footer.jsx
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import '../assets/styles/footer.css';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Check if we're in admin portal or user portal
  const isAdminPortal = location.pathname.startsWith('/adminportal');
  const isUserPortal = location.pathname.startsWith('/usersportal');
  const isAuthPage = ['/forgotpassword', '/reset-password', '/login', '/signup'].some(path =>
    location.pathname.includes(path)
  );

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section - Shows for all pages */}
        <div className="footer-section">
          <h3>Hotel Booking</h3>
          <p>Your trusted partner for comfortable and affordable hotel bookings worldwide.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        {/* Dynamic Links based on current portal */}
        {isAdminPortal ? (
          <div className="footer-section">
            <h4>Admin Links</h4>
            <ul>
              <li><NavLink to="/adminportal">Dashboard</NavLink></li>
              <li><NavLink to="/adminportal/hotels">Manage Hotels</NavLink></li>
              <li><NavLink to="/adminportal/users">Manage Users</NavLink></li>
              <li><NavLink to="/adminportal/addusers">Add Users</NavLink></li>
            </ul>
          </div>
        ) : (
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><NavLink to={isUserPortal ? "/usersportal" : "/"}>Home</NavLink></li>
              <li><NavLink to={isUserPortal ? "/usersportal/hotels" : "/hotels"}>Hotels</NavLink></li>
              {isUserPortal && <li><NavLink to="/usersportal/booked-hotels">My Bookings</NavLink></li>}
              <li><NavLink to={isUserPortal ? "/usersportal/contacts" : "/contacts"}>Contact Us</NavLink></li>
            </ul>
          </div>
        )}

        {/* Support Section - Shows for all pages */}
        <div className="footer-section">
          <h4>Support</h4>
          {/* for SPA and no reload whole page use navlink */}
          <ul>
            <li><NavLink to="/help">Help Center</NavLink></li>
            <li><NavLink to="/faq">FAQ</NavLink></li>
            <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms">Terms of Service</NavLink></li>
          </ul>
        </div>

        {/* Contact Info - Shows for all pages */}
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p>📧 support@hotelbooking.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Hotel Street, City, Country</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Hotel Booking System. All rights reserved.</p>
        {isAdminPortal && <span className="admin-badge">Admin Portal</span>}
      </div>
    </footer>
  );
};

export default Footer;