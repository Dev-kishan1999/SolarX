import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Feature = ({ title, text, icon, toast }) => {
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const navigate = useNavigate();
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text>{text}</Text>
      <Button
        bg={bgButton}
        color="white"
        _hover={{
          bg: "grey.300",
        }}
        _active={{
          bg: { bgButton },
        }}
        onClick={
          () => {
            navigate("/appointment");
          }
          // toast({
          //   title: "Service Booked",
          //   description: "service booked successfully.",
          //   status: "success",
          //   duration: 5000,
          //   isClosable: true,
          // })
        }
      >
        Book the service
      </Button>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  const toast = useToast();
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={"Solar Panel Cleaning"}
          text={
            "Solar panels do not have any moving parts, which is why there isn’t a whole lot of maintenance to take care of. However, cleaning is one aspect of solar panel maintenance that should not be taken lightly."
          }
          toast={toast}
        />

        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={"Solar Panel Repairing"}
          text={
            "Solar panels' faulty components are easy to recognize as they lead to diminished yields and less output from the solar installation. Fortunately, solar panel repairs can help in the resolution of most common problems that affect solar panels."
          }
          toast={toast}
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={"Solar Panel moving"}
          text={
            "Our experts will take care of the complete process and have the specialized equipment and have the expertise to handle the removal, transportation, and reinstallation of the panels in the safest and most efficient way possible."
          }
          toast={toast}
        ></Feature>
      </SimpleGrid>
    </Box>
  );
}
