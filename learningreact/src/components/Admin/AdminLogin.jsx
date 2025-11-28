// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminPortal from "./AdminPortal";

// const AdminLogin = () => {
//   let emailField = useRef();
//   let pswdField = useRef();
//   let navigate = useNavigate();
//   let adminLogin = (e) => {
//     e.preventDefault();
//     //todo : targeting to input field
//     let emailInput = emailField.current;
//     let pswdInput = pswdField.current;
//     //todo: storing credentials in object
//     let credentials = {
//       email: "admin@gmail.com",
//       password: "admin123",
//     };
//     //todo : collecting data by doing object destructuring
//     let { email, password } = credentials;

//     //todo : condition to visit admin portal
//     let err = `border:solid 1px red`;
//     if (emailInput.value === email && pswdInput.value === password) {
//       navigate("/adminportal");
//     } else {
//       emailInput.style.cssText = err;
//       pswdInput.style.cssText = err;
//     }
//   };
//   return (
//     <>
//       <div className="admin-form">
//         <form onSubmit={adminLogin}>
//           <input
//             type="email"
//             placeholder="enter admin email address"
//             ref={emailField}
//           />
//           <input type="password" placeholder="enter password" ref={pswdField} />
//           <button
//             type="submit"
//             style={{
//               width: "80%",
//               display: "block",
//               margin: "2vh auto",
//               padding: "12px",
//               fontSize: "18px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               background: "linear-gradient(90deg, #d54952ff, #7f1717ff)", // Blue gradient
//               transition: "transform 0.25s ease, box-shadow 0.25s ease",
//             }}
//             onMouseOver={(e) => {
//               e.target.style.transform = "scale(1.05)";
//               e.target.style.boxShadow = "0px 4px 12px rgba(182, 0, 9, 0.6)";
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = "scale(1)";
//               e.target.style.boxShadow = "none";
//             }}
//           >
//             Admin Login
//           </button>


//         </form>
//       </div>
//     </>
//   );
// };

// export default AdminLogin;

// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // const API_BASE = "http://127.0.0.1:8000";
// // const API_BASE = "http://192.168.0.122:8000";
// const API_BASE = "http://192.168.0.100:8000";

// const AdminLogin = () => {
//   const emailRef = useRef();
//   const pswdRef = useRef();
//   const navigate = useNavigate();

//   const adminLogin = async (e) => {
//     e.preventDefault();

//     // Reset input borders
//     emailRef.current.style.border = "none";
//     pswdRef.current.style.border = "none";

//     const email = emailRef.current.value;     // Case-sensitive email
//     const password = pswdRef.current.value;  // Case-sensitive password
//     const errorStyle = "solid 1px red";

//     try {
//       const response = await axios.post(`${API_BASE}/admin/login`, {
//         email,
//         password,
//       });

//       alert("Admin logged in successfully!");
//       navigate("/adminportal");
//     } catch (error) {
//       console.error(error);

//       // Highlight fields on error
//       emailRef.current.style.border = errorStyle;
//       pswdRef.current.style.border = errorStyle;

//       if (error.response?.data?.detail) {
//         alert(error.response.data.detail);
//       } else {
//         alert("Login failed");
//       }
//     }
//   };

//   return (
//     <div className="admin-form">
//       <form onSubmit={adminLogin}>
//         <input
//           type="email"
//           placeholder="Enter admin email address"
//           ref={emailRef}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Enter password"
//           ref={pswdRef}
//           required
//         />
//         <button
//           type="submit"
//           style={{
//             width: "70%",
//             display: "block",
//             margin: "2vh auto",
//             padding: "12px",
//             fontSize: "18px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             background: "linear-gradient(90deg, #d54952ff, #7f1717ff)",
//             transition: "transform 0.25s ease, box-shadow 0.25s ease",
//           }}
//           onMouseOver={(e) => {
//             e.target.style.transform = "scale(1.05)";
//             e.target.style.boxShadow = "0px 4px 12px rgba(182, 0, 9, 0.6)";
//           }}
//           onMouseOut={(e) => {
//             e.target.style.transform = "scale(1)";
//             e.target.style.boxShadow = "none";
//           }}
//         >
//           Admin Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

// const API_BASE = "http://127.0.0.1:8000";
// const API_BASE = "http://192.168.0.122:8000";
const API_BASE = "http://192.168.0.100:8000";

const AdminLogin = () => {
  const emailRef = useRef();
  const pswdRef = useRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // Toggle

  const adminLogin = async (e) => {
    e.preventDefault();

    emailRef.current.style.border = "none";
    pswdRef.current.style.border = "none";

    const email = emailRef.current.value;
    const password = pswdRef.current.value;
    const errorStyle = "solid 1px red";

    try {
      await axios.post(`${API_BASE}/admin/login`, { email, password });

      // alert("Admin logged in successfully!");
      navigate("/adminportal");
    } catch (error) {
      console.error(error);

      emailRef.current.style.border = errorStyle;
      pswdRef.current.style.border = errorStyle;

      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="admin-form">
      <form onSubmit={adminLogin}>
        <input
          type="email"
          placeholder="Enter admin email address"
          ref={emailRef}
          required
        />

        {/* Password with eye icon */}
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            ref={pswdRef}
            required
           
          />

          <i
            className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "63px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "20px",
            }}
          ></i>
        </div>

        <button
          type="submit"
          style={{
            width: "70%",
            display: "block",
            margin: "2vh auto",
            padding: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "white",
            border: "none",
            borderRadius: "8px",
            background: "linear-gradient(90deg, #d54952ff, #7f1717ff)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0px 4px 12px rgba(182, 0, 9, 0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          Admin Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;


////CAPTCHA Added
// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaSync } from "react-icons/fa";

// const API_BASE = "http://192.168.0.100:8000";

// const AdminLogin = () => {
//   const emailRef = useRef();
//   const pswdRef = useRef();
//   const captchaInputRef = useRef();
//   const navigate = useNavigate();

//   const [captcha, setCaptcha] = useState("");

//   // Generate Captcha
//   const generateCaptcha = () => {
//     let randomChar =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let result = "";

//     for (let i = 1; i < 5; i++) {
//       result += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
//     }
//     setCaptcha(result);
//     if (captchaInputRef.current) captchaInputRef.current.value = "";
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const adminLogin = async (e) => {
//     e.preventDefault();

//     // reset border
//     emailRef.current.style.border = "none";
//     pswdRef.current.style.border = "none";
//     captchaInputRef.current.style.border = "none";

//     const email = emailRef.current.value;
//     const password = pswdRef.current.value;
//     const captchaInput = captchaInputRef.current.value;
//     const errorStyle = "solid 1px red";

//     // Check Captcha first
//     if (captchaInput !== captcha) {
//       captchaInputRef.current.style.border = errorStyle;
//       alert("Captcha not matched!");
//       generateCaptcha();
//       return;
//     }

//     try {
//       const response = await axios.post(`${API_BASE}/admin/login`, {
//         email,
//         password,
//       });

//       alert("Admin logged in successfully!");
//       navigate("/adminportal");
//     } catch (error) {
//       console.error(error);

//       emailRef.current.style.border = errorStyle;
//       pswdRef.current.style.border = errorStyle;

//       if (error.response?.data?.detail) {
//         alert(error.response.data.detail);
//       } else {
//         alert("Login failed");
//       }
//     }
//   };

//   return (
//     <div className="admin-form">
//       <form onSubmit={adminLogin}>
//         <input
//           type="email"
//           placeholder="Enter admin email address"
//           ref={emailRef}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Enter password"
//           ref={pswdRef}
//           required
//         />

//         {/* CAPTCHA Input */}
//         <div style={{ marginTop: "10px" }}>
//           <input
//             type="text"
//             placeholder="Enter Captcha"
//             ref={captchaInputRef}
//             required
//             style={{ width: "230px", marginRight: "50px" }}
//           />

//           <span
//             style={{
//               width: "230px",
//               marginLeft: "50px",
//               padding: "10px",
//               border: "2px solid red",
//               fontWeight: "bold",
//               fontStyle: "italic",
//               textDecoration: "line-through",
//               userSelect: "none",
//               background: "#fff",
//             }}
//           >
//             {captcha} <FaSync
//             onClick={generateCaptcha}
//             style={{ marginLeft: "10px", cursor: "pointer" }}
//           />
//           </span>

         
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: "70%",
//             display: "block",
//             margin: "2vh auto",
//             padding: "12px",
//             fontSize: "18px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             background: "linear-gradient(90deg, #d54952ff, #7f1717ff)",
//             transition: "transform 0.25s ease, box-shadow 0.25s ease",
//           }}
//           onMouseOver={(e) => {
//             e.target.style.transform = "scale(1.05)";
//             e.target.style.boxShadow = "0px 4px 12px rgba(182, 0, 9, 0.6)";
//           }}
//           onMouseOut={(e) => {
//             e.target.style.transform = "scale(1)";
//             e.target.style.boxShadow = "none";
//           }}
//         >
//           Admin Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
