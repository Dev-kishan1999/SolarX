// import "./styles.css";
import { Box } from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import { SlideData } from "./SlideData";

export default function SolarServices() {
  return (
    <Box w="100%" h={8} p={4} color="white" maxW="960px" mx="auto">
      <ImageSlider slides={SlideData} />
    </Box>
  );
}
