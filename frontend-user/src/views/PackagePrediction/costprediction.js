/**
 * @author: Radhey Rupapara - B00910695
 */
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Flex,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export default function CostPrediction() {
  const toast = useToast();
  const textBgColor = useColorModeValue("gray.50", "gray.900");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const tiers = JSON.parse(localStorage.getItem("packages"));
  const wg = useColorModeValue("white", "gray.800");
  const gw = useColorModeValue("gray.800", "white");
  const gg = useColorModeValue("gray.50", "gray.900");
  return (
    <Center py={6}>
      {/* <Flex
        direction={{ sm: "column", md: "row" }}
        minWidth="max-content"
        alignItems="center"
        gap="5"
      > */}
      <SimpleGrid columns={3} minChildWidth="150px" spacing="40px">
        {tiers.map((tier) => (
        <Box
          maxW={"330px"}
          w={"full"}
          bg={wg}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Stack
            textAlign={"center"}
            p={6}
            color={gw}
            align={"center"}
          >
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={textBgColor}
              p={2}
              px={3}
              color={"black.500"}
              rounded={"full"}
            >
              {tier.description}
            </Text>
            <Stack direction={"row"} align={"center"} justify={"center"}>
              <Text fontSize={"3xl"}>$</Text>
              <Text fontSize={"6xl"} fontWeight={800}>
                {tier.price}
              </Text>
              <Text color={"gray.500"}></Text>
            </Stack>
          </Stack>

          <Box bg={gg} px={6} py={10}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckIcon} color="gray.400" />
                Inverter Capacity: {tier.package_grid} KVA
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="gray.400" />
                Number of Solar Panels to be installed: {tier.number_of_panels}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="gray.400" />
                System Volt: {tier.system_volt} V
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="gray.400" />
                Area Required: {tier.area_required} Sq.Ft.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="gray.400" />
                Power Generated per Day: {tier.power_per_day} Units
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="gray.400" />
                Power Generated per year: {tier.power_per_year} Units
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="gray.400" />
                Savings per year: ${tier.savings_per_year}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="gray.400" />
                Savings in 5 year year: ${5*tier.savings_per_year}
              </ListItem>
            </List>

            <Button
              mt={10}
              w={"full"}
              bg={bgButton}
              color={"white"}
              rounded={"xl"}
              boxShadow={bgButton}
              _hover={{
                bg: { bgButton },
              }}
              _focus={{
                bg: { bgButton },
              }}
              onClick={() =>
                toast({
                  title: "Thanks for subscribing.",
                  description: "",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              }
            >
              Select this Package
            </Button>
          </Box>
        </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
}
