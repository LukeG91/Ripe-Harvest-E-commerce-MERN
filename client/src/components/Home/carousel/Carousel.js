/* Importing the library and images that I need */
import { Carousel } from "react-carousel-minimal";
import slider1 from "../../../images/fresh-fruit-bowl-slider.jpg";
import slider2 from "../../../images/fruit-and-muesli.jpg";
import slider3 from "../../../images/fresh-fruit-on-bread-slider.jpg";
import slider4 from "../../../images/berry-smoothies-slider.jpg";
import slider5 from "../../../images/apples-and-honey.jpg";
import slider6 from "../../../images/honey-and-mini-waffles.jpg";
import slider7 from "../../../images/honey-comb-slider.jpg";
import slider8 from "../../../images/pancakes-with-gooseberries.jpg";
import slider9 from "../../../images/queen-bee-slider.jpg";
import slider10 from "../../../images/fresh-fruit-with-madeira-cake.jpg";
import slider11 from "../../../images/fruit-and-croisant.jpg";

function HomeCarousel() {
  /* Creating an array that stores the images that will be used in the carousel and I am string the
     caption for each image which will be displayed at the bottom of the image on the carousel */
  const carouselImages = [
    {
      image: slider1,
      caption: "Fresh fruit bowl",
    },
    {
      image: slider2,
      caption: "Oats health bowl",
    },
    {
      image: slider3,
      caption: "Fresh fruit",
    },
    {
      image: slider4,
      caption: "Berry smoothies",
    },
    {
      image: slider5,
      caption: "Honey & fruit",
    },
    {
      image: slider6,
      caption: "Honey & waffles",
    },
    {
      image: slider7,
      caption: "Freshly harvested honey comb",
    },
    {
      image: slider8,
      caption: "Pancakes with honey & berries",
    },
    {
      image: slider9,
      caption: "Queen bee in nature",
    },
    {
      image: slider10,
      caption: "Fresh fruit with madeira cake",
    },
    {
      image: slider11,
      caption: "Fresh fruit with a croisant",
    },
  ];

  /* Creating a style variable for the captions which I will be using in the carousel */
  const captionStyle = {
    fontSize: "2em",
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
export default HomeCarousel;

/* Resources used:
   ===============
   Article:
   Title of article: Easy to use, responsive and customizable carousel component for React
   Published by: Cant find author name but this shows at the bottom of the article "Powered by React.js Examples"
   Date published: August 12 2021
   Link to article: https://reactjsexample.com/easy-to-use-responsive-and-customizable-carousel-component-for-react/
   =================================================================================================================
   */
