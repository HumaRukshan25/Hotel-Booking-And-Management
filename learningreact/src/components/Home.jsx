import React from "react";
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="title">Welcome to LuxuryStay</h1>
        <p className="subtitle">Book premium hotels with comfort and convenience ✨</p>

        <button className="explore-btn" onClick={() => window.location.href = "/usersportal/hotels"}>
          Explore Hotels ➜
        </button>
      </div>
    </div>
  );
};

export default Home;
