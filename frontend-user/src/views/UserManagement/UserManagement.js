/**
 * @author: Mayank Sareen - B00899565
 */
import React from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import Profile from "./Components/Profile";
function UserManagement() {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <>
      <Profile></Profile>
    </>
  );
}

export default UserManagement;
