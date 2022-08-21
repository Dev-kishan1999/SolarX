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
*/
import { Box, useStyleConfig } from "@chakra-ui/react";
function CardHeader(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardHeader", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardHeader;
