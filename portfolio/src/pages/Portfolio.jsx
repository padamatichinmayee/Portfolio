import { useEffect, useState } from "react";
import axios from "axios";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "./Portfolio.css";

const Portfolio = () => {
  const { userId: paramUserId } = useParams();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get userId from URL params or localStorage
  const userId = paramUserId || localStorage.getItem("userId");

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolioData = async () => {
      try {
        if (!userId) {
          setError("User ID not found.");
          return;
        }

        console.log("Fetching portfolio for userId:", userId);
        const response = await axios.get(`http://localhost:5000/api/portfolio/${userId}`);

        if (isMounted) {
          setPortfolioData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Error fetching portfolio data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPortfolioData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // ✅ Clear userId on logout
    navigate("/");
  };

  // ✅ Back to Dashboard function
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) return <p className="loading">Loading portfolio...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="portfolio-layout">
      {/* Sidebar */}
      <nav className="sidebar">
  <h2 className="sidebar-title">My Portfolio</h2>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About Me</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#techstack">Tech Stack</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  {/* 🔹 Buttons at Bottom */}
  <div className="sidebar-buttons">
    <button className="dashboard-button" onClick={handleBackToDashboard}>Back to Dashboard</button>
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  </div>
</nav>


      {/* Main Content */}
      <div className="portfolio-content">
        {/* Home Section */}
        <section id="home" className="portfolio-section home">
          <div className="home-content">
            <h1>{portfolioData?.home?.title || "Welcome to My Portfolio"}</h1>
            <h2>{portfolioData?.home?.subtitle || "A place where skills meet passion"}</h2>
          </div>
          {portfolioData?.home?.profilePic && (
            <img
              src={portfolioData.home.profilePic.startsWith("http") 
                ? portfolioData.home.profilePic 
                : `http://localhost:5000${portfolioData.home.profilePic}`}
              alt="Profile"
              className="profile-image"
            />
          )}
        </section>

        {/* About Section */}
        <section id="about" className="portfolio-section about">
          <h2>About Me👇</h2>
          <p>{portfolioData?.about?.description || "No description available."}</p>
        </section>

        {/* Education Section */}
        <section id="education" className="portfolio-section education">
          <h2>Education 🎓</h2>
          {Array.isArray(portfolioData?.education) && portfolioData.education.length > 0 ? (
            <ul>
              {portfolioData.education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          ) : (
            <p>No education details available.</p>
          )}
        </section>

        {/* Tech Stack Section */}
        <section id="techstack" className="portfolio-section techstack">
          <h2>Tech Stack ⚙️</h2>
          {Array.isArray(portfolioData?.techStack) && portfolioData.techStack.length > 0 ? (
            <ul className="tech-list">
              {portfolioData.techStack.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          ) : (
            <p>No tech stack added.</p>
          )}
        </section>

        {/* Projects Section */}
        <section id="projects" className="portfolio-section projects">
          <h2>Projects 📂</h2>
          {Array.isArray(portfolioData?.projects) && portfolioData.projects.length > 0 ? (
            <div className="project-container">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="project-card">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No projects added yet.</p>
          )}
        </section>

       {/* Contact Section */}
<section id="contact" className="portfolio-section contact">
  <h2>Contact 📩</h2>
  {portfolioData?.contact ? (
    <div>
      <p>Email: {portfolioData.contact.email || "Not provided"}</p>
      <p>Phone: {portfolioData.contact.phone || "Not provided"}</p>

      {/* ✅ Social Media Links with Icons */}
      <div className="social-icons">
        {portfolioData.contact.linkedin && (
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon linkedin" />
          </a>
        )}

        {portfolioData.contact.instagram && (
          <a href={portfolioData.contact.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
        )}

        {portfolioData.contact.github && (
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="social-icon github" />
          </a>
        )}
      </div>
    </div>
  ) : (
    <p>No contact details available.</p>
  )}
</section>
      </div>
    </div>
  );
};

export default Portfolio;
