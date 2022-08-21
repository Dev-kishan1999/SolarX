/**
 * Author : Kishan Mahendrabhai Savaliya - B00896729
 */

import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
// import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
// import Menu from "components/menu/MainMenu";
import React, { useState, useMemo, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Dummy Data
import { Headers, Data } from "../../../../MockData/StockTableData";

export default function StockTable(props) {

  useEffect(()=>{
    fetch('https://solarx-backend.herokuapp.com/admin-stock',{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>response.json()).then(result=>setStock(result))
  },[])

  const [isOpen, setIsOpen] = useState(false);
  const [stock,setStock] = useState([]);
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, initialState } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
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
          Stock Table
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
          {stock.map((item, index) => {
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
                      {item.quantity}
                    </Text>
                  </Td>
                  {/* <Td
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    <Button color="#e85d04" onClick={onOpen}>
                      Edit
                    </Button>
                    <EditModal isOpen={isOpen} onClose={onClose} item={item} /> 
            </Td> */ }
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
