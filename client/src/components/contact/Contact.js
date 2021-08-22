import React, { useState } from "react";
import emailjs from "emailjs-com";
import BackgroundImage from "../../images/contactPageBackground.jpg";

function Contact() {
  /* Setting state. */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameInput = (e) => {
    const userName = e.target.value;
    setName(userName);
    console.log(name);
  };

  const emailInput = (e) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
    console.log(email);
  };

  const messageInput = (e) => {
    const userMessage = e.target.value;
    setMessage(userMessage);
    console.log(message);
  };

  function sendUserMessage(e) {
    e.preventDefault();

    if ((name, email, message)) {
      emailjs
        .sendForm(
          "service_3u7kea7",
          "template_406j9cl",
          e.target,
          "user_lcBhGUvCdjtqvzgwlUtRo"
        )
        .then(
          (result) => {
            console.log("The result is: " + result.text);
          },
          (error) => {
            console.log("The error is: " + error.text);
          }
        );
      e.target.reset();
      alert("Thank you for contacting us, we will reply to you shortly.");
    } else {
      alert("Please fill in all fields before submitting the form.");
    }
  }

  return (
    <div className="mainContactContainer">
      <img src={BackgroundImage} alt="" className="contactPageImage" />
      <div className="container">
        <form onSubmit={sendUserMessage}>
          <div>
            <h1 className="contactPageHeading">
              Let us know how we can help...
            </h1>
            <div>
              <input
                type="text"
                placeholder="Enter your name:"
                name="name"
                className="contactNameInput"
                onChange={nameInput}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter your email address:"
                name="email"
                className="contactEmailInput"
                onChange={emailInput}
              />
            </div>
            <div>
              <textarea
                name=""
                id=""
                cols="10"
                rows="10"
                placeholder="Let us know what you think of our products...."
                name="message"
                className="contactMessageArea"
                onChange={messageInput}
              ></textarea>
            </div>
            <div>
              <input
                type="submit"
                value="Send Message"
                className="contactSubmitButton"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

/* Resources used:
==================
Resource 1:
===========
YouTube video:
Title of video: How to send emails using React through EmailJs
Published by: RemyFamily
Date published: Jul 24, 2020
Link to video: https://www.youtube.com/watch?v=NgWGllOjkbs
===============================================================

Resource 2:
===========
Emailjs.com documentation:
Link to article: https://www.emailjs.com/docs/examples/reactjs/
===============================================================
*/
