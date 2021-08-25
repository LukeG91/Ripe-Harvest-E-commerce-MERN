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

  const captionStyle = {
    fontSize: "2em",
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
