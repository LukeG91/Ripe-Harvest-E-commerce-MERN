/* Importing the library and components that I need */
import React from "react";
import EventsCarousel from "../events/EventsCarousel";
import Footer from "../footer/Footer";

function Events() {
  /* Creating the structure of the web page */
  return (
    <div>
      <h1 className="EventsPageHeading">Upcoming Events:</h1>
      <div className="eventsCarousel">
        {/* Pulling in the 'EventsCarousel' component */}
        <EventsCarousel />
      </div>
      <div className="eventsFooterContainer">
        {/* Pulling in the 'Footer' component */}
        <Footer />
      </div>
    </div>
  );
}

/* Exporting the component */
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
