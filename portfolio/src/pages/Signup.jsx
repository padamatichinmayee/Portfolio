import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
import Footer from "../components/Footer";
import "./Signup.css"; // ✅ Import CSS

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" }); // ✅ Alert state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" }); // ✅ Reset alert

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });

      if (response.data) {
        console.log("Signup Successful:", response.data);

        // ✅ Show success message
        setAlert({ message: "Signup Successful! Redirecting to Login...", type: "success" });

        setTimeout(() => {
          navigate("/login"); // ✅ Redirect to login after signup
        }, 1500);
      }
    } catch (error) {
      setAlert({ message: "Signup failed. Email may already exist.", type: "error" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        {alert.message && (
          <div className={`alert ${alert.type}`}>
            {alert.message}
          </div>
        )}
        <div className="signup-box">
          <h2>Create an Account</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit">Sign Up</button>
          </form>
          <p className="login-text">
            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Signup;
