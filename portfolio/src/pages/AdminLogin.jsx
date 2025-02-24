import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
import Footer from "../components/Footer";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" }); // ✅ Alert state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" }); // ✅ Reset alert

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");

      // ✅ Show success alert
      setAlert({ message: "Login Successful! Redirecting to Dashboard...", type: "success" });

      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } else {
      // ✅ Show error alert
      setAlert({ message: "Invalid Admin Credentials!", type: "error" });
    }
  };

  return (
    <div className="admin-container">
      <Navbar />
      {alert.message && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminLogin;
