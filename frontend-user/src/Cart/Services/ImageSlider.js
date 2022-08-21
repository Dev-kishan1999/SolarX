import {
  Button,
  Image,
  Text,
  Box,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({ slides }) => {
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const navigate = useNavigate();
  return (
    <>
      <center>
        <Button
          bg={bgButton}
          color="white"
          _hover={{
            bg: "grey.900",
          }}
          _active={{
            bg: { bgButton },
          }}
          alignItems={"center"}
          borderRadius="md"
          px={4}
          w={"70%"}
          h={8}
          onClick={() => {
            navigate("/appointment");
          }}
        >
          Book a Service
        </Button>
      </center>
      <h1>""</h1>
      {/* <ThemeButton /> */}
      <Carousel autoPlay infiniteLoop interval={2000}>
        {slides.map((slide) => {
          return (
            <>
              <Container centerContent>
                <Text color={"blue.800"}>{slide.Name}</Text>
              </Container>

              <Image src={slide.image} height="530px" width="800px" />
            </>
          );
        })}
      </Carousel>
    </>
  );
};

export default ImageSlider;
