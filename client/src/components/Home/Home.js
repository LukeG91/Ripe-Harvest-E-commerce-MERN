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
