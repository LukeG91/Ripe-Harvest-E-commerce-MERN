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
