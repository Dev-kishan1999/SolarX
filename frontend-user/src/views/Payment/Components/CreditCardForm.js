/**
 * @author: Mayank Sareen - B00899565
 *
 * This file has the card information form. It handles the form validations and also sends data to the credit card component.
 */
import {
  Grid,
  GridItem,
  Icon,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Center,
  Text,
  Alert,
  AlertIcon,
  Link,
  Divider,
  Stat,
  StatLabel,
  StatHelpText,
  Flex,
} from "@chakra-ui/react";
import BackgroundCard1 from "../../../assets/img/BackgroundCard1.png";
import Card from "../../../Card/Card";
import CardBody from "../../../Card/CardBody";
import { RiMastercardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  React,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import CreditCard from "../Components/CreditCard";
import Wallet from "./Wallet";
const CreditCardForm = forwardRef((props, ref) => {
  const submitForm = () => {
    validateForm();
    for (let i in accountHolderData) {
      if (i !== "errorMessages" && i !== "isValid" && i !== "isFormValid") {
        if (
          accountHolderData.errorMessages[i] &&
          accountHolderData.errorMessages[i].length !== 0
        ) {
          accountHolderData.isValid[i] = false;
        } else {
          accountHolderData.isValid[i] = true;
          if (props.isWallet && i === "amount") {
            localStorage.setItem(
              "cwb",
              parseInt(
                parseInt(localStorage.getItem("cwb")) +
                  parseInt(accountHolderData["amount"])
              )
            );
          }
        }
      }
      setAccountHolderData({
        ...accountHolderData,
      });
    }
    if (
      accountHolderData.isValid["name"] &&
      accountHolderData.isValid["amount"] &&
      accountHolderData.isValid["number"] &&
      accountHolderData.isValid["cvv"] &&
      accountHolderData.isValid["expires"]
    ) {
      accountHolderData.isFormValid = true;
      setAccountHolderData({
        ...accountHolderData,
      });
      if (props.isWallet) {
        fetch("https://solarx-backend.herokuapp.com/Add-to-Wallet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            cwb: localStorage.getItem("cwb"),
            amount: accountHolderData["amount"],
            name: "Money Added to Wallet",
            type: "1",
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            document.querySelector(".chakra-modal__close-btn").click();
            document.querySelector(".chakra-stat__help-text").innerHTML =
              "$ " + localStorage.getItem("cwb");
            window.location.reload();
          });
      } else {
        fetch("https://solarx-backend.herokuapp.com/Update-Transaction-Table", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            amount: accountHolderData["amount"],
          }),
        })
          .then((response) => response.json())
          .then((result) => {});
      }
      return true;
    }
    return false;
  };
  useImperativeHandle(ref, () => ({
    submitForm,
    showSuccess() {
      setTimeout(function () {
        accountHolderData.isFormValid = false;
        setAccountHolderData({
          ...accountHolderData,
        });
      }, 3000);
      return true;
    },
  }));
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const errorMessageColor = useColorModeValue("red.500", "white");
  const navigate = useNavigate();

  const [accountHolderData, setAccountHolderData] = useState({
    name: "",
    amount: "",
    number: "",
    cvv: "",
    expires: "",
    promoCode: "",
    errorMessages: {
      name: "",
      amount: "",
      number: "",
      cvv: "",
      expires: "",
      promoCode: "",
    },
    isValid: {
      name: "",
      amount: "",
      number: "",
      cvv: "",
      expires: "",
      promoCode: "",
    },
    isFormValid: false,
  });

  const errorLabels = {
    name: "Card Holder",
    amount: "Amount",
    number: "Card Number",
    cvv: "CVV",
    expires: "Card Expiry Date",
    promoCode: "Promo Code",
  };

  const [offers, setOffers] = useState();
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [showWalletErrorToast, setShowWalletErrorToast] = useState(false);

  useEffect(() => {
    fetch("https://solarx-backend.herokuapp.com/getOffers")
      .then((response) => response.json())
      .then((result) => {
        setOffers(result);
      });
    if (!props.isWallet) {
      accountHolderData.amount = props.cartAmount;
      setAccountHolderData({
        ...accountHolderData,
      });
    }
  }, []);

  function handleNumberChange(event) {
    accountHolderData.errorMessages[event.target.name] = "";
    const inputVal = event.target.value.replace(/ /g, "");
    let inputNumber = "";
    if (event.target.name === "number") {
      let inputNumbersOnly = inputVal.replace(/\D/g, "");
      if (inputNumbersOnly.length > 16) {
        inputNumbersOnly = inputNumbersOnly.substr(0, 16);
      }
      const splits = inputNumbersOnly.match(/.{1,4}/g);
      if (splits) {
        inputNumber = splits.join(" ");
      }
    } else if (event.target.name === "amount") {
      var rgx = /^[0-9]*\.?[0-9]*$/;
      inputNumber = inputVal.match(rgx).length > 0 ? inputVal : "";
    }
    setAccountHolderData({
      ...accountHolderData,
      [event.target.name]: inputNumber,
    });
  }

  function handleAccountFormChange(event) {
    accountHolderData.errorMessages[event.target.name] = "";
    setAccountHolderData({
      ...accountHolderData,
      [event.target.name]: event.target.value,
    });
  }

  function showWalletPaySuccess() {
    accountHolderData.isFormValid = true;
    setAccountHolderData({
      ...accountHolderData,
    });
    setTimeout(function () {
      accountHolderData.isFormValid = false;
      setAccountHolderData({
        ...accountHolderData,
      });
      navigate("/");
    }, 3000);
  }

  function showWalletError() {
    setShowWalletErrorToast(true);
    setTimeout(function () {
      setShowWalletErrorToast(false);
    }, 3000);
  }

  function handlePayWithWallet() {
    let amount = parseFloat(accountHolderData.amount);
    console.log(amount);
    let walletBalance = parseFloat(localStorage.getItem("cwb"));
    console.log(walletBalance);
    if (amount <= walletBalance) {
      let updatedBalance = walletBalance - amount;
      localStorage.setItem("cwb", updatedBalance);
      fetch("https://solarx-backend.herokuapp.com/Add-to-Wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          amount: accountHolderData["amount"],
          cwb: localStorage.getItem("cwb"),
          name: "Purchase Order",
          type: "2",
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("showSuccess");
          showWalletPaySuccess();
        });
    } else {
      showWalletError();
    }
  }

  function validateForm() {
    if (!props.isWallet) {
      accountHolderData.amount = props.cartAmount;
    }
    for (let i in accountHolderData) {
      if (i !== "errorMessages" && i !== "isValid" && i !== "isFormValid") {
        let userinput = accountHolderData[i];
        if (userinput) {
          accountHolderData[i] = userinput.trim().split(/ +/).join(" ");
        }
        if (i !== "promoCode" && accountHolderData[i] === "") {
          accountHolderData.errorMessages[i] = errorLabels[i] + " is Required!";
        } else {
          accountHolderData.errorMessages[i] = "";
          if (i === "amount") {
            if (accountHolderData[i] <= 0) {
              accountHolderData.errorMessages[i] =
                errorLabels[i] + " should be greater than zero!";
            } else if (accountHolderData[i] > 25000) {
              accountHolderData.errorMessages[i] =
                "A maximum of $25000 allowed in a transaction!";
            }
          } else if (i === "number") {
            let userinput = accountHolderData[i].trim().split(/ +/).join("");
            if (userinput.length < 16) {
              accountHolderData.errorMessages[i] =
                errorLabels[i] + " should have 16 digits!";
            }
          } else if (i === "expires") {
            let enteredYear = accountHolderData[i].split("-")[0];
            let enteredMonth = accountHolderData[i].split("-")[1];
            let todayYear = new Date().getFullYear().toString();
            let todayMonth = (new Date().getMonth() + 1).toString();
            if (todayMonth < 10) {
              todayMonth = "0" + todayMonth.toString();
            }
            if (
              (enteredYear < todayYear && enteredMonth < todayMonth) ||
              (enteredYear === todayYear && enteredMonth < todayMonth) ||
              (enteredMonth === todayMonth && enteredYear < todayYear)
            ) {
              accountHolderData.errorMessages[i] =
                errorLabels[i] + " cannot be less than Today's Date!";
            }
          } else if (i === "promoCode") {
            let userinput = accountHolderData[i].trim().split(/ +/).join("");
            if (userinput.length > 0) {
              if (offers.promocode !== accountHolderData.promoCode) {
                accountHolderData.errorMessages[i] =
                  "Invalid " + errorLabels[i] + "!";
              }
            }
          }
        }
      }
      setAccountHolderData({
        ...accountHolderData,
      });
    }
  }

  return (
    <>
      {accountHolderData.isFormValid && props.isWallet && (
        <Alert status="success" variant="subtle">
          <AlertIcon />
          Money Added to Wallet Successfully!
        </Alert>
      )}
      {accountHolderData.isFormValid && !props.isWallet && (
        <Alert mt="1%" status="success" variant="subtle">
          <AlertIcon />
          Transaction Successful!
        </Alert>
      )}
      {showWalletErrorToast && !props.isWallet && (
        <Alert mt="1%" status="error" variant="subtle">
          <AlertIcon />
          Insufficent funds in Wallet! Please Pay using Card.
        </Alert>
      )}
      {!props.isWallet && (
        <>
          <Grid
            pl="2%"
            pr="2%"
            mr={{ sm: "15px", lg: "0px" }}
            ml={{ sm: "15px", lg: "0px" }}
            mt={"10px"}
            templateColumns={{ sm: "1fr", lg: "1fr 1fr" }}
          >
            <GridItem mt="10px" mb="5px">
              {accountHolderData.errorMessages.amount.length > 0 && (
                <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                  {accountHolderData.errorMessages.amount}
                </Text>
              )}
              <Wallet
                label="Amount"
                amount={accountHolderData.amount}
                padding="0px"
                boxShadow="0px"
                fontSize="sm"
              />
            </GridItem>
            <GridItem ml={{ sm: "0px", lg: "10px" }}>
              {!isPromoApplied && (
                <>
                  {accountHolderData.errorMessages.promoCode.length > 0 && (
                    <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                      {accountHolderData.errorMessages.promoCode}
                    </Text>
                  )}
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Click to apply Promo Code:{" "}
                    {offers && (
                      <>
                        <Link
                          color="blue"
                          href="#"
                          onClick={() => {
                            if (!isPromoApplied) {
                              accountHolderData.promoCode = offers.promocode;
                              let amount = accountHolderData.amount;
                              console.log(amount);
                              amount = parseFloat(
                                parseFloat(amount) - 0.2 * parseFloat(amount)
                              );
                              console.log(amount);
                              accountHolderData.amount = amount;

                              setAccountHolderData({
                                ...accountHolderData,
                              });
                              console.log(accountHolderData);
                              setIsPromoApplied(true);
                            }
                          }}
                        >
                          ( {offers.promocode} ){" "}
                        </Link>
                      </>
                    )}
                  </FormLabel>
                  <Input
                    name="promoCode"
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    type="text"
                    isInvalid={
                      accountHolderData.errorMessages.promoCode.length > 0
                    }
                    placeholder="Enter Promo Code"
                    mb="12px"
                    maxLength={30}
                    value={accountHolderData.promoCode}
                    onChange={handleAccountFormChange}
                  />
                </>
              )}
              {isPromoApplied && (
                <center>
                  <Text mt="2%" mb="2%" color={"green"}>
                    Promocode applied!
                  </Text>
                  <Link
                    color="blue"
                    href="#"
                    onClick={() => {
                      accountHolderData.amount = props.cartAmount;
                      setIsPromoApplied(false);
                      setAccountHolderData({
                        ...accountHolderData,
                      });
                    }}
                  >
                    Remove
                  </Link>
                </center>
              )}
            </GridItem>
          </Grid>
          <Flex
            pl="2%"
            pr="2%"
            pt="2%"
            align="center"
            w="100%"
            mb={{ lg: "10px" }}
          >
            <Text fontSize="lg" fontWeight="bold">
              Payment Options:
            </Text>
          </Flex>
          <Grid
            pl="5%"
            pr="5%"
            mr={{ sm: "15px", lg: "0px" }}
            ml={{ sm: "15px", lg: "0px" }}
            mt={"10px"}
            templateColumns={{ sm: "1fr", lg: "1fr 1fr 1fr" }}
          >
            <GridItem mt="10px" mb="5px">
              <Flex align="center" w="100%" mb={{ lg: "10px" }}>
                <Text fontSize="lg" fontWeight="bold">
                  Pay from Wallet
                </Text>
              </Flex>
            </GridItem>
            <GridItem ml={{ sm: "0px", lg: "10px" }}>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto" mt={{ lg: "10px" }} w="40%">
                  <StatLabel
                    fontSize="lg"
                    color="gray.600"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Current Wallet Balance
                  </StatLabel>
                  <Flex>
                    <StatHelpText fontSize="md">
                      $ {localStorage.getItem("cwb")}
                    </StatHelpText>
                  </Flex>
                </Stat>
              </Flex>
            </GridItem>
            <GridItem ml={{ sm: "0px", lg: "10px" }}>
              <Button
                onClick={handlePayWithWallet}
                bg={bgButton}
                fontSize="10px"
                color="white"
                variant="outline"
                fontWeight="bold"
                h="45"
                mt="5px "
                mb="5px "
                _hover={{
                  bg: "grey.900",
                }}
                _active={{
                  bg: { bgButton },
                }}
              >
                Pay With Wallet
              </Button>
            </GridItem>
          </Grid>

          <Divider />
          <Divider />

          <Flex
            pt="2%"
            pl="5%"
            pr="5%"
            align="center"
            w="100%"
            mb={{ lg: "10px" }}
          >
            <Text fontSize="lg" fontWeight="bold">
              Pay with Card
            </Text>
          </Flex>
        </>
      )}
      <Grid
        mr={{ sm: "15px", lg: "0px" }}
        ml={{ sm: "15px", lg: "0px" }}
        mt={"10px"}
        templateColumns={{
          sm: "1fr",
          md: "1.2fr 1.8fr",
          lg: "1.2fr 1.8fr",
        }}
        templateRows="1fr"
      >
        <GridItem
          mt={props.isWallet ? { lg: "20%" } : { lg: "10%" }}
          mb={"10px"}
        >
          <center>
            <CreditCard
              backgroundImage={BackgroundCard1}
              accountData={accountHolderData}
              icon={
                <Icon
                  as={RiMastercardFill}
                  w="48px"
                  h="100%"
                  color="gray.400"
                />
              }
            />
          </center>
        </GridItem>
        <GridItem ml="10px" mt={{ sm: "10px" }}>
          {props.isWallet && (
            <>
              {accountHolderData.errorMessages.amount.length > 0 && (
                <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                  {accountHolderData.errorMessages.amount}
                </Text>
              )}
              <FormControl isRequired>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Amount
                </FormLabel>
                <Input
                  name="amount"
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="number"
                  mb="12px"
                  isInvalid={accountHolderData.errorMessages.amount.length > 0}
                  placeholder="Enter Amount"
                  value={accountHolderData.amount}
                  onChange={handleNumberChange}
                />
              </FormControl>
            </>
          )}

          <FormControl isRequired>
            {accountHolderData.errorMessages.name.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {accountHolderData.errorMessages.name}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Card Holder:
            </FormLabel>
            <Input
              name="name"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              isInvalid={accountHolderData.errorMessages.name.length > 0}
              placeholder="Enter your name"
              mb="12px"
              maxLength={30}
              value={accountHolderData.name}
              onChange={handleAccountFormChange}
            />
            {accountHolderData.errorMessages.number.length > 0 && (
              <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                {accountHolderData.errorMessages.number}
              </Text>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Card Number
            </FormLabel>
            <Input
              name="number"
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              mb="12px"
              isInvalid={accountHolderData.errorMessages.number.length > 0}
              placeholder="Card Number"
              value={accountHolderData.number}
              onChange={handleNumberChange}
            />
            <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr " }}>
              <GridItem>
                {accountHolderData.errorMessages.expires.length > 0 && (
                  <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                    {accountHolderData.errorMessages.expires}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Expires
                </FormLabel>
                <Input
                  name="expires"
                  fontSize="sm"
                  ms="4px"
                  isInvalid={accountHolderData.errorMessages.expires.length > 0}
                  borderRadius="15px"
                  type="month"
                  mb="12px"
                  value={accountHolderData.expires}
                  onChange={handleAccountFormChange}
                />
              </GridItem>
              <GridItem ml={{ sm: "0px", lg: "10px" }}>
                {accountHolderData.errorMessages.cvv.length > 0 && (
                  <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                    {accountHolderData.errorMessages.cvv}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  CVV
                </FormLabel>
                <Input
                  name="cvv"
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="password"
                  maxLength={3}
                  mb="12px"
                  isInvalid={accountHolderData.errorMessages.cvv.length > 0}
                  value={accountHolderData.cvv}
                  onChange={handleAccountFormChange}
                />
              </GridItem>
            </Grid>
            {props.isWallet && (
              <Center>
                <Button
                  onClick={submitForm}
                  bg={bgButton}
                  fontSize="10px"
                  color="white"
                  fontWeight="bold"
                  w="50%"
                  h="45"
                  mt="5px "
                  _hover={{
                    bg: "grey.900",
                  }}
                  _active={{
                    bg: { bgButton },
                  }}
                >
                  Add to Wallet
                </Button>
              </Center>
            )}
          </FormControl>
        </GridItem>
      </Grid>
    </>
  );
});

export default CreditCardForm;
