
/*
 * @author: Prachi Raval - B00883324
 *
 * This file has the Summary of orders, with total cost and taxes.
 */
import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "../SolarPanels/PriceTag";
import { ProductData } from "../Contexts/productContext";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../../views/Payment/Components/PaymentModal";
const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}$</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  const bgButton = mode(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const { data, setData } = useContext(ProductData);
  const [isOpen, setIsOpen] = useState(false);
  console.log(data);
  const checkoutCart = () => {
    console.log(data);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  let tots = 0;
  for (let i = 0; i < data.length; i++) {
    tots = tots + data[i].price * data[i].quantity;
  }
  console.log(tots);
  var totalCheckoutAmount = formatPrice(tots + (tots * 15) / 100);

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={tots} />
        <OrderSummaryItem label="Shipping + Tax">
          <Text>{(tots * 15) / 100}$</Text>
        </OrderSummaryItem>

        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(tots + (tots * 15) / 100)}
          </Text>
        </Flex>
      </Stack>
      <Button
        bg={bgButton}
        color="white"
        _hover={{
          bg: "grey.900",
        }}
        _active={{
          bg: { bgButton },
        }}
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={checkoutCart}
      >
        Checkout
      </Button>
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        cartData={data}
        totalCheckoutAmount={totalCheckoutAmount}
      />
    </Stack>
  );
};
