/* Importing the libraries and components that I need */
import React from "react";
import HomeCarousel from "./carousel/Carousel";
import Footer from "../footer/Footer";

/* Creating the structure of the Home page */
function Home() {
  return (
    <div className="mainHomeContainer">
      <div className="subHomeContainer">
        <h1 className="homePageMainHeading">Welcome to Ripe Harvest</h1>
        <h4 className="homePageSlogan">
          Providing real health by supplying whole foods that are packed with
          goodness and nutrients
        </h4>
      </div>
      {/* Pulling in the HomeCarousel which displays sliding images on an automatic rotation basis */}
      <div className="homeImageContainer">
        <HomeCarousel />
      </div>
      {/* Pulling in the Footer component */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

/* Exporting the component */
export default Home;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
