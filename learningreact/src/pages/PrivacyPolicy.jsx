// // PrivacyPolicy.jsx
// import React from "react";
// import Footer from "../components/Footer";
// import "../assets/styles/staticPages.css";

// const PrivacyPolicy = () => {
//   return (
//     <>
//     <div className="static-page">
//       <h1>Privacy Policy</h1>
//       <p>
//         We value your privacy. This page explains how we collect, use, and protect your personal information.
//       </p>
//       <p>
//         Your data is securely stored and never shared with third parties without your consent.
//       </p>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default PrivacyPolicy;

import React from "react";
import Header from "../components/Header"; // <-- Header added
import Footer from "../components/Footer";
import "../assets/styles/staticPages.css";

const PrivacyPolicy = () => {
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

export default PrivacyPolicy;

