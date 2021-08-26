/* Importing the libraries and images that I need */
import React from "react";
import { Carousel } from "react-carousel-minimal";
import slider1 from "./testimonial-Images/Testimonial-1.jpg";
import slider2 from "./testimonial-Images/pexels-jorge-fakhouri-filho-2701660.jpg";
import slider3 from "./testimonial-Images/pexels-wendy-wei-1699159.jpg";

function AboutCarousel() {
  /* Creating an array that stores the images that will be used in the carousel and I am string the
     caption for each image which will be displayed at the bottom of the image on the carousel */
  const carouselImages = [
    {
      image: slider1,
      caption:
        "The products are amazing, they always have stock and the food tastes great!",
    },
    {
      image: slider2,
      caption:
        "I am so happy with the service received from Ripe Harvest, they are friendly and very helpful!",
    },
    {
      image: slider3,
      caption:
        "I love this business, I reccomend it to all my friends and family, and I love the website, it works well and it is very well layed out, I am a huge fan of Ripe Harvest!",
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
            height="450px"
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
export default AboutCarousel;

/* Resources used:
   ===============
   Article:
   Title of article: Easy to use, responsive and customizable carousel component for React
   Published by: Cant find author name but this shows at the bottom of the article "Powered by React.js Examples"
   Date published: August 12 2021
   Link to article: https://reactjsexample.com/easy-to-use-responsive-and-customizable-carousel-component-for-react/
   =================================================================================================================
   */
