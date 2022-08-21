/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import React, { useMemo,useEffect,useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Dummy Data
import { Headers, Data } from "../../../../MockData/ReportTableData";

export default function ReportTable(props) {
  const { columnsData, tableData } = props;
  const [info,setInfo] = useState([]);
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  useEffect(()=>{
    fetch('https://solarx-backend.herokuapp.com/admin-feedback',{
      method:'GET',
    }).then(response=>response.json()).then(result=>setInfo(result));
  },[])

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Appointment
        </Text>
        {/* <Menu /> */}
      </Flex>
      <Table
        {...getTableProps()}
        variant="simple"
        bg="#f8f9fa"
        color="gray.500"
        mb="24px"
      >
        <Thead>
          {Headers.map((header, index) => {
            return (
              <Th
                // {...column.getHeaderProps(column.getSortByToggleProps())}
                pe="10px"
                key={index}
                borderColor={borderColor}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                >
                  {header}
                </Flex>
              </Th>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {info.map((item, index) => {
            return (
              <>
                <Tr key={index}>
                  <Td
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {item.name}
                    </Text>
                  </Td>
                  <Td
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {item.feedback}
                    </Text>
                  </Td>
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
