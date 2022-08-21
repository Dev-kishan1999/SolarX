import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
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
    </Stack>
  );
};

export default function Details() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Image
          rounded={"md"}
          alt={"feature image"}
          src={
            "https://www.build-review.com/wp-content/webp-express/webp-images/uploads/2021/01/solar-panels.jpg.webp"
          }
          objectFit={"cover"}
        />

        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={"Unlimited Donations"}
          text={
            "Twenty-six community organizations or individuals made tax-deductible donations to Community Energy."
          }
        />
        <Image
          rounded={"md"}
          alt={"feature image"}
          src={
            "https://www.passionateinmarketing.com/wp-content/uploads/2022/01/img-1.jpg"
          }
          objectFit={"cover"}
        />
      </SimpleGrid>
    </Box>
  );
}
