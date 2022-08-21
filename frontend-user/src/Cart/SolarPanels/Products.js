
/*
 * @author: Prachi Raval - B00883324
 *
 * This file has the Products page.
 */

import { ReactNode, useEffect } from "react";
import React, { useState, useContext } from "react";
import {
  Box,
  HStack,
  Wrap,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  WrapItem,
  useColorModeValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import Product from "./Product";
import SolarServices from "../Services/SolarServices";
const Links = ["Cartmain", "ProductMain", ""];
export default function Products(props) {
  const [panels, setPanels] = useState([]);
  const [gadgets, setgadgets] = useState([]);
  const [offers, setOffers] = useState([]);
  const offerColor = useColorModeValue("orange.700", "white");
  useEffect(() => {
    fetch("https://solarx-backend.herokuapp.com/panels")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPanels(result);
      });
    fetch("https://solarx-backend.herokuapp.com/gadgets")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setgadgets(result);
      });
    fetch("https://solarx-backend.herokuapp.com/getOffers")
      .then((response) => response.json())
      .then((result) => {
        setOffers(result);
      });
  }, []);

  return (
    <>
      {offers && (
        <Marquee speed={"80"}>
          <Flex m="1em">
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <Text mx="30" fontSize="lg" color={offerColor} fontWeight="bold">
              {offers.offerDescription}
            </Text>
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
          </Flex>
        </Marquee>
      )}
      <Tabs isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab bg={"grey.300"}>Panels</Tab>
          <Tab bg={"grey.300"}>Solar Services</Tab>
          <Tab bg={"grey.300"}>Solar Gadgets</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack
              style={{
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Wrap spacing="20px" justify="center">
                {panels.map((item) => (
                  <Box>
                    <Product
                      description={item.description}
                      typeOfPanel={item.name}
                      price={item.price}
                      id={item.id}
                      image={item.url}
                    />
                  </Box>
                ))}
              </Wrap>
            </HStack>
          </TabPanel>
          <TabPanel>
            <SolarServices></SolarServices>
          </TabPanel>

          <TabPanel>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                fontSize: "x-small",
              }}
            >
              <Wrap spacing="40px" justify="center">
                {gadgets.map((item) => (
                  <Box>
                    <Product
                      typeOfPanel={item.name}
                      price={item.price}
                      id={item.id}
                      image={item.url}
                      description={item.description}
                    />
                  </Box>
                ))}
              </Wrap>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
