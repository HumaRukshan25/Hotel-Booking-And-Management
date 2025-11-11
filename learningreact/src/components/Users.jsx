import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/users.css";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/users/";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get(API_BASE);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const deleteUser = async (id, username) => {
    if (window.confirm(`Delete user ${username}?`)) {
      await axios.delete(API_BASE + id);
      fetchUsers();
    }
  };

  return (
    <div className="users">
      <div className="container">
        <h2>Users List</h2>

        <button
          className="addBtn"
          onClick={() => navigate("/adminportal/addusers")}
        >
          ➕ Add User
        </button>

        {users.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>

                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => deleteUser(u.id, u.username)}
                    >
                      Delete
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn-update"
                      onClick={() =>
                        navigate(`/adminportal/updateuser/${u.id}`)
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No Users Found</h2>
        )}
      </div>
    </div>
  );
};

export default Users;
