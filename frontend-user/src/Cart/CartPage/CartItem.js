
/*
 * @author: Prachi Raval - B00883324
 *
 * This file has the Cart Card which is rendered.
 */
import {
  CloseButton,
  Flex,
  Link,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { PriceTag } from "../SolarPanels/PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import React, { useState, useContext, useEffect } from "react";
import { ProductData } from "../Contexts/productContext";
const QuantitySelect = (props) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};


export const CartItem = (props) => {
  // const [count, setCount] = useState(0);
  console.log(props);

  function onClickDelete() {
    console.log(props);

    props.onDelete(props.id);
  }

  const {
    name,
    description,
    quantity,
    url,
    currency,
    price,
    onChangeQuantity,
    // onClickDelete,
  } = props;
  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={name} description={description} image={url} />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        {quantity}
        {/* <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        /> */}
        <PriceTag price={price * quantity} currency={currency} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price * quantity} currency={currency} />
      </Flex>
    </Flex>
  );
};
