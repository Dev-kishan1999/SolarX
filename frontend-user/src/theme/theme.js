/*Citation:
=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================
*/
import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const stepsComponent = extendTheme({
  components: {
    Steps,
  },
});

export default extendTheme(
  globalStyles,
  CardComponent,
  CardBodyComponent,
  stepsComponent
);
