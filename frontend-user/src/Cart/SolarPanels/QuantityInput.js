import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Products from "./Products";

function QuantityInput(props) {
  const getInputValue = (value) => {
    props.getQuanity({ value: value });
    // getInputProps.value = input.value;
  };
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 20,
      onChange: (valueAsString, valueAsNumber) => getInputValue(valueAsNumber),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="150px">
      <Button {...dec}>-</Button>
      <Input {...input} type="number" />
      <Button {...inc}>+</Button>
    </HStack>
  );
}
export default QuantityInput;
