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
  HStack,
  Box,
  Text,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apt, setApt] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [imageName, setImageName] = useState();
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
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

  const postData = (event) => {
    console.log(event);
    let imgFile = event.target.files[0];

    if (imgFile && imgFile["type"].split("/")[0] === "image") {
      let imageName = imgFile.name;
      setImageName(imageName);
      const data = new FormData();
      data.append("file", imgFile);
      data.append("upload_preset", "solarx");
      data.append("cloud_name", "dpgs2ejiz");
      fetch("https://api.cloudinary.com/v1_1/dpgs2ejiz/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.url);
          localStorage.setItem("imgurl", url);
          setUrl(result.url);
        })
        .catch((err) => console.log("ERROR:", err));
    } else {
      showToast("error", "Incorrect Picture format");
    }
  };

  function validateForm() {
    if (
      !email ||
      !password ||
      !name ||
      !apt ||
      !street ||
      !city ||
      !pincode ||
      !phone ||
      !url
    ) {
      showToast("error", "Please Enter all the details.");
      return false;
    }
    var nameRgx = /^[A-Za-z0-9 A-Za-z0-9]+$/;
    if (name.match(nameRgx) === null) {
      showToast("error", "Name allows only letters and name like John 2!");
      return false;
    }
    var emailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (email.match(emailRgx) === null) {
      showToast("error", "Invalid Email");
      return false;
    }
    var phoneRgx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRgx.test(phone)) {
      showToast("error", "Invalid Phone number");
      return false;
    }
    return true;
  }

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

  const registerHandler = () => {
    if (validateForm()) {
      fetch("https://solarx-backend.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          apt,
          street,
          city,
          pincode,
          url,
          phone,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            showToast("error", result.error);
          } else if (result.message) {
            console.log(result);
            fetch(
              "https://solarx-backend.herokuapp.com/referral-registration",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                }),
              }
            )
              .then((response) => response.json())
              .then((result) => {
                if (result.success && result.isReferral) {
                  showToast("success", result.message);
                  setTimeout(function () {}, 1000);
                }
                navigate("/login");
              });
          }
        });
    }
  };
  return (
    <>
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
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>

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

            <HStack>
              <Box>
                <FormControl id="street" isRequired>
                  <FormLabel>Street</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="apt" isRequired>
                  <FormLabel>Apt</FormLabel>
                  <Input type="text" onChange={(e) => setApt(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>

            <HStack>
              <Box>
                <FormControl id="city" isRequired>
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="pincode" isRequired>
                  <FormLabel>Pincode</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input type="text" onChange={(e) => setPhone(e.target.value)} />
            </FormControl>
            <HStack>
              <FormControl>
                <FormLabel htmlFor="profile">
                  Profile Picture:
                  <br />
                  {!imageName && (
                    <>
                      <span style={{ color: "blue" }}>Add Profile Picture</span>
                      <span style={{ color: "red" }}> *</span>{" "}
                    </>
                  )}
                  {imageName && (
                    <>
                      {imageName}
                      <span style={{ float: "right", color: "blue" }}>
                        Change Picture
                      </span>
                    </>
                  )}
                </FormLabel>
                <Input
                  id="profile"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    postData(event);
                  }}
                />
              </FormControl>
            </HStack>

            <Stack spacing={6}>
              {/* <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link to='/fp' style={{'color':'blue'}}>Forgot password?</Link>
            </Stack> */}
              <Stack
                direction={{ base: "column", sm: "row" }}
                //   align={'start'}
                //   justify={'space-between'}
              >
                <Text>Already have an account?</Text>

                <Link to="/login" style={{ color: "blue" }}>
                  &nbsp;Login here.
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
                onClick={() => registerHandler()}
              >
                Register
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
              "https://www.latifehayson.com/wp-content/uploads/2019/10/california-solar-panel-law-2020-1024x538.jpg"
            }
          />
        </Flex>
      </Stack>
    </>
  );
};

export default Register;
