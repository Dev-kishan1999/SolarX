import { ReactNode } from "react";
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";

export default function StatsGridWithImage() {
  return (
    <Box bg={"gray.800"} position={"relative"} p={4}>
      <Flex>
        <Center
          flex={1}
          zIndex={0}
          display={{ base: "none", lg: "flex" }}
          backgroundImage="url('/templates/stats-grid-with-image.png')"
          backgroundSize={"cover"}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          w="100px"
          bg="green.500"
          position={"absolute"}
          // width={"50%"}
          // height={"50%"}
          // insetY={0}
          // right={0}
        ></Center>
        {/* <Flex
          bgGradient={"linear(to-r, gray.800 10%, transparent)"}
          w={"full"}
          h={"full"}
        /> */}
      </Flex>
      <Container maxW={"5xl"} zIndex={10} position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            // sflex={1}
            color={"gray.400"}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 10, xl: 30 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={"xl"}
                color={"gray.500"}
              >
                Technology
              </Text>
              <Heading
                color={"white"}
                mb={5}
                fontSize={{ base: "3xl", md: "4xl" }}
              >
                Solar Is the Future
              </Heading>
              <Text fontSize={"xl"} color={"gray.400"}>
                The NewLife™ technology allows you to monitor your crops and get
                complete insights at real time. The proprietary
                software/hardware ecosystem prevents your plants from getting
                neglected.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={"heading"}
                    fontSize={"xl"}
                    color={"white"}
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={"span"} fontWeight={700} color={"white"}>
    {children}
  </Text>
);

const stats = [
  {
    title: "4 Kinds Of",
    content: (
      <>
        <StatsText>Solar Panels</StatsText> for detailed monitoring and
        real-time analytics
      </>
    ),
  },
  {
    title: "24/7",
    content: (
      <>
        <StatsText>Customer Support</StatsText> enabled right in your dashboard
        without history limitations
      </>
    ),
  },
  {
    title: "Upto 50 %",
    content: (
      <>
        <StatsText>Saving On Electricity Bills</StatsText> in North America has
        chosen NewLife™ as their management solution
      </>
    ),
  },
  {
    title: "10+",
    content: (
      <>
        <StatsText>Solar Gadgets In Eshop</StatsText> currently connected and
        monitored by the NewLife™ software
      </>
    ),
  },
];
