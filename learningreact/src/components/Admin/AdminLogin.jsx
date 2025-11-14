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


import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

const AdminLogin = () => {
  let emailRef = useRef();
  let pswdRef = useRef();
  let navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();

    // reset borders
    emailRef.current.style.border = "none";
    pswdRef.current.style.border = "none";

    const email = emailRef.current.value;
    const password = pswdRef.current.value;
    const errorStyle = "solid 1px red";

    try {
      const response = await axios.post(`${API_BASE}/admin/login`, {
        email,
        password,
      });

      alert("Admin logged in successfully!");
      navigate("/adminportal");
    } catch (error) {
      console.error(error);

      // Highlight fields on error
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
          placeholder="enter admin email address"
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="enter password"
          ref={pswdRef}
          required
        />

        <button
          type="submit"
          style={{
            width: "80%",
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
