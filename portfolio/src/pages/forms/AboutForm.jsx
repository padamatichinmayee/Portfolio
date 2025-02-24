import { useState } from "react";
import axios from "axios";
import "./Forms.css";

const AboutForm = ({ userId }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(`http://localhost:5000/api/portfolio/${userId}/about`, {
        description,
      });
      console.log("About section updated:", response.data); // Debugging line
      setMessage("About section updated successfully!");
    } catch (error) {
      console.error("Error updating about section:", error);
      setMessage("Error updating about section.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="form-container">
      <h2 className="form-title">About Section</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">Description:</label>
        <textarea
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default AboutForm;
