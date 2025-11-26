// import React from "react";
// import Footer from "../components/Footer"; // <-- Import Footer
// import "../assets/styles/staticPages.css";

// const Help = () => {
//   return (
//     <>
//       <div className="static-page">
//         <h1>Help Center</h1>
//         <p>
//           Welcome to our Help Center. Here you will find answers to common issues and guides on how to use our hotel booking application.
//         </p>
//       </div>

//       <Footer />  {/* Footer will show below the help content */}
//     </>
//   );
// };

// export default Help;

import React from "react";
import Header from "../components/Header";   // <-- Header added
import Footer from "../components/Footer";
import "../assets/styles/staticPages.css";

const Help = () => {
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

export default Help;

