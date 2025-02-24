import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // ✅ Import Navbar

const ContactUs = () => {
  return (
    <div>
      <Navbar /> {/* ✅ Add Navbar */}
      <div style={styles.container}>
        <div style={styles.overlay}>
          <h1 style={styles.heading}>Contact Us</h1>
          <p style={styles.subtext}>Have questions? Get in touch with us!</p>
          <p style={styles.subtext}>Email: support@portfolio.com</p>
          <p style={styles.subtext}>Phone: +91 (123) 456-7890</p>
          <p style={styles.subtext}>Address: KL UNIVERSITY</p>
        </div>
      </div>
      <Footer/>
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
    backgroundImage: "url('https://www.jncreative.com/wp-content/uploads/2013/09/jn-creative-portfolio-background-1.jpg')", // Make sure the image is in 'public/assets/'
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "80px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "50px",
    borderRadius: "12px",
    color: "white",
    maxWidth: "800px",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "white",
    textDecoration: "underline",
  },
  subtext: {
    fontSize: "20px",
    lineHeight: "1.5",
    marginBottom: "15px",
  },
};

export default ContactUs;
