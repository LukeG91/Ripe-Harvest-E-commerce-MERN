import React from "react";
import { Carousel } from "react-carousel-minimal";
import slider1 from "./testimonial-Images/Testimonial-1.jpg";
import slider2 from "./testimonial-Images/Testimonial-2.jpg";
import slider3 from "./testimonial-Images/Testimonial-3.jpg";
import slider4 from "./testimonial-Images/Testimonial-4.jpg";

function AboutCarousel() {
  const carouselImages = [
    {
      image: slider1,
      caption:
        "The products are amazing, they always have stock and the food tastes amazing!",
    },
    {
      image: slider2,
      caption:
        "I am so happy with the service received from Ripe Harvest, they are friendly and very helpful!",
    },
    {
      image: slider4,
      caption:
        "I love this business, I reccomend it to all my friends and family, and I love the website, it works well and it is very well layed out, I am a huge fan of Ripe Harvest!",
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
            height="450px"
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
