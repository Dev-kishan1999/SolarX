/**
 * @author: Mayank Sareen - B00899565
 *
 * This component is responsible for displaying the wallet of the user displaying the current balance.
 */
import {
  Box,
  Stat,
  Icon,
  StatLabel,
  Flex,
  Text,
  useColorModeValue,
  StatHelpText,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "../../../Card/Card.js";
import CardBody from "../../../Card/CardBody";
import React from "react";
import { FaWallet } from "react-icons/fa";
import CreditCardForm from "./CreditCardForm.js";

const Wallet = ({
  label,
  amount,
  title,
  padding = "16px",
  boxShadow = "0px 3.5px 5.5px rgb(0 0 0 / 2%)",
  fontSize = "md",
  addMoney = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const closeModal = () => {
    onClose();
  };
  return (
    <>
      {addMoney && (
        <>
          <Modal class="walletModal" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent height="auto" maxW="1000px">
              <ModalHeader>Add Money To Wallet</ModalHeader>
              <ModalCloseButton />
              <ModalBody
                m={{ sm: "0px" }}
                p={{ sm: "0px", lg: "0px" }}
                pr={{ sm: "5px" }}
              >
                <Card
                  pt={{ sm: "0px", lg: "0px" }}
                  p={{ sm: "0px", lg: "15px" }}
                  pr={{ sm: "0px", lg: "40px" }}
                >
                  <CreditCardForm isWallet closeModal />
                </Card>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
      <Card boxShadow={boxShadow} p={padding}>
        {title && (
          <Flex align="center" w="100%">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              {title}
            </Text>
          </Flex>
        )}
        {!addMoney && (
          <>
            <Box border="1px" borderRadius="10px" borderColor="gray.200">
              <CardBody px="14px">
                <Flex
                  flexDirection="row"
                  align="center"
                  justify="center"
                  w="100%"
                >
                  <Stat me="auto" mt={{ lg: "10px" }}>
                    <StatLabel
                      fontSize={fontSize}
                      color="orange.400"
                      fontWeight="bold"
                      pb=".1rem"
                    >
                      {label}
                    </StatLabel>
                    <Flex>
                      <StatHelpText fontSize="lg" color={textColor}>
                        $ {amount}
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <Icon as={FaWallet} w={10} h="auto" color={"darkblue"} />
                </Flex>
              </CardBody>
            </Box>
          </>
        )}
        {addMoney && (
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto" mt={{ lg: "10px" }}>
                <StatLabel
                  fontSize={fontSize}
                  color="orange.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  {label}
                </StatLabel>
                <Flex>
                  <StatHelpText fontSize="lg" color={textColor}>
                    $ {amount}
                  </StatHelpText>
                </Flex>
              </Stat>
              <Icon as={FaWallet} w={10} h="auto" color={"darkblue"} />
            </Flex>
          </CardBody>
        )}
        {addMoney && (
          <Center>
            <Button
              onClick={onOpen}
              bg={bgButton}
              fontSize="10px"
              color="white"
              fontWeight="bold"
              w="40%"
              h="35"
              _hover={{
                bg: "grey.900",
              }}
              _active={{
                bg: { bgButton },
              }}
            >
              Add Money
            </Button>
          </Center>
        )}
      </Card>
    </>
  );
};

export default Wallet;
