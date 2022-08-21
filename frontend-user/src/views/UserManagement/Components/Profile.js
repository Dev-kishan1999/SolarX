/**
 * @author: Mayank Sareen - B00899565
This file is the main file which contains all the boiler plate code of different components.
*/
import {
  Flex,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaArrowDown, FaArrowUp, FaFilePdf } from "react-icons/fa";
import Card from "../../../Card/Card.js";
import { React, useEffect, useState } from "react";
import Wallet from "../../Payment/Components/Wallet";
import Referral from "../../Payment/Components/Referral.js";
import Marquee from "react-fast-marquee";
import Transaction from "../../Payment/Components/Transaction.js";
import ManageuserProfile from "./ManageUserProfile.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
function Profile() {
  const [transactionTableData, setTransactionTableData] = useState([]);
  const [consumptionData, setConsumptionData] = useState({
    datasets: [],
  });
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.700", "white");
  const subTextColor = useColorModeValue("gray.400", "gray.300");
  const offerColor = useColorModeValue("orange.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  useEffect(() => {
    var userEmail = localStorage.getItem("email");
    console.log(userEmail);
    fetch(
      "https://solarx-backend.herokuapp.com/get-transactions/" + userEmail,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        let transactions = result.transactions;
        let transactionTableData = [];
        for (let i in transactions) {
          let transactionObj = {
            transaction_id: transactions[i].transaction_id,
            date: transactions[i].date,
            time: transactions[i].time,
            name: transactions[i].name,
            amount: transactions[i].amount,
          };
          if (transactions[i].type === "1") {
            transactionObj.logo = FaArrowDown;
            transactionObj.color = "green";
            transactionObj.amount = "+ $ " + transactionObj.amount;
          } else if (transactions[i].type === "2") {
            transactionObj.logo = FaArrowUp;
            transactionObj.color = "red";
            transactionObj.amount = "- $ " + transactionObj.amount;
          } else if (transactions[i].type === "3") {
            transactionObj.logo = FaArrowDown;
            transactionObj.color = "green";
            transactionObj.amount = "+ $ " + transactionObj.amount;
            transactionObj.name = transactionObj.name + "- Refund";
          } else {
            transactionObj.amount = "$ " + transactionObj.amount;
          }
          transactionTableData.push(transactionObj);
        }
        setTransactionTableData([...transactionTableData]);
      });
    fetch(
      "https://solarx-backend.herokuapp.com/get-user-consumption/" + userEmail,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        let consumption = result.userConsumption;
        let data = {
          labels: consumption.labels,
          datasets: [
            {
              label: "Prices with electricity",
              data: consumption.electricity_prices,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132)", //gradientbg1,
            },
            {
              label: "Prices with Solar Power",
              data: consumption.solar_prices,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgb(53, 162, 235)", //gradientbg2,
            },
          ],
        };
        setConsumptionData({ ...data });
      });
  }, []);

  const emailColor = useColorModeValue("gray.400", "gray.300");
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <>
      <Card p="10px" mb="5px">
        <Marquee speed={"100"}>
          <Flex>
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <Text mx="30" fontSize="lg" color={offerColor} fontWeight="bold">
              Refer a friend and get $100!
            </Text>
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
            <FaStar color="gold" size={20} />
          </Flex>
        </Marquee>
      </Card>
      <Card p="20px">
        <Flex
          justifyContent={{ sm: "space-between", md: "space-between" }}
          align="center"
        >
          <Flex
            align="center"
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}
          >
            <span class="chakra-avatar css-1gztfe7">
              <img
                id="headerProfileImage"
                src={localStorage.getItem("imgurl")}
                class="chakra-avatar__img css-13fneu0"
              />
            </span>
            <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight="bold"
              >
                {localStorage.getItem("name")}
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight="semibold"
              >
                {localStorage.getItem("email")}
              </Text>
              <spacer />
            </Flex>
          </Flex>
          <Flex pl="12%">
            <Button
              onClick={() => {
                navigate("/MyOrders");
              }}
              bg={bgButton}
              fontSize="10px"
              color="white"
              fontWeight="bold"
              p="10px"
              h="35"
              _hover={{
                bg: "grey.900",
              }}
              _active={{
                bg: { bgButton },
              }}
            >
              My Orders
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Grid
        pt={"12px"}
        templateColumns={{ sm: "1fr", lg: "2.6fr 1.2fr" }}
        templateRows="1fr"
      >
        <GridItem m="0px" mr={{ sm: "0px", lg: "11px" }}>
          <Grid templateRows="1fr">
            <GridItem mt={{ sm: "10px", lg: "0px" }}>
              <Card pb={"10px"} px={"5px"}>
                <Text
                  ml="5px"
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                >
                  Personal Information
                </Text>
                <ManageuserProfile />
              </Card>
              <GridItem pt="10px">
                <Card pb={"0px"} px={"5px"}>
                  <Text
                    ml="5px"
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                  >
                    You Save!
                  </Text>
                  <Text
                    mt="1%"
                    ml="5px"
                    mb="1%"
                    fontSize={{ sm: "sm", md: "md", lg: "md" }}
                    color={subTextColor}
                    fontWeight="semibold"
                  >
                    Your savings would be calculated based on the your
                    consumption
                  </Text>
                  {consumptionData.labels && (
                    <Line data={consumptionData} options={options} />
                  )}
                  {!consumptionData.labels && (
                    <center>
                      <Text
                        mt="2%"
                        mb="2%"
                        fontSize={{ sm: "sm", md: "md", lg: "lg" }}
                        color={subTextColor}
                        fontWeight="semibold"
                      >
                        No Usage Recorded yet!
                      </Text>
                    </center>
                  )}
                </Card>
              </GridItem>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid templateRows="1fr">
            <GridItem mt={{ sm: "10px", lg: "0px" }}>
              <Wallet
                title="My Wallet"
                label="Current Balance"
                amount={localStorage.getItem("cwb")}
                fontSize="md"
                addMoney="true"
              />
            </GridItem>
            <GridItem pt="10px">
              <Referral />
            </GridItem>
            <GridItem pt="10px" ml="0px" mr={{ sm: "0px", lg: "0px" }}>
              <Transaction data={transactionTableData} />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
}

export default Profile;
