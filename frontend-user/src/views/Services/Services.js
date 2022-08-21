import React from "react";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader.js";
import { Text, useColorModeValue } from "@chakra-ui/react";

function Services() {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <>
      <Card p="20px">
        <CardHeader>
          <Text fontSize="lg" color="gray.700" fontWeight="bold">
            I am Payment Page! Welcome to SOLARX
          </Text>
        </CardHeader>
      </Card>
    </>
  );
}

export default Services;
