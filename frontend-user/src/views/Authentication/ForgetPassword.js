/*	
 * @author: Kavya Raval - B00903205
 *
 */
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// type ForgotPasswordFormInputs = {
//   email: string;
// };

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const clickHandler = () => {
    console.log("started.");
    fetch("https://solarx-backend.herokuapp.com/fp", {
      //https://solarx-backend.herokuapp.com/
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        npassword: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        toast({
          title: result.message,
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>

        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="npassword">
          <Input
            placeholder="new password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={bgButton}
            color="white"
            _hover={{
              bg: "grey.900",
            }}
            _active={{
              bg: { bgButton },
            }}
            onClick={() => clickHandler()}
          >
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ForgetPassword;
