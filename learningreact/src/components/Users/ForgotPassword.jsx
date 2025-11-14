// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../../assets/styles/signup.css"; // reuse signup styles for form

// const API_BASE = "http://127.0.0.1:8000";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post(`${API_BASE}/users/forgot-password`, { email });
//       alert(
//         "✅ If this email exists, a password reset link has been sent to it."
//       );
//       navigate("/"); // redirect to login/landing page
//     } catch (error) {
//       console.error(error);
//       alert("❌ Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-form-container">
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

// ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // optional for redirect
import "../../assets/styles/signup.css";

const API_BASE = "http://127.0.0.1:8000";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // optional if you want to redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/users/forgot-password`, { email });
      console.log("Server response:", response.data);

      alert("✅ If this email exists, a password reset link has been sent.");
      
      // Clear input
      setEmail(""); 

      // Optional: store a temporary flag in localStorage
      localStorage.setItem("forgotPasswordEmail", email);

      // Optional: redirect to login page after submit
      // navigate("/login");

    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading || !email}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
