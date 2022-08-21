/**
 * Author : Kishan Mahendrabhai Savaliya - (B00896729)
 */
import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import Dashboard from "views/admin/dashboard";
import Report from "views/admin/report";
import Inventory from "views/admin/dataTables";
import EditPage from "views/admin/dashboard/components/EditPage";
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
  },
  {
    name: "Inventory",
    layout: "/admin",
    icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
    path: "/inventory",
    component: Inventory,
  },
  {
    name: "Edit",
    layout: "/admin",
    icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
    path: "/edit",
    component: EditPage,
  },
  {
    name: "Report Management",
    layout: "/admin",
    path: "/report-management",
    icon: (
      <Icon
        as={MdBarChart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    
    component: Report,
    secondary: true,
  },
  
];

export default routes;
