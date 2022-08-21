/**
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
* This file has been modified to remove the additional components which were not required by me at this point of time.
* I have reused the code and have modified the code to represent the transactions data and have also modified the css 
* to display mobile views as per my plan of the payments page.
*/
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../Card/Card.js";
import CardBody from "../../../Card/CardBody.js";
import TransactionRow from "./TransactionRow";
import React from "react";

const Transaction = ({ data }) => {
  const subTextColor = useColorModeValue("gray.400", "gray.300");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p="16px">
      <Flex justifyContent={{ sm: "center", lg: "space-between" }}>
        <Text
          align={{ sm: "center" }}
          fontSize="lg"
          color={textColor}
          fontWeight="bold"
        >
          {/* My Transactions */}
          Previous Payments
        </Text>
      </Flex>
      <CardBody maxHeight="500px" overflowY={{ sm: "scroll", lg: "scroll" }}>
        <Flex direction="column" w="100%">
          {data &&
            data.map((row) => {
              return (
                <TransactionRow
                  key={row.transaction_id}
                  date={row.date}
                  time={row.time}
                  name={row.name}
                  amount={row.amount}
                  logo={row.logo}
                />
              );
            })}
          {data.length === 0 && (
            <center>
              <Text
                mt="2%"
                fontSize={{ sm: "sm", md: "md", lg: "lg" }}
                color={subTextColor}
                fontWeight="semibold"
              >
                No Transactions found!
              </Text>
            </center>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Transaction;
