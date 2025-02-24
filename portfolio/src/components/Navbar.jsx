import { Link } from "react-router-dom";
import "./Navbar.css"; // ✅ Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">My Portfolio</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/admin-login">Admin</Link> 
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
