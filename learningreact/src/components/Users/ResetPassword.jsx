import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/styles/signup.css";

const API_BASE = "http://127.0.0.1:8000";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [manualToken, setManualToken] = useState(""); // For testing
  const { token } = useParams();
  const navigate = useNavigate();

  // Use either the URL token or manual token for testing
  const resetToken = token || manualToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!resetToken) {
      alert("Please enter a reset token");
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

  return (
    <div className="signup-form-container">
      <h2>Reset Password</h2>
      
      {/* Only show token input if no token in URL */}
      {!token && (
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Paste reset token here (for testing)"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <small>Get token from backend console after requesting password reset</small>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button 
          type="submit" 
          disabled={loading || !password || !confirmPassword || !resetToken}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;