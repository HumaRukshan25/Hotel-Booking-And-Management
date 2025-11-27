
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/styles/signup1.css";
import Footer from "../Footer";
import Header from "../Header";

// const API_BASE = "http://192.168.0.122:8000";
const API_BASE = "http://192.168.0.100:8000";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [manualToken, setManualToken] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const resetToken = token || manualToken;

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasLetter) {
      return "Password must contain at least one letter";
    }
    if (!hasNumber) {
      return "Password must contain at least one number";
    }
    return "";
  };

  // Password strength indicator
  const checkPasswordStrength = (password) => {
    if (password.length === 0) return "";
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinLength = password.length >= 8;

    if (hasMinLength && hasLetter && hasNumber) {
      return "strong";
    } else if (password.length >= 6) {
      return "medium";
    } else {
      return "weak";
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Clear previous errors
    setErrors({ ...errors, password: "" });
    
    // Check password strength
    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
    
    // Validate password in real-time
    if (newPassword) {
      const passwordError = validatePassword(newPassword);
      if (passwordError) {
        setErrors({ ...errors, password: passwordError });
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    
    // Clear previous errors
    setErrors({ ...errors, confirmPassword: "" });
    
    // Check if passwords match
    if (newConfirmPassword && password !== newConfirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const passwordError = validatePassword(password);
    const confirmPasswordError = password !== confirmPassword ? "Passwords do not match" : "";

    const newErrors = {};
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    if (!resetToken) newErrors.token = "Please enter a reset token";

    setErrors(newErrors);

    // If there are errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/users/reset-password`, {
        token: resetToken,
        password
      });
      alert("✅ Password reset successfully!");
      navigate("/");
    } catch (error) {
      console.error("Reset error:", error);
      alert("❌ Failed to reset password. Token may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  // Get password strength color
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "strong": return "#28a745";
      case "medium": return "#ffc107";
      case "weak": return "#dc3545";
      default: return "#6c757d";
    }
  };

  // Get password strength text
  const getStrengthText = () => {
    switch (passwordStrength) {
      case "strong": return "Strong password";
      case "medium": return "Medium password";
      case "weak": return "Weak password";
      default: return "";
    }
  };

  return (
    <div className="reset-page-wrapper">
      {/* === HEADER === */}
      <Header />

      <div className="resetpage">
        <h1><b>Reset Your Password</b></h1>

        <div className="glass-container">
          <h2>Reset Password</h2>
          
          {/* Only show token input if no token in URL */}
          {!token && (
            <div className="token-input-container">
              <input
                type="text"
                placeholder="Paste reset token here (for testing)"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                className="token-input"
              />
              {errors.token && <small style={{ color: "red" }}>{errors.token}</small>}
              <small>Get token from backend console after requesting password reset</small>
            </div>
          )}

          <form onSubmit={handleSubmit} className="reset-form-box">
            <div>
              <input
                type="password"
                placeholder="New Password (min 8 chars, letters & numbers)"
                value={password}
                onChange={handlePasswordChange}
                required
                disabled={loading}
              />
              {/* Password strength indicator */}
              {passwordStrength && (
                <div style={{ marginTop: "5px" }}>
                  <small style={{ color: getStrengthColor(), fontWeight: "bold" }}>
                    {getStrengthText()}
                  </small>
                </div>
              )}
              {/* Password error message */}
              {errors.password && (
                <small style={{ color: "red", display: "block", marginTop: "5px" }}>
                  {errors.password}
                </small>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                disabled={loading}
              />
              {/* Confirm password error message */}
              {errors.confirmPassword && (
                <small style={{ color: "red", display: "block", marginTop: "5px" }}>
                  {errors.confirmPassword}
                </small>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading || !password || !confirmPassword || !resetToken || errors.password || errors.confirmPassword}
              className="submit-btn-reset"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      {/* === FOOTER === */}
      <Footer />
    </div>
  );
};

export default ResetPassword;