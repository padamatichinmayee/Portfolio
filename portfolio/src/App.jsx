import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Portfolio from "./pages/Portfolio";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const PrivateRoute = ({ element }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? element : <Navigate to="/login" />;
};

const AdminRoute = ({ element }) => {
  return localStorage.getItem("adminAuth") === "true" ? element : <Navigate to="/admin-login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="/portfolio/:userId" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
