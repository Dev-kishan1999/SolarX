import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

function SliderMarkFunction() {
  const [sliderValue, setSliderValue] = useState(500);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Box pt={6} pb={2}>
      <Slider
        aria-label="slider-ex-6"
        onChange={(val) => setSliderValue(val)}
        defaultValue={500}
        min={0}
        max={1000}
        step={10}
      >
        <SliderMark value={250} {...labelStyles}>
          250$
        </SliderMark>
        <SliderMark value={500} {...labelStyles}>
          500$
        </SliderMark>
        <SliderMark value={750} {...labelStyles}>
          750$
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {sliderValue}$
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
export default SliderMarkFunction;
