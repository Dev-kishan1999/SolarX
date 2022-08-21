/*
 * @author: Mayank Sareen - B00899565
 *
 * This file has the User Delivery Information form. It handles the form validations and also sends data to the profile page.
 */
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Center,
  Text,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import {
  React,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";

const DeliveryDetails = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    submitForm() {
      validateForm();
      for (let i in deliveryData) {
        if (i !== "errorMessages" && i !== "isValid") {
          if (
            deliveryData.errorMessages[i] &&
            deliveryData.errorMessages[i].length !== 0
          ) {
            deliveryData.isValid[i] = false;
          } else {
            deliveryData.isValid[i] = true;
          }
        }
        setDeliveryData({
          ...deliveryData,
        });
      }
      if (
        deliveryData.isValid["name"] &&
        deliveryData.isValid["apt"] &&
        deliveryData.isValid["phone"] &&
        deliveryData.isValid["street"] &&
        deliveryData.isValid["city"] &&
        deliveryData.isValid["pincode"]
      ) {
        let address =
          localStorage.getItem("apt") +
          " , " +
          localStorage.getItem("street") +
          " " +
          localStorage.getItem("city") +
          " , " +
          localStorage.getItem("pincode");
        console.log(address);
        localStorage.setItem("orderDeliveryAddress", address);
        return true;
      }
      return false;
    },
  }));

  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const errorMessageColor = useColorModeValue("red.500", "white");
  const [deliveryData, setDeliveryData] = useState({
    name: localStorage.getItem("name"),
    phone: localStorage.getItem("phone"),
    city: localStorage.getItem("city"),
    apt: localStorage.getItem("apt"),
    pincode: localStorage.getItem("pincode"),
    street: localStorage.getItem("street"),
    errorMessages: {
      name: "",
      phone: "",
      city: "",
      apt: "",
      pincode: "",
      street: "",
    },
    isValid: {
      name: "",
      phone: "",
      city: "",
      apt: "",
      pincode: "",
      street: "",
    },
  });

  const errorLabels = {
    name: "Name",
    apt: "Unit Number",
    phone: "Phone Number",
    street: "Street",
    city: "City",
    pincode: "Postal Code",
  };

  function handleFormChange(event) {
    deliveryData.errorMessages[event.target.name] = "";
    setDeliveryData({
      ...deliveryData,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    for (let i in deliveryData) {
      if (i !== "errorMessages" && i !== "isValid") {
        let userinput = deliveryData[i];
        if (userinput) {
          deliveryData[i] = userinput.trim().split(/ +/).join(" ");
        }
        if (deliveryData[i] === "") {
          deliveryData.errorMessages[i] = errorLabels[i] + " is Required!";
        } else {
          if (i === "name") {
            var rgx = /^[A-Za-z]+$/;
            if (deliveryData[i].match(rgx) === null) {
              deliveryData.errorMessages[i] =
                errorLabels[i] + " allows only letters!";
            } else {
              deliveryData.errorMessages[i] = "";
            }
          } else if (i === "phone") {
            var rgx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (rgx.test(deliveryData[i])) {
              deliveryData[i] = deliveryData[i].replace(rgx, "($1) $2-$3");
            } else {
              deliveryData.errorMessages[i] = errorLabels[i] + " is Invalid!";
            }
          } else {
            deliveryData.errorMessages[i] = "";
          }
        }
      }
      setDeliveryData({
        ...deliveryData,
      });
    }
  }

  return (
    <>
      <FormControl isRequired p={{ lg: "16px" }}>
        <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr " }}>
          <GridItem>
            {deliveryData.errorMessages.name.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {deliveryData.errorMessages.name}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Name:
            </FormLabel>
            <Input
              name="name"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              isInvalid={deliveryData.errorMessages.name.length > 0}
              placeholder="Enter your first Name"
              mb="12px"
              maxLength={30}
              value={deliveryData.name}
              onChange={handleFormChange}
            />
          </GridItem>
          <GridItem ml={{ lg: "10px" }}>
            {deliveryData.errorMessages.phone.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {deliveryData.errorMessages.phone}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Phone:
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="+1" />
              <Input
                type="tel"
                name="phone"
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                placeholder="Phone Number"
                mb="12px"
                maxLength={30}
                isInvalid={deliveryData.errorMessages.phone.length > 0}
                value={deliveryData.phone}
                onChange={handleFormChange}
              />
            </InputGroup>
          </GridItem>
        </Grid>
        <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr " }}>
          <GridItem>
            {deliveryData.errorMessages.street.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {deliveryData.errorMessages.street}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Street:
            </FormLabel>
            <Input
              name="street"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="Street"
              mb="12px"
              isInvalid={deliveryData.errorMessages.street.length > 0}
              maxLength={30}
              value={deliveryData.street}
              onChange={handleFormChange}
            />
          </GridItem>
          <GridItem ml={{ lg: "10px" }}>
            {deliveryData.errorMessages.city.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {deliveryData.errorMessages.city}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              City:
            </FormLabel>
            <Input
              name="city"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="City"
              mb="12px"
              isInvalid={deliveryData.errorMessages.city.length > 0}
              maxLength={30}
              value={deliveryData.city}
              onChange={handleFormChange}
            />
          </GridItem>
        </Grid>
        <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr " }}>
          <GridItem ml={{ lg: "10px" }}>
            {deliveryData.errorMessages.apt.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {deliveryData.errorMessages.apt}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Unit Number:
            </FormLabel>
            <Input
              name="apt"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              isInvalid={deliveryData.errorMessages.apt.length > 0}
              placeholder="Enter your last name"
              mb="12px"
              maxLength={30}
              value={deliveryData.apt}
              onChange={handleFormChange}
            />
          </GridItem>
          <GridItem ml={{ lg: "10px" }}>
            {deliveryData.errorMessages.pincode.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {deliveryData.errorMessages.pincode}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Postal Code:
            </FormLabel>
            <Input
              name="pincode"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="Postal Code"
              mb="12px"
              isInvalid={deliveryData.errorMessages.pincode.length > 0}
              maxLength={30}
              value={deliveryData.pincode}
              onChange={handleFormChange}
            />
          </GridItem>
        </Grid>
      </FormControl>
    </>
  );
});
export default DeliveryDetails;
