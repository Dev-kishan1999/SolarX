import React, { useEffect, useState } from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
// Custom components
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { FaCommentsDollar } from "react-icons/fa";
function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [toastComponent, setToastComponent] = useState({
    action: "",
    showToast: false,
    message: "",
  });
  function showToast(action, message) {
    console.log('here')
    toastComponent.action = action;
    toastComponent.showToast = true;
    toastComponent.message = message;
    setToastComponent({
      ...toastComponent,
    });
    setTimeout(function () {
      toastComponent.action = "";
      toastComponent.showToast = false;
      toastComponent.message = "";
      setToastComponent({
        ...toastComponent,
      });
    }, 3000);
  }

  function validateForm() {
    console.log("here 2..")
    if (!email || !password) {
      showToast("error", "Please Enter all the details.");
      return false;
    }
    var emailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (email.match(emailRgx) === null) {
      showToast("error", "Invalid Email");
      return false;
    }
    return true;
  }

  const submitHandler = () => {
    console.log("Login started...");
    console.log(validateForm())
    if (validateForm()) {
          fetch("https://solarx-backend.herokuapp.com/admin-login", { //https://solarx-backend.herokuapp.com/admin-login
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
           body: JSON.stringify({
            email,
            password,
          }),
      })
        .then((response) => response.json())
        .then((result) => {
               localStorage.setItem("email", email);
               history.push("/admin/dashboard");
        }); 
    }
  };

  return (
    <div style={{ margin: "autos !important", marginLeft: "35vw" }}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          {toastComponent.showToast && (
            <Alert status={toastComponent.action} variant="subtle">
              <AlertIcon />
              {toastComponent.message}
            </Alert>
          )}
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? MdOutlineRemoveRedEye : RiEyeCloseLine}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={() => submitHandler()}
            >
              Sign In
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </div>
  );
}

export default SignIn;
