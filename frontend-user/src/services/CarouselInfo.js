import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { SlideData } from "../Cart/Services/SlideData";
import { Box } from "@chakra-ui/react";
//import "./styles.css";

import ImageSlider from "../Cart/Services/ImageSlider";

export default function CarouselInfo() {
  return (
    // <div>
    //   {/* <h1>Carousel in React</h1> */}
    //   <Carousel
    //     // showThumbs={true}
    //     // showStatus={false}
    //     infiniteLoop
    //     // emulateTouch
    //     // autoPlay
    //     useKeyboardArrows
    //     transitionTime={1000}
    //     // axis="vertical"
    //     // selectedItem={1}
    //     width="600px"
    //   >
      
    //     <div className="slide-holder">
    //       <img
    //         alt=""
    //         src="https://picsum.photos/id/237/200/300"
    //       />
    //       <div className="text-container">
            
    //         <h2><b>Review 1</b></h2>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
    //           enim ad minim veniam, quis nostrud exercitation ullamco laboris
    //           nisi ut aliquip ex ea commodo consequat.
    //         </p>
    //       </div>
    //     </div>
    //     <div className="slide-holder">
    //       <img
    //         alt=""
    //         src="https://picsum.photos/id/237/200/300"
    //       />
    //       <div className="text-container">
    //         <h2><b>Review 2</b></h2>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
    //           enim ad minim veniam, quis nostrud exercitation ullamco laboris
    //           nisi ut aliquip ex ea commodo consequat.
    //         </p>
    //       </div>
    //     </div>
    //     <div className="slide-holder">
    //       <img
    //         alt=""
    //         src="https://picsum.photos/id/237/200/300"
    //       />
    //       <div className="text-container">
    //         <h2>Review 3</h2>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
    //           enim ad minim veniam, quis nostrud exercitation ullamco laboris
    //           nisi ut aliquip ex ea commodo consequat.
    //         </p>
    //       </div>
    //     </div>
    //   </Carousel>
    // </div>
    <Box w="100%" h={8} p={4} color="white" maxW="960px" mx="auto">
      <ImageSlider slides={SlideData} />
    </Box>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<CarouselInfo />, rootElement);