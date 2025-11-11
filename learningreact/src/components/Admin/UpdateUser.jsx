import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/styles/updateuser.css"

const API_BASE = "http://127.0.0.1:8000/users/";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  // Fetch user details by ID
  useEffect(() => {
    axios.get(API_BASE + id).then((res) => {
      setFormData({
        username: res.data.username,
        email: res.data.email,
      });
    });
  }, [id]);

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Update
 // Submit Update
const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      API_BASE + id,
      {
        username: formData.username,
        email: formData.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("✅ User updated successfully");
    navigate("/adminportal/users");
  } catch (error) {
    console.error("Update failed:", error.response?.data || error);
    alert("❌ Update failed. Check backend logs.");
  }
};



  return (
    <div className="update-user-container">
      <h2>Update User</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
