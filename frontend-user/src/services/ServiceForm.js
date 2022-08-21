import {
  Button,
  //Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Image,
  HStack,
  Box,
  useToast,
  Alert,
  AlertIcon,
  useColorModeValue,
  Text
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ServiceForm = () => {
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userid, setEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [toastComponent, setToastComponent] = useState({
    action: "",
    showToast: false,
    message: "",
  });
  function validateForm() {
    if (
      !name ||
      !userid ||
      !service ||
      !date ||
      !time 
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
    if (userid.match(emailRgx) === null) {
      showToast("error", "Invalid Email");
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
 
  const toast = useToast();

  const AppointmentHandler = () => {
    //console.log(validateForm())
    if (validateForm()) {
      fetch("https://solarx-backend.herokuapp.com/addAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userid,
          service,
          date,
          time
        }),
      })
      .then((response) => response.json())
      .then((result) => {
        // clearForm();
        // toast({
        //   title: "Form submitted successfully!!",
        //   status: "warning",
        //   duration: 9000,
        //   isClosable: true,
        // });
        if (result.message) {
          showToast("success", result.message);
          setTimeout(function () {
            navigate('/')
          }, 2000);
          
        }
     
      });
    }
  };
  const clearForm= ()=>{ 
    setName("");
    setEmail("");
    setService("");
    setDate("");
    setTime("");
  }
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Service Form</Heading>
          {toastComponent.showToast && (
              <Alert status={toastComponent.action} variant="subtle">
                <AlertIcon />
                {toastComponent.message}
              </Alert>
            )}

          <FormControl id="name" isRequired >
            <FormLabel>Name:</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
          </FormControl>

          <FormControl id="userid" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={userid} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          {/* <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl> */}

           <FormControl id="service" isRequired>
            <FormLabel> Service type:</FormLabel>
            <Input type="service" value={service} onChange={(e) => setService(e.target.value)} />
          </FormControl>
             <FormControl id="date" isRequired>
            <FormLabel>Pick appointment date:</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>

              <FormControl id="time" isRequired>
                 <FormLabel> Pick appointment time: </FormLabel>
                 <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                 {/* <Select placeholder="Select option" >
                  {/* // onChange={(e) => setTime(e.target.value)} > */}
                   {/* <option value="11 am"> 11 am</option>
                   <option value="1 pm">1 pm</option>
                   <option value="3 pm">3 pm</option>
                   <option value="5 pm">5 pm</option>
              </Select> */ }

        </FormControl>
          
            <Button
              variant={"solid"}
              bg={bgButton}
              color="white"
              fontWeight="bold"
              _hover={{
                bg: "grey.900",
              }}
              _active={{
                bg: { bgButton },
              }}
              onClick={() => AppointmentHandler()}
          
            >
              Submit
            </Button>
          </Stack>
        {/* </Stack> */}
      </Flex>
    
    </Stack>
  );
};


export default ServiceForm;
