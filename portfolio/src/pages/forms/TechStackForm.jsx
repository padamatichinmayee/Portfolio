import { useState } from "react";
import axios from "axios";
import "./Forms.css";

const TechStackForm = ({ userId }) => {
  const [tech, setTech] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`http://localhost:5000/api/portfolio/${userId}/techstack`, { tech });
      setMessage("Tech Stack updated successfully!");
    } catch (error) {
      setMessage("Error updating tech stack.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Tech Stack</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">Technology:</label>
        <input
          type="text"
          className="form-input"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
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

export default TechStackForm;
