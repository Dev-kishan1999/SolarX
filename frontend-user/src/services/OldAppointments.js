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
import { FaPencilAlt } from "react-icons/fa";
import {UseState} from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const OldAppointments =({data1}) => {
  // const [data,setdata] = useState([]);
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  // const { customerName, email, serviceType, appDate } = props;
  const toast = useToast();
  const navigate= useNavigate();
  return (
   
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
              <b> Old appointments </b>
            </h1>
          </Text>
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
        
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Email address:{item.userid}
            <Text as="span" color="gray.500">
            
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Service Type:{item.service}
            <Text as="span" color="gray.500">
       
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Appointment date:{item.date}
            <Text as="span" color="gray.500">
       
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
            onClick={() => { navigate("/contactus")
            //   toast({
            //     title: "Thanks for giving review.",
            //     description: "",
            //     status: "success",
            //     duration: 9000,
            //     isClosable: true,
            //   });
            }}
          >
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
              <Link to="/contactus" style={{ color: "blue" }}>
              REVIEW
                </Link>
               
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

export default OldAppointments;
