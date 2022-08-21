import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, SunIcon } from "@chakra-ui/icons";

function Toogle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>
        <SunIcon boxSize={6} />
        {/* {colorMode === "light" ? "Dark" : "Light"} */}
      </Button>
    </header>
  );
}
export default Toogle;
