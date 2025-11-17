// Terms.jsx
import React from "react";
import Footer from "../components/Footer";
import "../assets/styles/staticPages.css";

const Terms = () => {
  return (
    <>
    <div className="static-page">
      <h1>Terms of Service</h1>
      <p>
        By using our hotel booking system, you agree to follow all guidelines and rules listed here.
      </p>
      <p>
        We reserve the right to update policies without prior notice.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default Terms;
