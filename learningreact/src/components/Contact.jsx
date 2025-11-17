import React from "react";
import '../assets/styles/contact.css';

function ContactFooter() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "6a0b9099-cd8e-491e-815d-99928aa6d251");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div>
      <div className="contact-form">

        <form onSubmit={onSubmit} className="formdata">
          <h3 className="header">Contact Form</h3>

          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
          />

          {/* FIXED — added name="phone" and proper validation */}
          <input
            type="text"
            name="phone"
            pattern="[6-9]{1}[0-9]{9}"
            required
            placeholder="Enter mobile number"
          />

          <textarea
            name="message"
            required
            placeholder="Enter your message"
          ></textarea>

          <button type="submit">Submit Form</button>
        </form>

      </div>

      <span>{result}</span>
    </div>
  );
}

export default ContactFooter;
