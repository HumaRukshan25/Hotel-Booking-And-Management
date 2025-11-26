// import React from "react";
// import "../assets/styles/contact.css";

// const ContactFooter = () => {
//   const [result, setResult] = React.useState("");

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setResult("Sending...");
//     const formData = new FormData(event.target);

//     // Your Web3Forms Access Key
//     formData.append("access_key", "6a0b9099-cd8e-491e-815d-99928aa6d251");

//     const response = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();

//     if (data.success) {
//       setResult("Form Submitted Successfully!");
//       event.target.reset();
//     } else {
//       setResult("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div className="contact-footer-wrapper">
//       <div className="contact-form">
//         <form onSubmit={onSubmit} className="formdata">
//           <h3 className="header">Contact Us</h3>

//           <input type="text" name="name" required placeholder="Enter your name" />
//           <input type="email" name="email" required placeholder="Enter your email" />
//           <input type="number" name="phone" required placeholder="Enter your phone number" />
//           <textarea name="message" required placeholder="Enter your message"></textarea>

//           <button type="submit">Submit</button>
//         </form>

//         <span className="result-message">{result}</span>
//       </div>
//     </div>
//   );
// };

// export default ContactFooter;


import React from "react";
import "../assets/styles/contact.css";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";


const ContactFooter = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "6a0b9099-cd8e-491e-815d-99928aa6d251");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully!");
      event.target.reset();
    } else {
      setResult("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <Header />   {/* ✅ Header added */}

      <div className="contact-footer-wrapper">
        <div className="contact-form">
          <form onSubmit={onSubmit} className="formdata">
            <h3>Contact Us</h3>

            <input type="text" name="name" required placeholder="Enter your name" />
            <input type="email" name="email" required placeholder="Enter your email" />
            <input type="number" name="phone" required placeholder="Enter your phone number" />
            <textarea name="message" required placeholder="Enter your message"></textarea>

            <button type="submit">Submit</button>
          </form>

          <span className="result-message">{result}</span>
        </div>
      </div>

      <Footer />   {/* ✅ Footer added */}
    </>
  );
};

export default ContactFooter;
