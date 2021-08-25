import React from "react";
import EventsCarousel from "../events/EventsCarousel";
import Footer from "../footer/Footer";

function Events() {
  return (
    <div>
      <h1 className="EventsPageHeading">Upcoming Events:</h1>
      <div className="eventsCarousel">
        <EventsCarousel />
      </div>
      <div className="eventsFooterContainer">
        <Footer />
      </div>
    </div>
  );
}

export default Events;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
