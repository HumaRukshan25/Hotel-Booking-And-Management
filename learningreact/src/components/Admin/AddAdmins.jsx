// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../assets/styles/addadmin.css";
// import { FaUserCircle } from "react-icons/fa";

// // const API_BASE = "http://127.0.0.1:8000/admins/";
// const API_BASE = "http://192.168.0.122:8000/admins/";


// const AddAdmins = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [admins, setAdmins] = useState([]);
//   const [editId, setEditId] = useState(null);

//   // Fetch all admins
//   const fetchAdmins = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setAdmins(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add or Update admin
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         // Update admin
//         await axios.put(API_BASE + editId, formData);
//         alert("✅ Admin updated successfully");
//       } else {
//         // Add new admin
//         await axios.post(API_BASE, formData);
//         alert("✅ Admin added successfully");
//       }
//       setFormData({ username: "", email: "", password: "" });
//       setEditId(null);
//       fetchAdmins();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Something went wrong");
//     }
//   };

//   // Edit admin
//   const handleEdit = (admin) => {
//     setFormData({
//       username: admin.username,
//       email: admin.email,
//       password: "", // Empty password field for security
//     });
//     setEditId(admin.id);
//   };

//   // Delete admin
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this admin?")) {
//       try {
//         await axios.delete(API_BASE + id);
//         fetchAdmins();
//         alert("✅ Admin deleted successfully");
//       } catch (err) {
//         console.error(err);
//         alert("❌ Failed to delete admin");
//       }
//     }
//   };

//   return (
//     <div className="addusers">
//       <h2>{editId ? "Update Admin" : "Add Admin"}</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="profile-icon-wrapper">
//           <FaUserCircle className="profile-icon" />
//         </div>
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder={editId ? "Enter New Password" : "Enter Password"}
//           value={formData.password}
//           onChange={handleChange}
//           required={!editId} // optional when updating
//         />
//         <button type="submit">{editId ? "Update Admin" : "Add Admin"}</button>
//       </form>

//       <h2>All Admins</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admins.map((admin) => (
//             <tr key={admin.id}>
//               <td>{admin.id}</td>
//               <td>{admin.username}</td>
//               <td>{admin.email}</td>
//               <td>
//                 <button onClick={() => handleEdit(admin)}>Edit</button>
//                 <button onClick={() => handleDelete(admin.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AddAdmins;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../assets/styles/addadmin.css";
// import { FaUserCircle } from "react-icons/fa";

// const API_BASE = "http://192.168.0.122:8000/admins/";

// const AddAdmins = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [admins, setAdmins] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [error, setError] = useState("");

//   // Fetch admins
//   const fetchAdmins = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setAdmins(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load admins");
//     }
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   // Validation function
//   const validateForm = () => {
//     setError("");

//     // USERNAME VALIDATION
//     if (formData.username.trim().length < 4) {
//       setError("Username must be at least 4 characters.");
//       return false;
//     }
//     if (/\s/.test(formData.username)) {
//       setError("Username cannot contain spaces.");
//       return false;
//     }

//     // EMAIL VALIDATION
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(formData.email)) {
//       setError("Invalid email format.");
//       return false;
//     }

//     // PASSWORD VALIDATION (required only when adding)
//     if (!editId) {
//       if (formData.password.length < 4) {
//         setError("Password must be at least 4 characters.");
//         return false;
//       }
//       if (/\s/.test(formData.password)) {
//         setError("Password cannot contain spaces.");
//         return false;
//       }
//       if (!/[A-Za-z]/.test(formData.password)) {
//         setError("Password must contain at least one letter.");
//         return false;
//       }
//       if (!/[0-9]/.test(formData.password)) {
//         setError("Password must contain at least one number.");
//         return false;
//       }
//     }

//     return true;
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Add / Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     try {
//       const payload = { ...formData };

//       // For edit → password optional
//       if (editId && !payload.password.trim()) {
//         delete payload.password;
//       }

//       if (editId) {
//         await axios.put(API_BASE + editId, payload);
//         alert("✅ Admin updated successfully");
//       } else {
//         await axios.post(API_BASE, payload);
//         alert("✅ Admin added successfully");
//       }

//       setFormData({ username: "", email: "", password: "" });
//       setEditId(null);
//       fetchAdmins();
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Maybe email already exists.");
//     }
//   };

//   // Edit admin
//   const handleEdit = (admin) => {
//     setFormData({
//       username: admin.username,
//       email: admin.email,
//       password: "",
//     });
//     setEditId(admin.id);
//     setError("");
//   };

//   // Delete admin
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this admin?")) return;

//     try {
//       await axios.delete(API_BASE + id);
//       alert("✅ Admin deleted successfully");
//       fetchAdmins();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to delete admin");
//     }
//   };

//   return (
//     <div className="addusers">
//       <h2>{editId ? "Update Admin" : "Add Admin"}</h2>

//       {error && <p className="error-msg">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="profile-icon-wrapper">
//           <FaUserCircle className="profile-icon" />
//         </div>

//         <input
//           type="text"
//           name="username"
//           placeholder="Enter Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder={editId ? "Enter New Password (Optional)" : "Enter Password"}
//           value={formData.password}
//           onChange={handleChange}
//           required={!editId}
//         />

//         <button type="submit">{editId ? "Update Admin" : "Add Admin"}</button>
//       </form>

//       <h2>All Admins</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {admins.map((admin) => (
//             <tr key={admin.id}>
//               <td>{admin.id}</td>
//               <td>{admin.username}</td>
//               <td>{admin.email}</td>
//               <td>
//                 <button onClick={() => handleEdit(admin)}>Edit</button>
//                 <button onClick={() => handleDelete(admin.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AddAdmins;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/addadmin.css";
import { FaUserCircle } from "react-icons/fa";

const API_BASE = "http://192.168.0.122:8000/admins/";

const AddAdmins = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      const res = await axios.get(API_BASE);
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Validation
  const validateForm = () => {
    setError("");

    // USERNAME VALIDATION
    if (formData.username.trim().length < 4) {
      setError("Username must be at least 4 characters.");
      return false;
    }
    if (/\s/.test(formData.username)) {
      setError("Username cannot contain spaces.");
      return false;
    }

    // EMAIL VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Invalid email format.");
      return false;
    }

    // PASSWORD VALIDATION
    if (!editId) {
      // For adding admin
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return false;
      }
      if (/\s/.test(formData.password)) {
        setError("Password cannot contain spaces.");
        return false;
      }
      if (!/[A-Za-z]/.test(formData.password)) {
        setError("Password must contain at least one letter.");
        return false;
      }
      if (!/[0-9]/.test(formData.password)) {
        setError("Password must contain at least one number.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    } else {
      // For editing admin
      if (formData.password.trim()) {
        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters.");
          return false;
        }
        if (/\s/.test(formData.password)) {
          setError("Password cannot contain spaces.");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return false;
        }
      }
    }

    return true;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = { ...formData };

      delete payload.confirmPassword;

      // If editing and password empty → don't send it
      if (editId && !payload.password.trim()) {
        delete payload.password;
      }

      if (editId) {
        await axios.put(API_BASE + editId, payload);
        alert("✅ Admin updated successfully");
      } else {
        await axios.post(API_BASE, payload);
        alert("✅ Admin added successfully");
      }

      // Reset
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setEditId(null);
      fetchAdmins();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Maybe email already exists.");
    }
  };

  // Edit Admin
  const handleEdit = (admin) => {
    setFormData({
      username: admin.username,
      email: admin.email,
      password: "",
      confirmPassword: "",
    });
    setEditId(admin.id);
    setError("");
  };

  // Delete Admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(API_BASE + id);
      alert("✅ Admin deleted successfully");
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete admin");
    }
  };

  return (
    <div className="addusers">
      <h2>{editId ? "Update Admin" : "Add Admin"}</h2>

      {error && <p className="error-msg">{error}</p>}

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
          placeholder={editId ? "New Password (Optional)" : "Enter Password"}
          value={formData.password}
          onChange={handleChange}
          required={!editId}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder={editId ? "Confirm New Password (Optional)" : "Confirm Password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          required={!editId}
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
