import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // ✅ Import Footer
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.overlay}>
          <h1 style={styles.heading}>Craft Your Digital Presence</h1>
          <p style={styles.subtext}>
            Showcase your skills and achievements with a sleek, dynamic portfolio that speaks for you.
          </p>
          <div className="button-container">
            <button className="animated-button" onClick={() => navigate("/login")}>
              Get Started
            </button>
            <button className="animated-button outline" onClick={() => navigate("/signup")}>
              Join Now
            </button>
          </div>
        </div>
      </div>
      <Footer /> {/* ✅ Added Footer */}
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundImage:
      "url('https://www.jncreative.com/wp-content/uploads/2013/09/jn-creative-portfolio-background-1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "80px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "50px",
    borderRadius: "12px",
    color: "white",
    maxWidth: "600px",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "white",
    textDecoration: "underline", // ✅ Added underline to the heading
  },
  subtext: {
    fontSize: "20px",
    lineHeight: "1.5",
    marginBottom: "25px",
  },
};

export default Home;
