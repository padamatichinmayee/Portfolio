import { useState } from "react";
import axios from "axios";
import "./Forms.css";

const ProjectForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`http://localhost:5000/api/portfolio/${userId}/projects`, {
        title,
        description,
        image,
        githubLink,
      });
      setMessage("Project added successfully!");
    } catch (error) {
      setMessage("Error adding project.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Projects</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">Title:</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="form-label">Description:</label>
        <textarea
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="form-label">Image URL:</label>
        <input
          type="text"
          className="form-input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label className="form-label">GitHub Link:</label>
        <input
          type="text"
          className="form-input"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default ProjectForm;
