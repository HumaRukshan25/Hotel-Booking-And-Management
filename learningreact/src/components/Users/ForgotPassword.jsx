import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/forgot.css";
import Footer from "../Footer";
import Header from "../Header";

 // const API_BASE = "http://127.0.0.1:8000";
const API_BASE = "http://192.168.0.122:8000";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE}/users/forgot-password`, { email });
      alert("If this email exists, a reset link has been sent.");
      setEmail("");
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page-wrapper">
      {/* === HEADER - WILL BE VISIBLE === */}
      <Header />

      <div className="forgotpage">
        <h1><b>Reset Your Password</b></h1>

        <div className="glass-container">
          <h2>Forgot Password</h2>
          
          <form onSubmit={handleSubmit} className="forgot-form-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <button 
              type="submit" 
              disabled={loading || !email}
              className="submit-btn-forgot"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>

      {/* === FOOTER === */}
      <Footer />
    </div>
  );
};

export default ForgotPassword;