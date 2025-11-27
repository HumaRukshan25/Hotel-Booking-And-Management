import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/signup.css";
import Footer from "../Footer";
import Header from "../Header";

// const API_BASE = "http://192.168.0.122:8000";
const API_BASE = "http://192.168.0.100:8000";

const UserSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Password strength checker
    if (name === "password") {
      if (value.length < 8) {
        setPasswordStrength("Weak password");
      } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
        setPasswordStrength("Strong password");
      } else {
        setPasswordStrength("Medium password");
      }
    }

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    // Username
    if (!form.username) {
      newErrors.username = "Username is required.";
    } else if (form.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters.";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email.";
    }

    // Password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.includes(" ")) {
      newErrors.password = "Password must not contain spaces.";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be 8+ characters and include letters & numbers.";
    }

    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/users/`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 400 || error.response?.status === 409) {
        setErrors({ ...errors, email: "Email already exists." });
      } else if (error.response?.data?.detail) {
        setErrors({ ...errors, email: error.response.data.detail });
      } else {
        alert("Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="signup-page-bg">
 <Header />
    <div className="signup-form-container">
      <h4>Create Your Account</h4>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {/* Username */}
        <div>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && (
            <small style={{ color: "red" }}>{errors.username}</small>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <small style={{ color: "red" }}>{errors.email}</small>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
          />

          {passwordStrength && (
            <small
              style={{
                color:
                  passwordStrength === "Strong password"
                    ? "green"
                    : passwordStrength === "Medium password"
                    ? "orange"
                    : "red",
              }}
            >
              {passwordStrength}
            </small>
          )}

          {errors.password && (
            <small style={{ color: "red" }}>{errors.password}</small>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small style={{ color: "red" }}>{errors.confirmPassword}</small>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>

    <Footer />
  </div>
);

};

export default UserSignup;

////CAPTCHA Added
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../../assets/styles/signup.css";
// import Header from "../Header";
// import Footer from "../Footer";
// import { FaSync } from "react-icons/fa";

// const API_BASE = "http://192.168.0.100:8000";

// const UserSignup = () => {
//   const navigate = useNavigate();

//   const usernameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const confirmPswdRef = useRef();
//   const captchaInputRef = useRef();

//   const [captcha, setCaptcha] = useState("");

//   // Generate Captcha
//   const generateCaptcha = () => {
//     let chars =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let result = "";
//     for (let i = 1; i < 5; i++) {
//       result += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptcha(result);
//     if (captchaInputRef.current) captchaInputRef.current.value = "";
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const username = usernameRef.current.value;
//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;
//     const confirmPassword = confirmPswdRef.current.value;
//     const captchaInput = captchaInputRef.current.value;

//     const errorStyle = "1px solid red";

//     // Reset borders
//     usernameRef.current.style.border = "none";
//     emailRef.current.style.border = "none";
//     passwordRef.current.style.border = "none";
//     confirmPswdRef.current.style.border = "none";
//     captchaInputRef.current.style.border = "none";

//     // Captcha Check
//     if (captchaInput !== captcha) {
//       captchaInputRef.current.style.border = errorStyle;
//       alert("Captcha not matched!");
//       generateCaptcha();
//       return;
//     }

//     // Password Match
//     if (password !== confirmPassword) {
//       confirmPswdRef.current.style.border = errorStyle;
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       await axios.post(`${API_BASE}/users/`, {
//         username,
//         email,
//         password,
//       });

//       alert("Signup successful!");
//       navigate("/");
//     } catch (error) {
//       console.error(error);

//       if (error.response?.status === 409) {
//         alert("Email already exists");
//         emailRef.current.style.border = errorStyle;
//       } else {
//         alert("Signup failed");
//       }
//     }
//   };

//   return (
//     <div className="signup-page-bg">
//       <Header />

//       <div className="signup-form-container">
//         <h4>Create Your Account</h4>

//         <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//           {/* Username */}
//           <input type="text" placeholder="Enter Username" ref={usernameRef} required />

//           {/* Email */}
//           <input type="email" placeholder="Enter Email" ref={emailRef} required />

//           {/* Password */}
//           <input type="password" placeholder="Enter Password" ref={passwordRef} required />

//           {/* Confirm Password */}
//           <input type="password" placeholder="Confirm Password" ref={confirmPswdRef} required />

//           {/* CAPTCHA */}
//           {/* CAPTCHA */}
// <div
//   style={{
//     display: "flex",
//     alignItems: "center",
//     gap: "20px",
//     marginTop: "10px",
//   }}
// >
//   <input
//     type="text"
//     placeholder="Enter Captcha"
//     ref={captchaInputRef}
//     required
//     style={{
//       width: "230px",
//       padding: "10px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//       fontSize: "16px",
//     }}
//   />

//   <div
//     style={{
//       width: "230px",
//       padding: "10px",
//       border: "2px solid red",
//       fontWeight: "bold",
//       fontStyle: "italic",
//       textDecoration: "line-through",
//       userSelect: "none",
//       background: "#fff",
//       borderRadius: "6px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     }}
//   >
//     {captcha}

//     <FaSync
//       onClick={generateCaptcha}
//       style={{
//         cursor: "pointer",
//         fontSize: "18px",
//         marginLeft: "10px",
//       }}
//     />
//   </div>
// </div>


//           <button type="submit">Sign Up</button>
//         </form>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default UserSignup;
