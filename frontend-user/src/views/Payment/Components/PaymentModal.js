/**
 * @author: Mayank Sareen - B00899565
 */
import { React, useRef, useState } from "react";
import CreditCardForm from "./CreditCardForm.js";
import Card from "../../../Card/Card";
import {
  Text,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FiDollarSign } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import DeliveryDetails from "./DeliveryDetails.js";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose, cartData, totalCheckoutAmount }) => {
  const deliveryForm = useRef(null);
  const creditCardForm = useRef(null);
  const [totalCartAmount, setTotalCartAmount] = useState();
  const textColor = useColorModeValue("gray.700", "white");
  const subTextColor = useColorModeValue("gray.400", "gray.300");

  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const navigate = useNavigate();
  const steps = [
    {
      label: "Delivery Details",
      icon: TbTruckDelivery,
    },
    {
      label: "Payment Information",
      icon: FiDollarSign,
    },
  ];
  function handleNextClick(event) {
    if (
      event.target.innerText.toLowerCase().includes("proceed") &&
      deliveryForm.current.submitForm()
    ) {
      nextStep();
    } else if (
      event.target.innerText.toLowerCase().includes("make") &&
      creditCardForm.current.submitForm()
    ) {
      for (var index = 0; index < cartData.length - 1; index++) {
        const data = {
          userid: localStorage.getItem("email"),
          price: cartData[index + 1].price,
          quantity: cartData[index + 1].quantity,
          id: cartData[index + 1].id,
          deliveryAddress: localStorage.getItem("orderDeliveryAddress"),
        };
        fetch("https://solarx-backend.herokuapp.com/addOrders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {});
      }
      setTimeout(function () {
        onClose();
        navigate("/");
      }, 3000);
    }
  }

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent height="auto" maxW="1000px">
        <ModalHeader> Payments and Checkout</ModalHeader>
        <ModalCloseButton />
        <ModalBody pl="10px" p={{ sm: "2px", lg: "16px" }} pr={{ sm: "10px" }}>
          <Card p={"0px"}>
            <Flex flexDir="column" width="100%">
              <Steps activeStep={activeStep}>
                <Step label="Delivery Details" icon={TbTruckDelivery}>
                  <DeliveryDetails ref={deliveryForm} />
                </Step>
                <Step label="Payment Information" icon={FiDollarSign}>
                  <CreditCardForm
                    ref={creditCardForm}
                    cartAmount={totalCheckoutAmount.substring(1)}
                  />
                </Step>
              </Steps>
              <Flex width="100%" justify="center">
                {activeStep === steps.length - 1 && (
                  <Button
                    bg={bgButton}
                    isDisabled={activeStep === 0}
                    mr={4}
                    onClick={prevStep}
                    size="sm"
                    variant="ghost"
                    fontSize="10px"
                    color="white"
                    fontWeight="bold"
                    w="auto"
                    h="45"
                    _hover={{
                      bg: "grey.900",
                    }}
                    _active={{
                      bg: { bgButton },
                    }}
                  >
                    Change Delivery Details
                  </Button>
                )}

                <Button
                  bg={bgButton}
                  size="sm"
                  onClick={handleNextClick}
                  fontSize="10px"
                  color="white"
                  fontWeight="bold"
                  w="auto"
                  h="45"
                  _hover={{
                    bg: "grey.900",
                  }}
                  _active={{
                    bg: { bgButton },
                  }}
                >
                  {activeStep === steps.length - 1
                    ? "Make Payment"
                    : "Proceed to Pay"}
                </Button>
              </Flex>
            </Flex>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
