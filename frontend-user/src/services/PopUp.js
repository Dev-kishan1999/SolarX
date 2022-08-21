import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Portal,
} from "@chakra-ui/react";


import React from "react";

import { Box, Button } from "@chakra-ui/react";

function PopUp() {
  const initRef = React.useRef();
  return (
    <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button>DELETE
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>DELETE</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Box>Your appointment has been successfully deleted!</Box>
                <Button 
                  mt={4}
                  colorScheme="blue"
                  onClick={onClose}
                  ref={initRef}
               
                >
                  Close
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
    
  );
}

export default PopUp;
