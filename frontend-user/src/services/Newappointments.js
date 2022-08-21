import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import PopUp from "./PopUp";
import { useEffect} from "react";

// function Newappointments(props) {
  const Newappointments  = ({data1}) => {
  
    // const [name, setName] = useState("");
    // const [userid, setEmail] = useState("");
    // const [service, setService] = useState("");
    // const [date, setDate] = useState("");
    // const [time, setTime] = useState("");
    const [data,setdata] = useState([]);
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("#F8F9FA", "gray.800");
    const nameColor = useColorModeValue("gray.500", "white");
    // // const { customerName, email, serviceType, appInfo } = props;
    const toast = useToast();
  
  
  
    // {data.map((item, index) => {
    //   return (
    //     console.log(item.userid)
    //   );
    // })}

    const DeleteAppointment = () => {
      fetch(`https://solarx-backend.herokuapp.com/deleteAppointment/${localStorage.getItem('email')}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response=>response.json()).then((result)=>{
        console.log(result);
        toast({
        title: "Appointment canceled.",
        description: "Appointment deleted successfully.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      })
      
    }
  

  return(
   <div>
    {data1.map((item, index) => {
      return (
        <>

       <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
    
      <Flex
        direction={{ sm: "column", md: "row" }}
        align="flex-start"
        p={{ md: "24px" }}
        justify="space-between"
        w="100%"
      >
    
        <Flex direction="column" maxWidth="70%">
          <Text>
            {" "}
            <h1>
              <b> Upcoming appointments </b>
             
            </h1>
          </Text>
      
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {}
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Email address:{item.userid}
            <Text as="span" color="gray.500">
              {/* {userid} */}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Service Type:{item.service}
            <Text as="span" color="gray.500">
              {/* {service} */}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
           <b> Appointment date and time:</b>{item.date}, {item.time}
            <Text as="span" color="gray.500">
              {/* {appInfo} */}
            </Text>
          </Text>
        </Flex>

        <Flex
          direction={{ sm: "column", md: "row" }}
          align="flex-start"
          p={{ md: "24px" }}
        >
          <Button
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
        
            onClick={() => DeleteAppointment()}
          >
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                DELETE
              </Text>
              {/* <PopUp /> */}
            </Flex>
          </Button>
          <Button
            p="0px"
            bg="transparent"
            onClick={() => { 
              toast({
                title: "Are you sure?",
                description: "You are changing appointment.",
                status: "warning",
                duration: 9000,
                isClosable: true,
              });


            }}
          >
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                EDIT
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Box>
    </>
    );

  })}
  </div>
  );
 
}

export default Newappointments;
