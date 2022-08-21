
/*
 * @author: Prachi Raval - B00883324
 *
 * This file has feedback front end modal
 */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Link,
  useDisclosure,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import FeedbackPage from "./FeedbackPage";

export default function FeedbackModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  function feedSend() {
    alert("feedback stored to database");
  }

  return (
    <>
      <Link
        onClick={onOpen}
        textAlign={useBreakpointValue({ base: "center", md: "left" })}
        fontFamily={"heading"}
        color={useColorModeValue("gray.800", "white")}
      >
        Feedback
      </Link>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ></ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <div width="100px">
              <FeedbackPage />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={feedSend}>
              Send
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
