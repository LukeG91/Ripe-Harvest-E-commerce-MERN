import React from "react";
import HomeCarousel from "./carousel/Carousel";
import Footer from "../footer/Footer";

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
      <div className="homeImageContainer">
        <HomeCarousel />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

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
