// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../../assets/styles/signup.css";

// // const API_BASE = "http://127.0.0.1:8000";
// const API_BASE = "http://192.168.0.122:8000";

// const UserSignup = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Basic frontend validation
//     if (!form.username || !form.email || !form.password) {
//       alert("All fields are required!");
//       setLoading(false);
//       return;
//     }

//     if (form.password.length < 6) {
//       alert("Password must be at least 6 characters long.");
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.post(`${API_BASE}/users/`, form);
//       alert("✅ Signup successful! You can now login.");
//       navigate("/"); // Redirect to login page
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data.detail) {
//         alert(`❌ Signup failed: ${error.response.data.detail}`);
//       } else {
//         alert("❌ Failed to signup. Email might already exist.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="signup-form-container"
//       style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}
//     >
//       <h2>Sign Up</h2>
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "12px" }}
//       >
//         <input
//           type="text"
//           name="username"
//           placeholder="Full Name"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           style={{ padding: "10px", cursor: "pointer" }}
//         >
//           {loading ? "Signing Up..." : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserSignup;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/signup.css";
import Footer from "../Footer";

const API_BASE = "http://192.168.0.122:8000";

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
      if (value.length < 6) {
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
        "Password must be 6+ characters and include letters & numbers.";
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
