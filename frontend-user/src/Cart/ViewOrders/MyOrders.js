
/*
 * @author: Prachi Raval - B00883324
 *
 * This file has user's past order.
 */
import { TablesTableRow } from "./TablesTableRow";
import { ReactNode, useEffect } from "react";
import React, { useState, useContext } from "react";
// Assets
import avatar1 from "../assets/img/avatars/avatar1.png";
import Card from "./card/Card";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const subTextColor = useColorModeValue("gray.400", "gray.300");
  useEffect(() => {
    const id = localStorage.getItem("email");
    fetch("https://solarx-backend.herokuapp.com/getOrders?userid=" + id)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setOrders(result);
      });
  }, []);

  return (
    <>
      <Center>
        <Card
          ml="5px"
          mr="5px"
          direction="column"
          w="100%"
          px="0px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
          alignContent="center"
        >
          <div
            style={{
              padding: "15px",
              width: "90%",
              alignContent: "center",
              justifyContent: "center",
              fontSize: "x-small",
            }}
          >
            <Table variant="simple" color={"black"} size="sm">
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th pl="0px" color="gray.400">
                    My Orders
                  </Th>
                  <Th color="gray.400">Order Total</Th>
                  <Th color="gray.400">Status</Th>
                  <Th color="gray.400">Order Date</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((myorder) => {
                    const ordate = myorder.date;
                    return (
                      <TablesTableRow
                        id={myorder.id}
                        logo={avatar1}
                        email={myorder.userid}
                        name={myorder.name}
                        total={myorder.amount}
                        status={myorder.status}
                        date={ordate}
                        pid={myorder.productid}
                      />
                    );
                  })}
                {!orders && (
                  <center>
                    <Text
                      mt="2%"
                      mb="2%"
                      fontSize={{ sm: "sm", md: "md", lg: "lg" }}
                      color={subTextColor}
                      fontWeight="semibold"
                    >
                      No Orders placed yet!
                    </Text>
                  </center>
                )}
              </Tbody>
            </Table>
          </div>
        </Card>
      </Center>
    </>
  );
}
