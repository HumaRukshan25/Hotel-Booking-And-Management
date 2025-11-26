import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/staticPages.css";

const FAQUser = () => {
  const isLoggedIn = localStorage.getItem("token"); // Check login status

  return (
    <>
      {/* Show Header only if user is NOT logged in */}
      {!isLoggedIn && <Header />}

      <div className="static-page">
        <h1>Frequently Asked Questions (FAQ)</h1>

        <h3>1. How do I book a hotel?</h3>
        <p>You can browse hotels and click the book button to complete your booking.</p>

        <h3>2. Can I cancel my booking?</h3>
        <p>Yes. Cancellation depends on hotel policies.</p>

        <h3>3. How do I contact support?</h3>
        <p>Use the Contact Us page or email: <a href="mailto:support@hotelbooking.com">support@hotelbooking.com</a></p>
      </div>

      {/* Show Footer only if user is NOT logged in */}
      {!isLoggedIn && <Footer />}
    </>
  );
};

export default FAQUser;
