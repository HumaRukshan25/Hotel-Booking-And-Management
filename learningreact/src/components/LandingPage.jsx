// import React, { useState } from "react";
// import AdminLogin from "./Admin/AdminLogin";
// import UserLogin from "./Users/UserLogin";
// import { NavLink } from "react-router-dom";
// import Footer from "../components/Footer"; // Import Footer
// import "../assets/styles/landing.css";

// const LandingPage = () => {
//   const [isAdmin, setIsAdmin] = useState(true);

//   const handleBtnClick = () => {
//     setIsAdmin(!isAdmin);
//   };

//   return (
//     <div className="landing-page-wrapper">
//       <div className="landingpage">
//         <h1><b>Welcome To Hotel Booking And Management</b></h1>

//         <div className="login-container">
//           <div className="btn-container">
//             <button
//               onClick={handleBtnClick}
//               className={isAdmin ? "admin-btn" : "user-btn"}
//             >
//               {isAdmin ? "Admin Login" : "User Login"}
//             </button>
//           </div>
          

//           <div className="heading">{isAdmin ? "Admin Login page" : "User Login page"}</div>

//           {/* ✅ Sliding animation container */}
//           <div className="login-slider">
//             <div className={`form-wrapper ${isAdmin ? "slide-admin" : "slide-user"}`}>
//               {isAdmin ? <AdminLogin /> : <UserLogin />}
//             </div>
//           </div>

//           {!isAdmin && (
//             <div className="links-container">
//               <b>Don't have an account</b>
//               <NavLink to="/usersignup" className="signup-link">
//                 Signup / Register
//               </NavLink>
          
//               <NavLink to="/forgotpassword" className="forgot-link" style={{ marginLeft: "15px" }}>
//                 Forgot Password?
//               </NavLink>
//               <br />
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Footer placed outside the landingpage div */}
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage;


// import React, { useState } from "react";
// import AdminLogin from "./Admin/AdminLogin";
// import UserLogin from "./Users/UserLogin";
// import { NavLink } from "react-router-dom";
// import Footer from "../components/Footer";
// import "../assets/styles/landing.css";

// const LandingPage = () => {
//   const [isAdmin, setIsAdmin] = useState(true);

//   return (
//     <div className="landing-page-wrapper">
//       <div className="landingpage">
//         <h1><b>Welcome To Hotel Booking And Management</b></h1>
// <div className="glass-container">
//         {/* === TWO SEPARATE BUTTONS === */}
//         <div className="btn-container-two">
//           <button
//             className={`switch-btn ${isAdmin ? "active-btn" : ""}`}
//             onClick={() => setIsAdmin(true)}
//           >
//             Admin Login
//           </button>

//           <button
//             className={`switch-btn ${!isAdmin ? "active-btn" : ""}`}
//             onClick={() => setIsAdmin(false)}
//           >
//             User Login
//           </button>
//         </div>

//         <div className="heading">
//           {isAdmin ? "Admin Login Page" : "User Login Page"}
//         </div>

//         {/* === FORM SLIDER === */}
//         <div className="login-slider">
//           <div className={`form-wrapper ${isAdmin ? "slide-admin" : "slide-user"}`}>
//             {isAdmin ? <AdminLogin /> : <UserLogin />}
//           </div>
//         </div>

//         {/* === USER ONLY LINKS === */}
//         {!isAdmin && (
//           <div className="links-container">
//             <b>Don't have an account?</b>

//             <NavLink to="/usersignup" className="signup-link">
//               Signup / Register
//             </NavLink>

//             <NavLink
//               to="/forgotpassword"
//               className="forgot-link"
//               style={{ marginLeft: "1px" }}
//             >
//               Forgot Password?
//             </NavLink>
//           </div>
//         )}
//       </div>
//        </div>

//       {/* === FOOTER === */}
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState } from "react";
import AdminLogin from "./Admin/AdminLogin";
import UserLogin from "./Users/UserLogin";
import { NavLink } from "react-router-dom";
import Header from "../components/Header"; // import header
import Footer from "../components/Footer";
import "../assets/styles/landing.css";

const LandingPage = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="landing-page-wrapper">
      {/* === HEADER === */}
      <Header />

      <div className="landingpage">
        <h1><b>Welcome To Hotel Booking And Management</b></h1>

        <div className="glass-container">
          {/* === TWO SEPARATE BUTTONS === */}
          <div className="btn-container-two">
            <button
              className={`switch-btn ${isAdmin ? "active-btn" : ""}`}
              onClick={() => setIsAdmin(true)}
            >
              Admin Login
            </button>

            <button
              className={`switch-btn ${!isAdmin ? "active-btn" : ""}`}
              onClick={() => setIsAdmin(false)}
            >
              User Login
            </button>
          </div>

          <div className="heading">
            {isAdmin ? "Admin Login Page" : "User Login Page"}
          </div>

          {/* === FORM SLIDER === */}
          <div className="login-slider">
            <div className={`form-wrapper ${isAdmin ? "slide-admin" : "slide-user"}`}>
              {isAdmin ? <AdminLogin /> : <UserLogin />}
            </div>
          </div>

          {/* === USER ONLY LINKS === */}
          {!isAdmin && (
            <div className="links-container">
              <b>Don't have an account?</b>

              <NavLink to="/usersignup" className="signup-link">
                Signup / Register
              </NavLink>

              <NavLink
                to="/forgotpassword"
                className="forgot-link"
                style={{ marginLeft: "1px" }}
              >
                Forgot Password?
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* === FOOTER === */}
      <Footer />
    </div>
  );
};

export default LandingPage;
