// // Footer.jsx
// import React from 'react';
// import { useLocation, NavLink } from 'react-router-dom';
// import '../assets/styles/footer.css';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// const Footer = () => {
//   const location = useLocation();
//   const currentYear = new Date().getFullYear();

//   // Check if we're in admin portal or user portal
//   const isAdminPortal = location.pathname.startsWith('/adminportal');
//   const isUserPortal = location.pathname.startsWith('/usersportal');
//   const isAuthPage = ['/forgotpassword', '/reset-password', '/login', '/signup'].some(path =>
//     location.pathname.includes(path)
//   );

//   return (
//     <footer className="footer">
//       <div className="footer-content">
//         {/* Brand Section - Shows for all pages */}
//         <div className="footer-section">
//           <h3>Hotel Booking</h3>
//           <p>Your trusted partner for comfortable and affordable hotel bookings worldwide.</p>


//           <div className="social-links">
//             <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook" rel="noopener noreferrer">
//               <FaFacebookF />
//             </a>

//             <a href="https://twitter.com/" target="_blank" aria-label="Twitter" rel="noopener noreferrer">
//               <FaTwitter />
//             </a>

//             <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
//               <FaInstagram />
//             </a>

//             <a href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
//               <FaLinkedinIn />
//             </a>
//           </div>
//         </div>

//         {/* Dynamic Links based on current portal */}
//         {isAdminPortal ? (
//           <div className="footer-section">
//             <h4>Admin Links</h4>
//             <ul>
//               <li><NavLink to="/adminportal">Dashboard</NavLink></li>
//               <li><NavLink to="/adminportal/hotels">Manage Hotels</NavLink></li>
//               <li><NavLink to="/adminportal/users">Manage Users</NavLink></li>
//               <li><NavLink to="/adminportal/addusers">Add Users</NavLink></li>
//             </ul>
//           </div>
//         ) : (
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <ul>
//               <li><NavLink to={isUserPortal ? "/usersportal" : "/"}>Home</NavLink></li>
//               <li><NavLink to={isUserPortal ? "/usersportal/hotels" : "/hotels"}>Hotels</NavLink></li>
//               {isUserPortal && <li><NavLink to="/usersportal/booked-hotels">My Bookings</NavLink></li>}
//               <li><NavLink to={isUserPortal ? "/usersportal/contacts" : "/contacts"}>Contact Us</NavLink></li>
//             </ul>
//           </div>
//         )}

//         {/* Support Section - Shows for all pages */}
//         <div className="footer-section">
//           <h4>Support</h4>
//           {/* for SPA and no reload whole page use navlink */}
//           <ul>
//             <li><NavLink to="/help">Help Center</NavLink></li>
//             <li><NavLink to="/faq">FAQ</NavLink></li>
//             <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
//             <li><NavLink to="/terms">Terms of Service</NavLink></li>
//           </ul>
//         </div>

//         {/* Contact Info - Shows for all pages */}
//         <div className="footer-section">
//           <h4>Contact Info</h4>
//           <div className="contact-info">
//             <p>
//               📧 <a href="mailto:support@hotelbooking.com">support@hotelbooking.com</a>
//             </p>

//             <p>
//               📞 <a href="tel:+15551234567">+1 (555) 123-4567</a>
//             </p>

//             <p>📍 123 Hotel Street, City, Country</p>
//           </div>

//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>&copy; {currentYear} Hotel Booking System. All rights reserved.</p>
//         {isAdminPortal && <span className="admin-badge">Admin Portal</span>}
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// import React from 'react';
// import { useLocation, NavLink } from 'react-router-dom';
// import '../assets/styles/footer.css';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// const Footer = () => {
//   const location = useLocation();
//   const currentYear = new Date().getFullYear();

//   const isAdminPortal = location.pathname.startsWith('/adminportal');

//   return (
//     <footer className="footer">
//       <div className="footer-content">

//         {/* Brand Section */}
//         <div className="footer-section">
//           <h3>Hotel Booking</h3>
//           <p>Your trusted partner for comfortable and affordable hotel bookings worldwide.</p>

//           <div className="social-links">
//             <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
//               <FaFacebookF />
//             </a>
//             <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
//               <FaTwitter />
//             </a>
//             <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
//               <FaInstagram />
//             </a>
//             <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
//               <FaLinkedinIn />
//             </a>
//           </div>
//         </div>

//         {/* Admin Links Only */}
//         {isAdminPortal && (
//           <div className="footer-section">
//             <h4>Admin Links</h4>
//             <ul>
//               <li><NavLink to="/adminportal">Dashboard</NavLink></li>
//               <li><NavLink to="/adminportal/hotels">Manage Hotels</NavLink></li>
//               <li><NavLink to="/adminportal/users">Manage Users</NavLink></li>
//               <li><NavLink to="/adminportal/addusers">Add Users</NavLink></li>
//             </ul>
//           </div>
//         )}

//         {/* Support Section */}
//         <div className="footer-section">
//           <h4>Support</h4>
//           <ul>
//             <li><NavLink to="/help">Help Center</NavLink></li>
//             <li><NavLink to="/faq">FAQ</NavLink></li>
//             <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
//             <li><NavLink to="/terms">Terms of Service</NavLink></li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div className="footer-section">
//           <h4>Contact Info</h4>
//           <div className="contact-info">
//           <p>
//   📧 <a 
//     href="https://mail.google.com/mail/?view=cm&fs=1&to=support@hotelbooking.com" 
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     support@hotelbooking.com
//   </a>
// </p>


//             <p>📞 <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
//             <p>
//               📍
//               <a
//                 href="https://www.google.com/maps/search/?api=1&query=123+Hotel+Street+City+Country"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 123 Hotel Street, City, Country
//               </a>
//             </p>
//           </div>
//         </div>

//       </div>

//       <div className="footer-bottom">
//         <p>© {currentYear} Hotel Booking System. All rights reserved.</p>
//         {isAdminPortal && <span className="admin-badge">Admin Portal</span>}
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import '../assets/styles/footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const isAdmin = location.pathname.startsWith('/adminportal');
  const isUser = location.pathname.startsWith('/usersportal');
  const isPublic = !isAdmin && !isUser;

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Brand Section */}
        <div className="footer-section">
          <h3>Hotel Booking</h3>
          <p>Your trusted partner for comfortable and affordable hotel bookings worldwide.</p>

          <div className="social-links">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Admin Links */}
        {isAdmin && (
          <div className="footer-section">
            <h4>Admin Links</h4>
            <ul>
              <li><NavLink to="/adminportal">Dashboard</NavLink></li>
              <li><NavLink to="/adminportal/hotels">Manage Hotels</NavLink></li>
              <li><NavLink to="/adminportal/users">Manage Users</NavLink></li>
              <li><NavLink to="/adminportal/addusers">Add Users</NavLink></li>
            </ul>
          </div>
        )}

        {/* Support Section (For Users + Public Only) */}
        {(isUser || isPublic) && (
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              {isUser ? (
                <>
                  <li><NavLink to="/usersportal/help">Help Center</NavLink></li>
                  <li><NavLink to="/usersportal/faq">FAQ</NavLink></li>
                  <li><NavLink to="/usersportal/privacy">Privacy Policy</NavLink></li>
                  <li><NavLink to="/usersportal/terms">Terms of Service</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/help">Help Center</NavLink></li>
                  <li><NavLink to="/faq">FAQ</NavLink></li>
                  <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
                  <li><NavLink to="/terms">Terms of Service</NavLink></li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Contact Info (Users + Public Only) */}
        {(isUser || isPublic) && (
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>
                📧 <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@hotelbooking.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  support@hotelbooking.com
                </a>
              </p>

              <p>📞 <a href="tel:+15551234567">+1 (555) 123-4567</a></p>

              <p>
                📍
                <a
                  href="https://www.google.com/maps/search/?api=1&query=123+Hotel+Street+City+Country"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  123 Hotel Street, City, Country
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Hotel Booking System. All rights reserved.</p>
        {isAdmin && <span className="admin-badge">Admin Portal</span>}
      </div>
    </footer>
  );
};

export default Footer;
