import React, { useState, useEffect } from "react";
import "../../assets/styles/addusers.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/users/";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // If id exists, then it's update

  // Fetch user details for update
  useEffect(() => {
    if (id) {
      axios.get(API_BASE + id).then((res) => {
        setFormData({
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
        });
      });
    }
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add / Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await axios.put(API_BASE + id, formData);
      alert("✅ User Updated Successfully");
    } else {
      await axios.post(API_BASE, formData);
      alert("✅ User Added Successfully");
    }

    navigate("/adminportal/users");
  };

  return (
    <div className="addusers">
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{id ? "Update User" : "Add User"}</button>
      </form>
    </div>
  );
};

export default AddUser;
