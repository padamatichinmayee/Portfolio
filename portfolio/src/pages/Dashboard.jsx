import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeForm from "./forms/HomeForm";
import AboutForm from "./forms/AboutForm";
import EducationForm from "./forms/EducationForm";
import TechStackForm from "./forms/TechStackForm";
import ContactForm from "./forms/ContactForm";
import ProjectForm from "./forms/ProjectsForm";
import "./Dashboard.css"; 
const tabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "techstack", label: "Tech Stack" },
  
  { id: "project", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Get userId from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in localStorage.");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title"> Dashboard</h2>

      {/* Tabs Section */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="tab-content">
        {activeTab === "home" && <HomeForm userId={userId} />}
        {activeTab === "about" && <AboutForm userId={userId} />}
        {activeTab === "education" && <EducationForm userId={userId} />}
        {activeTab === "techstack" && <TechStackForm userId={userId} />}
       
        {activeTab === "project" && <ProjectForm userId={userId} />}
        {activeTab === "contact" && <ContactForm userId={userId} />}
      </div>

      {/* View Portfolio Button */}
      <button
        className="view-portfolio-btn"
        onClick={() => navigate(`/portfolio/${userId}`)}
        disabled={!userId} // Disable if userId is null
      >
        View Portfolio
      </button>
    </div>
  );
};

export default Dashboard;
