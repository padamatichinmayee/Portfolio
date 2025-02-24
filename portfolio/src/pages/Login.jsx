import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // ✅ Import Footer
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" });

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      if (response.data.token && response.data._id) {
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("token", response.data.token);

        dispatch(loginSuccess(response.data));

        setAlert({ message: "Login Successful! Redirecting...", type: "success" });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setAlert({ message: "Invalid credentials. Please try again.", type: "error" });
      }
    } catch (error) {
      setAlert({ message: "Login failed. Check your credentials.", type: "error" });
    }
  };

  return (
    <div className="login-wrapper"> {/* ✅ Wrap everything in a container */}
      <Navbar />
      <div className="content">
        <div className="login-container">
          {alert.message && (
            <div className={`alert ${alert.type}`}>
              {alert.message}
            </div>
          )}
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <p className="signup-text">
              Don't have an account? <span onClick={() => navigate("/signup")}>Sign up</span>
            </p> 
          </div>
        </div>
      </div>
      <Footer /> {/* ✅ Footer added here */}
    </div>
  );
};

export default Login;
