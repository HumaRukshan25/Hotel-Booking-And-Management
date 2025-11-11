
import React from "react";
import '../assets/styles/contact.css'

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
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
          <h3 className="header">Contact form</h3>

          <input type="text" name="name" required placeholder="enter the name" />
          <input type="email" name="email" required placeholder="enter the email" />
          <input type="number" pattern="[7-9]{2}-[0-9]{8}" required placeholder="enter number" />
          <textarea name="message" required placeholder="enter text to send"></textarea>

          <button type="submit">Submit Form</button>

        </form>
      </div>
      <span>{result}</span>

    </div>
  );
}

export default Contact;