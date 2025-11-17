import React from "react";
import Footer from "../components/Footer";
import "../assets/styles/staticPages.css";

const FAQ = () => {
  return (
    <>
      <div className="static-page">
        <h1>Frequently Asked Questions (FAQ)</h1>

        <h3>1. How do I book a hotel?</h3>
        <p>You can browse hotels and click the book button to complete your booking.</p>

        <h3>2. Can I cancel my booking?</h3>
        <p>Yes. Cancellation depends on hotel policies.</p>

        <h3>3. How do I contact support?</h3>
        <p>Use the Contact Us page or email: support@hotelbooking.com</p>
      </div>

      <Footer />
    </>
  );
};

export default FAQ;
