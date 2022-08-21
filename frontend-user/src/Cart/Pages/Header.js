import { ReactNode } from "react";
import React, { useState, useContext } from "react";

import {
  Box,
  Flex,
  Avatar,
  HStack,
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
  Badge,
} from "@chakra-ui/react";
import Card from "../ViewOrders/card/Card";

import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import Product from "../SolarPanels/Product";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ProductData } from "../Contexts/productContext";
const Links = ["Home", "MyOrders", "Products"];
const Links1 = ["Cartmain"];

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
      to={"/" + children}
    >
      {children}
    </Link>
  );
};

const CartLink = ({ children }) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={"/" + children}
    >
      <Badge variant="solid" colorScheme="green">
        3
      </Badge>
      <chakra.a display={"flex"}>
        <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
      </chakra.a>
    </Link>
  );
};

export default function Header(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <Avatar
                  size={"sm"}
                  src={
                    "https://cdn.vectorstock.com/i/1000x1000/89/52/solar-panel-icon-flat-style-vector-20438952.webp"
                  }
                />
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              {Links1.map((link) => (
                <CartLink key={link}>{link}</CartLink>
              ))}
              <Button />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  <Avatar size={"sm"} />
                </MenuButton>
                <MenuList>
                  <MenuItem> My Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem> Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Card>
    </>
  );
}
