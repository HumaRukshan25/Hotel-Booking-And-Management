import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/staticPages.css";

const TermsUser = () => {
  const isLoggedIn = localStorage.getItem("token"); // check login status

  return (
    <>
      {/* Show Header ONLY for not logged-in users */}
      {!isLoggedIn && <Header />}

      <div className="static-page">
        <h1>Terms of Service</h1>
        <p>
          By using our hotel booking system, you agree to follow all guidelines and rules listed here.
        </p>
        <p>
          We reserve the right to update policies without prior notice.
        </p>
      </div>

      {/* Show Footer ONLY for not logged-in users */}
      {!isLoggedIn && <Footer />}
    </>
  );
};

export default TermsUser;
