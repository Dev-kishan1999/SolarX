import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  useColorModeValue,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { Box, Button } from "@chakra-ui/react";

function PopUp(props) {
  console.log(props);
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const initRef = React.useRef();
  return (
    <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button>More Info</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader fontWeight={"bold"}>{props.name}</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Box>{props.desc}</Box>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}

export default PopUp;
