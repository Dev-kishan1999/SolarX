/*
 * @author: Mayank Sareen - B00899565
 *
Citation:
=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================
* Code modifications: 
* This code has been modified to display the rows in the my transaction table. I have modified the styles 
and have removed the additional components from the template to suffice my purpose.
*/
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function TransactionRow(props) {
  const textColor = useColorModeValue("gray.700", "white");
  const { name, date, time, logo, amount } = props;
  console.log(amount);
  return (
    <Flex my="1rem" justifyContent="space-between">
      <Flex alignItems="center">
        <Box
          me="12px"
          borderRadius="50%"
          color={
            amount[0] === "+"
              ? "green.400"
              : amount[0] === "-"
              ? "red.400"
              : "gray.400"
          }
          border="1px solid"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="35px"
          h="35px"
        >
          <Icon as={logo} />
        </Box>
        <Flex direction="column">
          <Text
            fontSize={{ sm: "md", md: "lg", lg: "md" }}
            color={textColor}
            fontWeight="bold"
          >
            {name}
          </Text>
          <Text
            fontSize={{ sm: "xs", md: "sm", lg: "xs" }}
            color="gray.400"
            fontWeight="semibold"
          >
            {date} : {time}
          </Text>
        </Flex>
      </Flex>
      <Box
        mr="10px"
        color={
          amount[0] === "+"
            ? "green.400"
            : amount[0] === "-"
            ? "red.400"
            : { textColor }
        }
      >
        <Text fontSize={{ sm: "md", md: "lg", lg: "md" }} fontWeight="bold">
          {amount}
        </Text>
      </Box>
    </Flex>
  );
}

export default TransactionRow;
