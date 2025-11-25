import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import '../assets/styles/header.css';

const Header = () => {
  const location = useLocation();

  const isAdminPortal = location.pathname.startsWith('/adminportal');
  const isUserPortal = location.pathname.startsWith('/usersportal');
  const isAuthPage = ['/forgotpassword', '/reset-password', '/login', '/signup'].some(path =>
    location.pathname.includes(path)
  );

  // Don't show header on auth pages
  if (isAuthPage) return null;

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <NavLink to={isUserPortal ? "/usersportal" : "/"}>Hotel Booking</NavLink>
        </div>

        <nav className="nav-links">
          {isAdminPortal ? (
            <>
              <NavLink to="/adminportal" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              <NavLink to="/adminportal/hotels" className={({ isActive }) => isActive ? 'active' : ''}>Manage Hotels</NavLink>
              <NavLink to="/adminportal/users" className={({ isActive }) => isActive ? 'active' : ''}>Manage Users</NavLink>
            </>
          ) : isUserPortal ? (
            <>
              <NavLink to="/usersportal" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
              <NavLink to="/usersportal/hotels" className={({ isActive }) => isActive ? 'active' : ''}>Hotels</NavLink>
              <NavLink to="/usersportal/contacts" className={({ isActive }) => isActive ? 'active' : ''}>Contact Us</NavLink>
            </>
          ) : (
            <>
              {/* Not logged in */}
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
              <NavLink to="/hotels" className={({ isActive }) => isActive ? 'active' : ''}>Hotels</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
