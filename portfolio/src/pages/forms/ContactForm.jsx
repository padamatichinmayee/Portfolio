import { useState } from "react";
import axios from "axios";
import "./Forms.css";

const ContactForm = ({ userId }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`http://localhost:5000/api/portfolio/${userId}`, {
        contact: { email, phone, linkedin, instagram, github },
      });

      setMessage("Contact section updated successfully!");
    } catch (error) {
      setMessage("Error updating contact section.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Contact Section</h2>
      <form onSubmit={handleSubmit} className="form">
        
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label">Phone:</label>
        <input
          type="text"
          className="form-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label className="form-label">LinkedIn:</label>
        <input
          type="url"
          className="form-input"
          placeholder="https://www.linkedin.com/in/your-profile"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <label className="form-label">Instagram:</label>
        <input
          type="url"
          className="form-input"
          placeholder="https://www.instagram.com/your-profile"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="form-label">GitHub:</label>
        <input
          type="url"
          className="form-input"
          placeholder="https://github.com/your-username"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default ContactForm;
