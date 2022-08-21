import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  ThemeProvider,
  Icon,
  CSSReset,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import tablesTableData from "./General";
import Rating from "./Rating";
import { StarIcon } from "@chakra-ui/icons";
import {
  MdOutlineError,
  MdCancel,
  MdCheckCircle,
  MdSync,
} from "react-icons/md";

export const TablesTableRow = (props) => {
  const { id, logo, name, email, total, status, date, pid } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const [delivered, setDelivered] = useState();
  function peformAction(statusOfOrder) {
    if (statusOfOrder === "pending") {
      console.log(statusOfOrder);

      const data = {
        orderid: id,
        status: "cancelled",
      };
      fetch("https://solarx-backend.herokuapp.com/cancelOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          window.location.reload();
        });
    } else if (statusOfOrder === "delivered");
    {
      // alert("invoice downloading");
      console.log("invoice downloading");
    }

    const utc = Date.now();
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    console.log(d);
  }

  return (
    <Tr p="10px">
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="50%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {id}
            </Text>
            <Text
              bg={"grey"}
              color={"black"}
              fontSize="sm"
              p="3px 10px"
              borderRadius="8px"
              variant="no-hover"
            >
              Product : {name}
            </Text>
            {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text> */}
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold"></Text>
          {total}$
          <Text fontSize="sm" color="gray.400" fontWeight="normal"></Text>
        </Flex>
      </Td>
      <Td>
        <Flex align="center">
          <Icon
            w="24px"
            h="24px"
            me="5px"
            color={
              status === "delivered"
                ? "green.500"
                : status === "cancelled"
                ? "grey.500"
                : status === "pending"
                ? "orange.500"
                : null
            }
            as={
              status === "delivered"
                ? MdCheckCircle
                : status === "cancelled"
                ? MdCancel
                : status === "pending"
                ? MdSync
                : null
            }
          />

          <Text color={textColor} fontSize="sm" fontWeight="700">
            {status}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
      <Td>
        <Rating
          size={35}
          icon={<StarIcon />}
          scale={5}
          fillColor="gold"
          strokeColor="grey"
          pid={pid}
        />
      </Td>
      <Td>
        <Button
          bg={
            status === "delivered"
              ? "green.300"
              : status === "cancelled"
              ? "grey"
              : "red"
          }
          color={status === "pending" ? "white" : "black"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
          variant="no-hover"
          onClick={() => peformAction(status)}
        >
          <Text
            fontSize="md"
            color="white.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {status === "delivered"
              ? " Download Invoice"
              : status === "pending"
              ? "Cancel"
              : status === "cancelled"
              ? "Cancelled"
              : null}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
};
