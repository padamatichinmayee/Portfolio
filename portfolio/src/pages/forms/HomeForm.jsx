import { useState, useEffect } from "react";
import axios from "axios";
import "./Forms.css";

const HomeForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("HomeForm Mounted - userId:", userId);
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userId) {
      setMessage("Error: User ID is missing!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/portfolio/${userId}/home`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(response.data.message || "Home section updated successfully!");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      setMessage(error.response?.data?.error || "Error updating home section.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Home Section</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Subtitle:</label>
        <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />

        <label>Upload Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        
        {preview && <img src={preview} alt="Profile Preview" className="image-preview" />}

        <button className="form-button" type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default HomeForm;
