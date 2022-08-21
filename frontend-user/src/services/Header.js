import { ReactNode } from "react";
import React, { useState } from "react";

// import Profile from "./Profile";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  Icon,
  chakra,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Wrap,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import New1 from "./New1";



const NavLink = ({ children }) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
     
        <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
         
          <Tab><b>Book a service</b></Tab>
      
        </TabList> 
          
          <TabPanels>
            <TabPanel>
            <New1/>
          </TabPanel>
        
        </TabPanels>
      </Tabs>
    </>
  );
}
