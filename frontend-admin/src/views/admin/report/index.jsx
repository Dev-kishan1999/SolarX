import React from "react";

// Chakra imports
import { Box } from "@chakra-ui/react";

import { columnsDataDevelopment } from "views/admin/dataTables/variables/columnsData";
import ReportTable from "./components/ReportTable";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";

export default function Report() {
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <ReportTable
        columnsData={columnsDataDevelopment}
        tableData={tableDataDevelopment}
      />
    </Box>
  );
}
