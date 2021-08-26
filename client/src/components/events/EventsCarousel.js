/* Importing the libraries and images that I need */
import React from "react";
import { Carousel } from "react-carousel-minimal";
import slider1 from "../events/images/slider1.jpg";
import slider2 from "../events/images/slider2.jpg";
import slider3 from "../events/images/slider3.jpg";
import slider4 from "../events/images/slider4.jpg";
import slider5 from "../events/images/slider5.jpg";
import slider6 from "../events/images/slider6.jpg";

function EventsCarousel() {
  /* Creating an array that stores the images that will be used in the carousel and I am string the
     caption for each image which will be displayed at the bottom of the image on the carousel */
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

  /* Creating a style variable for the captions which I will be using in the carousel */
  const captionStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
  };

  /* Creating the structure of the carousel */
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* Pulling in the carousel component and I am using the values that I need in order to display the carousel
              in the way that I would like it to display */}
          <Carousel
            data={carouselImages}
            time={4000}
            width="100%"
            height="600px"
            captionStyle={captionStyle}
            radius="10px"
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* Exporting the component */
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
