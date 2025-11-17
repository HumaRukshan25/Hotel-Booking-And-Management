import React from "react";
import Footer from "../components/Footer"; // <-- Import Footer
import "../assets/styles/staticPages.css";

const Help = () => {
  return (
    <>
      <div className="static-page">
        <h1>Help Center</h1>
        <p>
          Welcome to our Help Center. Here you will find answers to common issues and guides on how to use our hotel booking application.
        </p>
      </div>

      <Footer />  {/* Footer will show below the help content */}
    </>
  );
};

export default Help;
