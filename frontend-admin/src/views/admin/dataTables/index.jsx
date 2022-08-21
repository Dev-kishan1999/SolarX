/**
 * Author : Kishan Mahendrabhai Savaliya - B00896729
 */
// Chakra imports
import { Box, SimpleGrid, useColorModeValue, Icon } from "@chakra-ui/react";
import StockTable from "views/admin/dataTables/components/StockTable";
import OrderTable from "views/admin/dataTables/components/OrderTable";
import AppointmentsTable from "views/admin/dataTables/components/AppointmentsTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import React from "react";



export default function Settings() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <StockTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <OrderTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <AppointmentsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
      </SimpleGrid>
    </Box>
  );
}
