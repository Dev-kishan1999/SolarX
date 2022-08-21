/*	
 * @author: Kavya Raval - B00903205
 *
 */
import {
  Button,
  //Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Image,
  Text,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastComponent, setToastComponent] = useState({
    action: "",
    showToast: false,
    message: "",
  });
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const navigate = useNavigate();
  function showToast(action, message) {
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

  const loginHandler = () => {
    fetch("https://solarx-backend.herokuapp.com/getcart?email=" + email)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("item", JSON.stringify(result));
      });
    if (validateForm()) {
      fetch("https://solarx-backend.herokuapp.com/login", {
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
          if (result.error) {
            showToast("error", result.error);
          } else {
            console.log(result);
            localStorage.setItem("token", result.user.token);
            localStorage.setItem("email", result.user.email);
            localStorage.setItem("name", result.user.name);
            localStorage.setItem("imgurl", result.user.imgurl);
            localStorage.setItem("phone", result.user.phone);
            localStorage.setItem("cwb", result.user.cwb);
            localStorage.setItem("apt", result.user.apt);
            localStorage.setItem("street", result.user.street);
            localStorage.setItem("city", result.user.city);
            localStorage.setItem("pincode", result.user.pincode);
            navigate("/");
          }
        });
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          {toastComponent.showToast && (
            <Alert status={toastComponent.action} variant="subtle">
              <AlertIcon />
              {toastComponent.message}
            </Alert>
          )}
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Stack direction={{ base: "column", sm: "row" }}>
                <Text>New here?</Text>
                <Link to="/register" style={{ color: "blue" }}>
                  Register here!
                </Link>
              </Stack>
              <Link to="/fp" style={{ color: "blue" }}>
                Forgot password?
              </Link>
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
              variant={"solid"}
              onClick={() => loginHandler()}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          width="100%"
          height="100vh"
          src={
            "https://americansentrysolar.com/wp-content/uploads/2020/09/Go-Live-With-Solar.jpg"
          }
        />
      </Flex>
    </Stack>
  );
};

export default Login;
