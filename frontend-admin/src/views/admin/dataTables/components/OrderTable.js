/**
 * Author : Kishan Mahendrabhai Savaliya - B00896729
 */
import {
  Flex,
  Table,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

//Mocked Data for the table
import { Headers, Data } from "MockData/OrderTableData";

// icons
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

// Custom components
import Card from "components/card/Card";
export default function OrderTable(props) {

  const { columnsData, tableData } = props;
  const [order,setOrder] = useState([]);
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  useEffect(()=>{
    fetch('https://solarx-backend.herokuapp.com/admin-order',{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response => response.json()).then(result=> setOrder(result))
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
          Order Table
        </Text>
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
              <Th pe="10px" key={index} borderColor={borderColor}>
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
          {order.map((item, index) => {
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
                      {item.id}
                    </Text>
                  </Td>
                  <Td
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {item.productid}
                    </Text>
                  </Td>
                  <Td
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                      {item.userid}
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
                  <Td
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    <Flex align="center">
                      <Icon
                        w="24px"
                        h="24px"
                        me="5px"
                        color={
                          item.status === "delivered"
                            ? "green.500"
                            : item.status === "cancelled"
                            ? "red.500"
                            : item.status === "pending"
                            ? "orange.500"
                            : null
                        }
                        as={
                          item.status === "delivered"
                            ? MdCheckCircle
                            : item.status === "cancelled"
                            ? MdCancel
                            : item.status === "pending"
                            ? MdOutlineError
                            : null
                        }
                      />
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {item.status}
                      </Text>
                    </Flex>
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
