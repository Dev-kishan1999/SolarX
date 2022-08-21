/**
 * Author : Kishan Mahendrabhai Savaliya - (B00896729)
 */
import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdLock,
} from "react-icons/md";


import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
