import "./AdminDashboard.css"; // ✅ Import CSS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth") === "true";
    if (!isAdmin) {
      navigate("/admin-login");
    }

    fetchUsers(); // ✅ Fetch users when component mounts
  }, [navigate]);

  // ✅ Function to fetch users
  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users", err));
  };

  // ✅ Function to handle user deletion
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/admin/users/${userId}`)
        .then(() => {
          setUsers(users.filter((user) => user._id !== userId)); // ✅ Remove user from UI
        })
        .catch((err) => console.error("Error deleting user", err));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <h3>Registered Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Account Created</th>
            <th>Actions</th>  
                      </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
