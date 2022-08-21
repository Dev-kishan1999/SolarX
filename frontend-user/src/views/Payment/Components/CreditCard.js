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
* This file has been modified completely based on my use case. The original code just has the image of the card. I have 
extended this code base to update the card with the data by passing in the object into this component with the user inputs.
* Additionally, I have also modified the styling in this file to handle mobile views as per my plan of the application.
*/
import { Box, Flex, Spacer, Text, Icon } from "@chakra-ui/react";
import Card from "../../../Card/Card.js";
import CardBody from "../../../Card/CardBody.js";
import React from "react";
import { FaWifi } from "react-icons/fa";

const CreditCard = ({ backgroundImage, accountData, icon }) => {
  return (
    <Card
      backgroundImage={backgroundImage}
      backgroundRepeat="no-repeat"
      background="cover"
      bgPosition="10%"
      p="16px"
      mr={{ lg: "150px" }}
      m={{ sm: "8px", lg: "0px" }}
      mb={{ sm: "16px", lg: "16px" }}
      h={{ sm: "220px", xl: "60%" }}
      maxW={{ sm: "300px", md: "100%", lg: "100%", xl: "80%" }}
      gridArea={{ md: "1 / 1 / 2 / 3", xl: "1 / 1 / 2 / 3" }}
    >
      <CardBody h="100%" w="100%">
        <Flex
          direction="column"
          color="white"
          h="100%"
          p="0px 10px 20px 10px"
          w="100%"
        >
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold">
              <Icon as={FaWifi} mb="10px" size={"20px"} />
            </Text>
            {icon}
          </Flex>
          <Flex direction="column">
            <Box>
              <Flex direction="column" me="34px">
                <Text fontSize="xs">Card Number:</Text>
                {accountData.number.length > 0 ? (
                  <Text
                    align="left"
                    fontSize="sm"
                    letterSpacing="2px"
                    fontWeight="bold"
                  >
                    {accountData.number}
                  </Text>
                ) : (
                  <Text
                    align="left"
                    fontSize="sm"
                    letterSpacing="2px"
                    fontWeight="bold"
                  >
                    XXXX XXXX XXXX XXXX
                  </Text>
                )}
              </Flex>
            </Box>
          </Flex>
          <Spacer />
          <Flex direction="column">
            <Flex mt="14px">
              <Flex direction="column" me="34px">
                <Text fontSize="xs">Card Holder:</Text>
                <Text fontSize="xs" fontWeight="bold">
                  {accountData.name}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontSize="xs">Expires:</Text>
                <Text fontSize="xs" fontWeight="bold">
                  {accountData.expires}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CreditCard;
