// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_BASE = 'http://127.0.0.1:8000';

// const UserLogin = () => {
//   const emailField = useRef();
//   const pswdField = useRef();
//   const navigate = useNavigate();

//   const [users, setUsers] = useState([]);

//   // Fetch all users from backend
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(`${API_BASE}/users/`);
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const emailInput = emailField.current.value;
//     const pswdInput = pswdField.current.value;

//     // Reset borders
//     emailField.current.style.border = 'none';
//     pswdField.current.style.border = 'none';
//     const errorStyle = 'solid 1px red';

//     // Find user by email
//     const loggedUser = users.find(
//       (user) => user.email?.toLowerCase() === emailInput.toLowerCase()
//     );

//     if (!loggedUser) {
//       emailField.current.style.border = errorStyle;
//       return alert("Email doesn't exist");
//     }

//     // Validate password from DB
//     if (pswdInput !== loggedUser.password) {
//       pswdField.current.style.border = errorStyle;
//       return alert('Incorrect password');
//     }

//     // Save user info in localStorage
//     localStorage.setItem('userId', loggedUser.id);
//     localStorage.setItem('username', loggedUser.username);

//     alert(`Welcome ${loggedUser.username}! Logged in successfully.`);

//     // Redirect to user portal
//     navigate('/usersportal');
//   };

//   return (
//     <div className="user-form">
//       <form onSubmit={handleSubmit}>
//         <input
//           ref={emailField}
//           type="email"
//           placeholder="Enter user email address"
//           required
//         />
//         <input
//           ref={pswdField}
//           type="password"
//           placeholder="Enter password"
//           required
//         />

//         <button
//             style={{
//               width: "80%",
//               display: "block",
//               margin: "2vh auto",
//               padding: "12px",
//               fontSize: "18px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               background: "linear-gradient(90deg, #d54952ff, #7f1717ff)", // Blue gradient
//               transition: "transform 0.25s ease, box-shadow 0.25s ease",
//             }}
//             onMouseOver={(e) => {
//               e.target.style.transform = "scale(1.05)";
//               e.target.style.boxShadow = "0px 4px 12px rgba(182, 0, 9, 0.6)";
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = "scale(1)";
//               e.target.style.boxShadow = "none";
//             }}
//           >
//           User Login
//         </button>

//       </form>
//     </div>
//   );
// };

// export default UserLogin;


import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://127.0.0.1:8000';

const UserLogin = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Reset borders
    emailRef.current.style.border = 'none';
    passwordRef.current.style.border = 'none';

    const errorStyle = 'solid 1px red';

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/users/login`, {
        email,
        password,
      });

      const loggedUser = response.data.user;

      // Save user info
      localStorage.setItem('userId', loggedUser.id);
      localStorage.setItem('username', loggedUser.username);

      alert(`Welcome ${loggedUser.username}! Logged in successfully.`);
      navigate('/usersportal');

    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        alert(error.response.data.detail);

        // Highlight error fields
        emailRef.current.style.border = errorStyle;
        passwordRef.current.style.border = errorStyle;
      } else {
        alert('Login failed. Please try again.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter user email address"
          required
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          required
        />

        <button
          disabled={loading}
          style={{
            width: "80%",
            display: "block",
            margin: "2vh auto",
            padding: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "white",
            border: "none",
            borderRadius: "8px",
            background: "linear-gradient(90deg, #d54952ff, #7f1717ff)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0px 4px 12px rgba(182, 0, 9, 0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          {loading ? "Logging in..." : "User Login"}
        </button>
      </form>
    </div>
  );
};

export default UserLogin;

