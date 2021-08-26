/* Importing the libraries, component and image that I need */
import React, { useState } from "react";
import emailjs from "emailjs-com";
import BackgroundImage from "../../images/contactPageBackground2.jpg";
import Footer from "../footer/Footer";

function Contact() {
  /* Setting state. */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  /* Creating an event handler to capture the name that the user enters into the form */
  const nameInput = (e) => {
    const userName = e.target.value;
    /* Updating state */
    setName(userName);
  };

  /* Creating an event handler to capture the email that the user enters into the form */
  const emailInput = (e) => {
    const userEmail = e.target.value;
    /* Updating state */
    setEmail(userEmail);
  };

  /* Creating an event handler to capture the message that the user enters into the form */
  const messageInput = (e) => {
    const userMessage = e.target.value;
    /* Updating state */
    setMessage(userMessage);
  };

  function sendUserMessage(e) {
    e.preventDefault();

    /* Using an if statement to check that the user has filled in all fields in the form andthen to process the sending of the
       email using the emailjs library */
    if ((name, email, message)) {
      emailjs
        .sendForm(
          "service_3u7kea7",
          "template_406j9cl",
          e.target,
          "user_lcBhGUvCdjtqvzgwlUtRo"
        )
        .then(
          /* Logging the result to the console */
          (result) => {
            console.log("The result is: " + result.text);
          },
          /* Logging errors to the console */
          (error) => {
            console.log("The error is: " + error.text);
          }
        );
      /* Clearing the infomration that the user entered into the form after it has been submitted */
      e.target.reset();
      /* An alert thanking the user for contacting the Ripe Harvest company */
      alert("Thank you for contacting us, we will reply to you shortly.");
      /* If the user has not filled in all fields within the contact form, then an appropriate message will be shown
         prompting the user to fill in all fields within the form before trying to re-submit the form */
    } else {
      alert("Please fill in all fields before submitting the form.");
    }
  }

  return (
    /* Creating the structure of the web page */
    <div className="mainContactContainer">
      <img src={BackgroundImage} alt="" className="contactPageImage" />
      <div className="container">
        {/* Creating a form to allow the user to send an email to the Ripe Harvest team, for now the mail that is sent
            from the contact form is delivered to the owner's email address */}
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
      <div className="contactPageFooterContainer">
        {/* Pulling in the Footer component */}
        <Footer />
      </div>
    </div>
  );
}

/* Exporting the component */
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
