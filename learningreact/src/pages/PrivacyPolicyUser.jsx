import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/staticPages.css";

const PrivacyPolicyUser = () => {
  const isLoggedIn = localStorage.getItem("token"); // check login status

  return (
    <>
      {/* Show Header ONLY for not logged-in users */}
      {!isLoggedIn && <Header />}

      <div className="static-page">
        <h1>Privacy Policy</h1>
        <p>
          We value your privacy. This page explains how we collect, use, and protect your personal information.
        </p>
        <p>
          Your data is securely stored and never shared with third parties without your consent.
        </p>
      </div>

      {/* Show Footer ONLY for not logged-in users */}
      {!isLoggedIn && <Footer />}
    </>
  );
};
export default PrivacyPolicyUser;
