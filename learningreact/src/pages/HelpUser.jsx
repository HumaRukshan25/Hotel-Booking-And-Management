import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/staticPages.css";

const HelpUser = () => {
  // Check login status
  const isLoggedIn = localStorage.getItem("token"); 

  return (
    <>
      {/* Show Header ONLY if user is NOT logged in */}
      {!isLoggedIn && <Header />}

      <div className="static-page">
        <h1>Help Center</h1>
        <p>
          Welcome to our Help Center. Here you will find answers to common issues  
          and guides on how to use our hotel booking application.
        </p>
      </div>

      {/* Show Footer ONLY if NOT logged in */}
      {!isLoggedIn && <Footer />}
    </>
  );
};

export default HelpUser;
