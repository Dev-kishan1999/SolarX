/*
 * @author: Prachi Raval - B00883324
 *
 * This file has the Main Cart Information.
 */


import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import "../App.css";

import { ProductData } from "../Contexts/productContext";
import { add } from "lodash";

export default function Cartmain(props) {
  const [jsonmap, setjsonmap] = useState("");

  const { data, setData } = useContext(ProductData);
  const [items, setItems] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    let addData = JSON.parse(localStorage.getItem("item" || "[]"));
    const ex2 = addData?.length || 0;
    console.log(localStorage.getItem("item"));

    // addData.push(data);
    // setData(addData);
    // setItems([...items]);
    setData(JSON.parse(localStorage.getItem("item")));

    if (ex2 === 0) {
      console.log("enpty");
      localStorage.setItem("item", JSON.stringify(data));
    } else {
      if (data.length > 1) {
        var result = data.filter((x) => x.id === data[data.length - 1].id);
        const ex3 = result?.length || 0;
        console.log(ex3);
        if (ex3 > 1) {
          setData(
            data
              .filter((someobject) => someobject.id === result[0].id)
              .forEach(
                (someobject) =>
                  (someobject.quantity =
                    someobject.quantity + data[data.length - 1].quantity)
              )
          );
        }

        // );

        setData(
          data.filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.id).indexOf(obj.id) == pos;
          })
        );

        console.log("no duplicate");

        localStorage.setItem("item", JSON.stringify(data));
        //}
      }
    }
    // setData(JSON.parse(localStorage.getItem("item") || "[]"));
    // setItems([...items]);
  }, []);

  function onClickDelete(id) {
    let remainingItems = data.filter((d) => d.id != id);
    console.log(remainingItems);
    setData(remainingItems);

    localStorage.setItem("item", JSON.stringify(remainingItems));
  }
  if (data.length < 1) {
    return (
      <div fontSize="6xl">
        <Flex direction="column" align="center" flex="20">
          <HStack mt="50" fontWeight="semibold">
            <p fontSize="6xl">No Items Added To Cart</p>
          </HStack>

          <Link to="/Products" color={mode("blue.500", "blue.200")}>
            Continue shopping
          </Link>
        </Flex>
      </div>
    );
  } else {
    return (
      <>
        <Box
          maxW={{
            base: "3xl",
            lg: "7xl",
          }}
          mx="auto"
          px={{
            base: "4",
            md: "8",
            lg: "12",
          }}
          py={{
            base: "6",
            md: "8",
            lg: "12",
          }}
        >
          <Stack
            direction={{
              base: "column",
              lg: "row",
            }}
            align={{
              lg: "flex-start",
            }}
            spacing={{
              base: "8",
              md: "16",
            }}
          >
            <Stack
              spacing={{
                base: "8",
                md: "10",
              }}
              flex="2"
            >
              <div>{props.message.input}</div>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Shopping Cart
              </Heading>
              <Stack spacing="6">
                {data.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    onDelete={onClickDelete}
                    {...item}
                  />
                ))}
              </Stack>
            </Stack>

            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary />
              <HStack mt="6" fontWeight="semibold">
                <p>or</p>

                <Link to="/Products" color={mode("blue.500", "blue.200")}>
                  Continue shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      </>
    );
  }
}
