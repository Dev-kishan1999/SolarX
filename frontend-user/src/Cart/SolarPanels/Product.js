/*
 * @author: Prachi Raval - B00883324
 *
 * This file has the Productt component.
 */

import {
  Flex,
  Circle,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import QuantityInput from "./QuantityInput";
import { useState, useContext } from "react";
import { ProductData } from "../Contexts/productContext";
import PopUp from "./PopUp";
import Header from "../Pages/Header";

const data = {
  isNew: true,
};

function Product(props) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [image, setImage] = useState(3);
  const [totalCartItems, setTotalCartItems] = useState();

  const { data, setData } = useContext(ProductData);

  const AddToCart = () => {
    <Header quant={10} />;
    setData((old) => {
      return [
        ...old,
        {
          id: props.id,
          price: props.price * quantity,
          typeOfPanel: props.typeOfPanel,
          quantity,
          url: props.image,
          totalCartItems: totalCartItems + quantity,
        },
      ];
    });

    for (var i = 1; i < data.length; i++) {
      console.log(data);
      localStorage.setItem("item", JSON.stringify(data));
    }
  };
  const productQuantity = (quantity) => {
    setQuantity(quantity.value);
  };
  return (
    <Flex p={3} w="full" centerContent>
      <Box
        centerContent
        bg={useColorModeValue("grey.200", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        fontSize={"15px"}
      >
        <Image
          src={props.image}
          height="280px"
          width="300px"
          alt={`Picture of ${props.typeOfPanel}`}
        />

        <Box p="6">
          <Box d="flex" alignItems="center">
            <PopUp name={props.typeOfPanel} desc={props.description} />
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="1xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {props.typeOfPanel}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <Button onClick={AddToCart}>
                <chakra.a display={"flex"}>
                  <Icon as={FiShoppingCart} h={6} w={6} alignSelf={"center"} />
                </chakra.a>
              </Button>
            </Tooltip>
          </Flex>
          <Link to="/CartMain">
            <Button>Buy Now</Button>
          </Link>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                $
              </Box>
              {props.price}
            </Box>
            <Box>
              <QuantityInput getQuanity={productQuantity} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Product;
