/**
 * Author : Kishan Mahendrabhai Savaliya - B00896729
 */
// Chakra imports
import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Assets

// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdBarChart } from "react-icons/md";
import { columnsDataCheck } from "views/admin/dashboard/variables/columnsData";
import tableDataCheck from "views/admin/dashboard/variables/tableDataCheck.json";
import ProductTable from "../dataTables/components/ProductTable";

// import { Headers,Data } from "MockData/OrderTableData";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Earnings"
          value="$350.4"
        />
      </SimpleGrid>
      <ProductTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
    </Box>
  );
}
