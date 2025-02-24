import { useState } from "react";
import axios from "axios";
import "./Forms.css";

const EducationForm = ({ userId }) => {
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`http://localhost:5000/api/portfolio/${userId}/education`, {
        degree,
        institution,
        year,
      });
      setMessage("Education section updated successfully!");
    } catch (error) {
      setMessage("Error updating education section.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Education Section</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">Degree:</label>
        <input
          type="text"
          className="form-input"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          required
        />

        <label className="form-label">Institution:</label>
        <input
          type="text"
          className="form-input"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />

        <label className="form-label">Year:</label>
        <input
          type="text"
          className="form-input"
          value={year}
          onChange={(e) => setYear(e.target.value)}
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

export default EducationForm;
