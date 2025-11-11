import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/signup.css"

const API_BASE = "http://127.0.0.1:8000";

const UserSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE}/users/`, form);
      alert("✅ Signup successful! You can now login.");
      navigate("/"); // Redirect to landing/login page
    } catch (error) {
      console.error(error);
      alert("❌ Failed to signup. Email might already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-container" style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
