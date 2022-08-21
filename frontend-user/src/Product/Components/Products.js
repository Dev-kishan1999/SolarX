import React, { useContext } from "react";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  // useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
// import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { SimpleGrid } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../../context/ProductContext";
// const data = [
//   {
//     id:1,
//     isNew: true,
//     imageURL:
//     "https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c29sYXJ8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=4600&q=80",
//     name: 'Wayfarer Classic',
//     price: 4.5,
//     rating: 4.2,
//     numReviews: 34,
//   },
//   {
//     id:2,
//     isNew: true,
//     imageURL:
//     'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c29sYXJ8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     name: 'Wayfarer Classic',
//     price: 4.5,
//     rating: 4.2,
//     numReviews: 34,
//   },
//   {
//     id:3,
//     isNew: true,
//     imageURL:
//     'https://images.unsplash.com/photo-1548705102-56b00f2bb299?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c29sYXJ8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     name: 'Wayfarer Classic',
//     price: 4.5,
//     rating: 4.2,
//     numReviews: 34,
//   },
//   {
//     id:4,
//     isNew: true,
//     imageURL:
//     'https://images.unsplash.com/photo-1501494278684-d0fb421388ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c29sYXJ8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     name: 'Wayfarer Classic',
//     price: 4.5,
//     rating: 4.2,
//     numReviews: 34,
//   },

// ];

// interface RatingProps {
//   rating: number;
//   numReviews: number;
// }

// function Rating({ rating, numReviews }: RatingProps) {
//   return (
//     <Box d="flex" alignItems="center">
//       {Array(5)
//         .fill('')
//         .map((_, i) => {
//           const roundedRating = Math.round(rating * 2) / 2;
//           if (roundedRating - i >= 1) {
//             return (
//               <BsStarFill
//                 key={i}
//                 style={{ marginLeft: '1' }}
//                 color={i < rating ? 'teal.500' : 'gray.300'}
//               />
//             );
//           }
//           if (roundedRating - i === 0.5) {
//             return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
//           }
//           return <BsStar key={i} style={{ marginLeft: '1' }} />;
//         })}
//       <Box as="span" ml="2" color="gray.600" fontSize="sm">
//         {numReviews} review{numReviews > 1 && 's'}
//       </Box>
//     </Box>
//   );
// }

const Products = () => {
  const navigate = useNavigate();
  const { data, cart, setCart } = useContext(ProductData);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log(cart);
  };

  return (
    <SimpleGrid columns={[2, null, 3]} spacing="40px" m={20}>
      {data.map((item, index) => {
        return (
          <Box
            //bg={useColorModeValue('white', 'gray.800')}
            key={index}
            maxW="sm"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
          >
            {item.isNew && (
              <Circle
                size="10px"
                position="absolute"
                top={2}
                right={2}
                bg="red.200"
              />
            )}

            <Image
              src={item.imageURL}
              alt={`Picture of ${item.name}`}
              roundedTop="lg"
              onClick={() => navigate(`/products/${item.id}`)}
            />

            <Box p="6">
              <Box d="flex" alignItems="baseline">
                {item.isNew && (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    New
                  </Badge>
                )}
              </Box>
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {item.name}
                </Box>
                <Tooltip
                  label="Add to cart"
                  bg="white"
                  placement={"top"}
                  color={"gray.800"}
                  fontSize={"1.2em"}
                >
                  <chakra.a href={"#"} display={"flex"}>
                    <Icon
                      as={FiShoppingCart}
                      h={7}
                      w={7}
                      alignSelf={"center"}
                      onClick={() => addToCart(item)}
                    />
                  </chakra.a>
                </Tooltip>
              </Flex>

              <Flex justifyContent="space-between" alignContent="center">
                {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                {/* color={useColorModeValue('gray.800', 'white')} */}
                <Box fontSize="2xl">
                  <Box as="span" color={"gray.600"} fontSize="lg">
                    £
                  </Box>
                  {item.price.toFixed(2)}
                </Box>
              </Flex>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
    // <Flex p={50} w="full" alignItems="center" justifyContent="center">
    // </Flex>
  );
};

export default Products;
