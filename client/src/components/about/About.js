/* Importing the library, components and images that I need */
import React from "react";
import ownerImage from "../about/images/ripe-harvest-owner.jpeg";
import Footer from "../footer/Footer";
import firstImage from "../about/images/sunrise.jpg";
import secondImage from "../about/images/walking.jpg";
import thirdImage from "../about/images/fruit.jpg";
import fourthImage from "../about/images/berries.jpg";
import AboutCarousel from "./AboutCarousel";

function About() {
  /* Creating the structure of the web page */
  return (
    <>
      <div className="aboutMainContainer">
        <h1 className="aboutMainHeading">
          The story of how Ripe Harvest began...
        </h1>
        <div className="aboutSubContainer">
          <p className="aboutParagraph">
            RipeHarvest began in young man’s Parent’s home in 2020, during the
            very infamous lockdown period, as a result of the COVID-19 pandemic.
            It has been a long- time dream of our founder Nick Glendining to
            start a business in his beloved area of Edgemead and to serve the
            people of the suburb and its surrounding areas with efficiency and
            dedication. He obtained a Civil Engineering qualification and worked
            in the construction industry for several years, he then resigned
            from his job just before lockdown.
            <br />
            <br />
            During the lockdown period he had time to think and pray about his
            future. He then decided to start his own company and began
            pioneering in the healthy foods industry. He has worked hard to
            achieve the high standards he has set for the company, where quality
            and dependability are paramount.
            <br />
            <br />
            The goal of our company is simply to become the number one provider
            of the products we provide at RipeHarvest, in the Cape Town region.
            Nick’s desire is to really make a mark within communities, by
            building great relationships with our highly valued customers and
            ensuring that they are always respected and honoured. He has always
            had a great passion for people and giving our very loyal clients
            what they desire with unrivalled service. We look forward to
            continuous growth and memorable relationships between our suppliers
            and customers that join with us on this incredibly exciting journey.{" "}
          </p>
          <img
            src={ownerImage}
            alt="Image of the owner"
            className="aboutOwnerImage"
          />
        </div>
      </div>
      {/* Creating a customer testimonial section and I am pulling in the 'AboutCarousel' component */}
      <div>
        <h2 className="customerTestimonialsHeading">Customer Testimonials:</h2>
        <AboutCarousel />
      </div>
      <div className="row bottomRow">
        <div className="column">
          <img src={firstImage} alt="" />
        </div>
        <div className="column">
          <img src={secondImage} alt="" />
        </div>
        <div className="column">
          <img src={thirdImage} alt="" />
        </div>
        <div className="column">
          <img src={fourthImage} alt="" />
        </div>
      </div>
      {/* Pulling in the Footer component */}
      <Footer />
    </>
  );
}

/* Exporting the component */
export default About;

/* Resources used:
   ===============
   Article:
   Title of article: Easy to use, responsive and customizable carousel component for React
   Published by: Cant find author name but this shows at the bottom of the article "Powered by React.js Examples"
   Date published: August 12 2021
   Link to article: https://reactjsexample.com/easy-to-use-responsive-and-customizable-carousel-component-for-react/
   =================================================================================================================
   */
