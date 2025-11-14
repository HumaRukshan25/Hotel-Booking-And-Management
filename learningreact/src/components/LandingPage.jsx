// import React, { useState } from "react";
// import AdminLogin from "./Admin/AdminLogin";
// import UserLogin from "./Users/UserLogin";
// import { NavLink } from "react-router-dom";
// import "../assets/styles/landing.css";

// const LandingPage = () => {
//   const [isAdmin, setIsAdmin] = useState(true);

//   const handleBtnClick = () => {
//     setIsAdmin(!isAdmin);
//   };

//   return (
//     <div className="landingpage">
//       <h1>Welcome To Hotel Booking And Management</h1>
//       <div className="login-container">
//         <div className="btn-container">
//           <button
//             onClick={handleBtnClick}
//             className={isAdmin ? "admin-btn" : "user-btn"}
//           >
//             {isAdmin ? "Admin Login" : "User Login"}
//           </button>
//         </div>
//         <div className="heading">
//           {isAdmin ? "Admin Login page" : "User Login page"}
//         </div>
//         <div className="form-container">
//           {isAdmin ? <AdminLogin /> : <UserLogin />}

//           {!isAdmin && (
//             <div className="links-container">
//               <NavLink to="/usersignup" className="signup-link">
//                 Signup / Register
//               </NavLink>
//               {/* <NavLink to="/forgotpassword" className="forgot-link">
//                 Forgot Password?
//               </NavLink> */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState } from "react";
import AdminLogin from "./Admin/AdminLogin";
import UserLogin from "./Users/UserLogin";
import { NavLink } from "react-router-dom";
import "../assets/styles/landing.css";

const LandingPage = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  const handleBtnClick = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="landingpage">
      <h1><b>Welcome To Hotel Booking And Management</b></h1>

      <div className="login-container">
        <div className="btn-container">
          <button
            onClick={handleBtnClick}
            className={isAdmin ? "admin-btn" : "user-btn"}
          >
            {isAdmin ? "Admin Login" : "User Login"}
          </button>
        </div>

        <div className="heading">{isAdmin ? "Admin Login page" : "User Login page"}</div>

        {/* ✅ Sliding animation container */}
        <div className="login-slider">
          <div className={`form-wrapper ${isAdmin ? "slide-admin" : "slide-user"}`}>
            {isAdmin ? <AdminLogin /> : <UserLogin />}
          </div>
        </div>

        {!isAdmin && (
          <div className="links-container">
            <NavLink to="/usersignup" className="signup-link">
              Signup / Register
            </NavLink>
            <br />
              <NavLink to="/forgotpassword" className="forgot-link" style={{ marginLeft: "15px" }}>
              Forgot Password?
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
