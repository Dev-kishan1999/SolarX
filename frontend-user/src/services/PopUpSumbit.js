import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverCloseButton,
    Portal,
  } from "@chakra-ui/react";
  
  import React from "react";
  
  import { Box, Button } from "@chakra-ui/react";
  
  function PopUpSubmit() {
    const initRef = React.useRef();
    return (
      <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <Button colorScheme={'blue'} variant={'solid'}>SUBMIT
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
              <PopoverCloseButton />
                <PopoverBody>
                  <Box>Your response has been submitted successfully!</Box>
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
  
  export default PopUpSubmit;
  