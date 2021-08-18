import React from "react";
import HomeCarousel from "./carousel/Carousel";

function Home() {
  return (
    <div className="mainHomeContainer">
      <div className="subHomeContainer">
        <h1>Welcome to Ripe Harvest</h1>
        <h4>
          Providing real health by supplying whole foods that are packed with
          goodness and nutrients
        </h4>
      </div>
      <div className="homeImageContainer">
        <HomeCarousel />
      </div>
    </div>
  );
}

export default Home;
