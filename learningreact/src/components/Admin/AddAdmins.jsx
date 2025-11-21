import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/addadmin.css";
import { FaUserCircle } from "react-icons/fa";

const API_BASE = "http://127.0.0.1:8000/admins/";

const AddAdmins = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const res = await axios.get(API_BASE);
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update admin
        await axios.put(API_BASE + editId, formData);
        alert("✅ Admin updated successfully");
      } else {
        // Add new admin
        await axios.post(API_BASE, formData);
        alert("✅ Admin added successfully");
      }
      setFormData({ username: "", email: "", password: "" });
      setEditId(null);
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  // Edit admin
  const handleEdit = (admin) => {
    setFormData({
      username: admin.username,
      email: admin.email,
      password: "", // Empty password field for security
    });
    setEditId(admin.id);
  };

  // Delete admin
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await axios.delete(API_BASE + id);
        fetchAdmins();
        alert("✅ Admin deleted successfully");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to delete admin");
      }
    }
  };

  return (
    <div className="addusers">
      <h2>{editId ? "Update Admin" : "Add Admin"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-icon-wrapper">
          <FaUserCircle className="profile-icon" />
        </div>
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
          placeholder={editId ? "Enter New Password" : "Enter Password"}
          value={formData.password}
          onChange={handleChange}
          required={!editId} // optional when updating
        />
        <button type="submit">{editId ? "Update Admin" : "Add Admin"}</button>
      </form>

      <h2>All Admins</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>
                <button onClick={() => handleEdit(admin)}>Edit</button>
                <button onClick={() => handleDelete(admin.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddAdmins;
