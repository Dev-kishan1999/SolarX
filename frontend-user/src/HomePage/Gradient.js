import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function WithBackgroundImage() {
  const navigate = useNavigate();
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={
        "url(https://to70.com/wp-content/uploads/2018/08/LP01629.jpg)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            SolarX : Begin Your Bright Journey
          </Text>
          <Stack direction={"column"}>
            <Button
              bg={"blue.400"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "blue.500" }}
              onClick={() => navigate("/billpred")}
            >
              Free Quotation
            </Button>
            <Button
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
              onClick={() => navigate("/Products")}
            >
              Start Solar Shopping
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
