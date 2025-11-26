// import React, { useState, useEffect } from "react";
// import "../../assets/styles/addusers.css";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { FaUserCircle } from "react-icons/fa";   // ✅ Profile Icon

// // const API_BASE = "http://127.0.0.1:8000/users/";
// const API_BASE = "http://192.168.0.122:8000/users/";


// const AddUser = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const { id } = useParams();

//   // Fetch user details for update
//   useEffect(() => {
//     if (id) {
//       axios.get(API_BASE + id).then((res) => {
//         setFormData({
//           username: res.data.username,
//           email: res.data.email,
//           password: res.data.password,
//         });
//       });
//     }
//   }, [id]);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add / Update user
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (id) {
//       await axios.put(API_BASE + id, formData);
//       alert("✅ User Updated Successfully");
//     } else {
//       await axios.post(API_BASE, formData);
//       alert("✅ User Added Successfully");
//     }

//     navigate("/adminportal/users");
//   };

//   return (
//     <div className="addusers">
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
//           placeholder="Enter Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">{id ? "Update User" : "Add User"}</button>
//       </form>
//     </div>
//   );
// };

// export default AddUser;

import React, { useState, useEffect } from "react";
import "../../assets/styles/addusers.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const API_BASE = "http://192.168.0.122:8000/users/";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(API_BASE + id).then((res) => {
        setFormData({
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          confirmPassword: res.data.password,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const checkEmailExists = async (email) => {
    try {
      const res = await axios.get(API_BASE);
      const users = res.data;

      const userExists = users.some(
        (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      return userExists;
    } catch {
      return false;
    }
  };

  const validate = async () => {
    let newErrors = {};

    // Username
    if (!formData.username) {
      newErrors.username = "Username is required.";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters.";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    } else {
      const exists = await checkEmailExists(formData.email);
      if (!id && exists) {
        newErrors.email = "Email already exists.";
      }
    }

    // Password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.includes(" ")) {
      newErrors.password = "Password must not contain spaces.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must include letters & numbers (min 6 chars).";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    if (id) {
      await axios.put(API_BASE + id, payload);
      alert("✅ User Updated Successfully");
    } else {
      await axios.post(API_BASE, payload);
      alert("✅ User Added Successfully");
    }

    navigate("/adminportal/users");
  };

  return (
    <div className="addusers">
      <form onSubmit={handleSubmit}>
        <div className="profile-icon-wrapper">
          <FaUserCircle className="profile-icon" />
        </div>

        <div>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <small style={{ color: "red" }}>{errors.username}</small>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small style={{ color: "red" }}>{errors.confirmPassword}</small>
          )}
        </div>

        <button type="submit">{id ? "Update User" : "Add User"}</button>
      </form>
    </div>
  );
};

export default AddUser;
