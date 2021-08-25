import React from "react";
import { Carousel } from "react-carousel-minimal";
import slider1 from "../events/images/slider1.jpg";
import slider2 from "../events/images/slider2.jpg";
import slider3 from "../events/images/slider3.jpg";
import slider4 from "../events/images/slider4.jpg";
import slider5 from "../events/images/slider5.jpg";
import slider6 from "../events/images/slider6.jpg";

function EventsCarousel() {
  const carouselImages = [
    {
      image: slider1,
      caption:
        "Oranjezicht night market Saturday the 28th of August: 6pm - 10pm",
    },
    {
      image: slider6,
      caption:
        "V&A Waterfront fresh produce market Saturday the 4th of September: 10am - 6pm",
    },
    {
      image: slider5,
      caption: "Old biscuit mill Saturday the 11th of September: 10am - 10pm",
    },
  ];

  const captionStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <Carousel
            data={carouselImages}
            time={4000}
            width="100%"
            height="600px"
            captionStyle={captionStyle}
            radius="10px"
            // slideNumber={true}
            // slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            // thumbnails={true}
            // thumbnailWidth="100px"
            style={{
              textAlign: "center",
              //   maxWidth: "850px",
              //   maxHeight: "500px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EventsCarousel;

/* Resources used:
   ===============
   Article:
   Title of article: Easy to use, responsive and customizable carousel component for React
   Published by: Cant find author name but this shows at the bottom of the article "Powered by React.js Examples"
   Date published: August 12 2021
   Link to article: https://reactjsexample.com/easy-to-use-responsive-and-customizable-carousel-component-for-react/
   =================================================================================================================
   */
