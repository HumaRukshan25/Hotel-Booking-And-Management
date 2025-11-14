import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect current portal (admin or user)
  const isAdmin = location.pathname.startsWith("/adminportal");

  const handleExplore = () => {
    if (isAdmin) {
      navigate("/adminportal/hotels");
    } else {
      navigate("/usersportal/hotels");
    }
  };

  return (
    <div className="home-container">
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="title"><b>Welcome to LuxuryStay</b></h1>
        <p className="subtitle">
          <b>
          Book premium hotels with comfort and convenience✨</b>
        </p>

        <button className="explore-btn" onClick={handleExplore}>
         <b> Explore Hotels ➜</b>
        </button>
      </div>
    </div>
  );
};

export default Home;
