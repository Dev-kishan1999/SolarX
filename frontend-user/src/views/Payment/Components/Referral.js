/**
 * @author: Mayank Sareen - B00899565
 *
 * This component is developed for the refer a friend form. It vaidates the information entered.
 */
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Card from "../../../Card/Card.js";
import CardBody from "../../../Card/CardBody";
import { react, useState } from "react";

function Referral() {
  const textColor = useColorModeValue("gray.700", "white");
  const errorMessageColor = useColorModeValue("red.500", "white");

  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const [referralData, setReferralData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    errorMessages: { Name: "", Email: "", Phone: "" },
    isValid: false,
  });

  function handleReferralFormInputChange(event) {
    referralData.errorMessages[event.target.name] = "";
    setReferralData({
      ...referralData,
      [event.target.name]: event.target.value,
    });
  }
  function validateForm() {
    referralData.Name = referralData.Name.trim().split(/ +/).join(" ");
    referralData.Email = referralData.Email.trim().split(/ +/).join("");
    referralData.Phone = referralData.Phone.trim().split(/ +/).join("");

    if (referralData.Name === "") {
      referralData.errorMessages.Name = "Name is Required!";
    } else {
      referralData.errorMessages.Name = "";
    }
    if (referralData.Email === "") {
      referralData.errorMessages.Email = "Email is Required!";
    } else {
      var rgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
      if (referralData.Email.match(rgx) === null) {
        referralData.errorMessages.Email = "Email is Inavlid!";
      } else {
        referralData.errorMessages.Email = "";
      }
    }
    if (referralData.Phone === "") {
      referralData.errorMessages.Phone = "Phone is Required!";
    } else {
      var rgx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (rgx.test(referralData.Phone)) {
        referralData.Phone = referralData.Phone.replace(rgx, "($1) $2-$3");
      } else {
        referralData.errorMessages.Phone = "Phone Number is Inavlid!";
      }
    }
    setReferralData({
      ...referralData,
    });
  }
  function showSuccess() {
    setTimeout(function () {
      referralData.isValid = false;
      setReferralData({
        ...referralData,
      });
    }, 3000);
  }
  function submitForm() {
    validateForm();
    if (
      referralData.errorMessages.Name.length === 0 &&
      referralData.errorMessages.Email.length === 0 &&
      referralData.errorMessages.Phone.length === 0
    ) {
      referralData.isValid = true;
      setReferralData({
        ...referralData,
      });
      fetch("https://solarx-backend.herokuapp.com/add-referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: referralData["Email"],
          name: referralData["Name"],
          phone: referralData["Phone"].replace(/^(\+)|\D/g, "$1"),
          refmail: localStorage.getItem("email"),
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          showSuccess();
        });
    }
  }
  return (
    <>
      {referralData.isValid && (
        <Alert status="success" variant="subtle">
          <AlertIcon />
          Reference Successfull! You will get your reward once they join us!
        </Alert>
      )}
      <Card p="16px">
        <Flex align="center" w="100%" mb={{ lg: "10px" }}>
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Refer a friend!
          </Text>
        </Flex>
        <CardBody>
          <FormControl isRequired>
            {referralData.errorMessages.Name.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {referralData.isValid}
                {referralData.errorMessages.Name}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Name of your referral:
            </FormLabel>
            <Input
              name="Name"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="Enter your name"
              mb="12px"
              isInvalid={referralData.errorMessages.Name.length > 0}
              maxLength={30}
              value={referralData.Name}
              onChange={handleReferralFormInputChange}
            />
            {referralData.errorMessages.Email.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {referralData.errorMessages.Email}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Their Email:
            </FormLabel>
            <Input
              name="Email"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="email"
              placeholder="Enter your friend's Email"
              mb="12px"
              isInvalid={referralData.errorMessages.Email.length > 0}
              maxLength={30}
              value={referralData.Email}
              onChange={handleReferralFormInputChange}
            />
            {referralData.errorMessages.Phone.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {referralData.errorMessages.Phone}
              </Text>
            )}

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Phone:
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="+1" />
              <Input
                type="tel"
                name="Phone"
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                placeholder="Phone Number"
                mb="12px"
                maxLength={30}
                isInvalid={referralData.errorMessages.Phone.length > 0}
                value={referralData.Phone}
                onChange={handleReferralFormInputChange}
              />
            </InputGroup>
            {referralData.errorMessages.Phone.length > 0 && (
              <Flex>
                <Text color="grey" ms="4px" fontSize="sm">
                  Allowed formats: &nbsp;
                </Text>
                <Text color="orange" ms="4px" fontSize="sm">
                  <h3>&#x2022; 123 456 7890 </h3> <h3>&#x2022; 123-456-7890</h3>
                  <h3>&#x2022; 123.456.7890</h3>{" "}
                  <h3>&#x2022; (123) 456-7890</h3>
                </Text>
              </Flex>
            )}
            <Center>
              <Button
                onClick={submitForm}
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
                Refer
              </Button>
            </Center>
          </FormControl>
        </CardBody>
      </Card>
    </>
  );
}

export default Referral;
