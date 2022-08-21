/*
 * @author: Prachi Raval, Kishan Savaliya - B00883324, B00896729
 *
 * This file has the Main Cart Information.
 */

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Button,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FcDislike, FcLike } from "react-icons/fc";
import { PhoneIcon, AddIcon, WarningIcon, SunIcon } from "@chakra-ui/icons";

const BlogTags = (props) => {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  {
    console.log("Like==>", like);
  }
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      <Button onClick={() => toggleLike()}>
        {like ? <FcDislike /> : <FcLike />}
      </Button>
    </HStack>
  );
};

export const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const ArticleList = () => {
  const [blogs, setBlogs] = useState([{}]);
  useEffect(() => {
    fetch("https://solarx-backend.herokuapp.com/allblogs", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => setBlogs(result));
  }, []);

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1">Solar News</Heading>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                src={
                  "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjByb29mdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(orange.600 1px, transparent 1px)",
                "radial(orange.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <BlogTags tags={["Like ", "Dislike"]} />
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              Blog article title
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            Every day, companies, research centers, and laboratories around the world study novel materials and processes that involve sunlight. However, ensuring comparability between measurements during different times of the day, in various enclosed spaces, experimental settings, and in different geographic locations would be impossible without the aid of an identical, unchanging “miniature sun” in every research space.
          </Text>
          <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} />
        </Box>
      </Box>
      <Heading as="h2" marginTop="5">
        Solar Blogs
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {/*  */}
        {blogs.map((blog, index) => {
          console.log(index)
          return (
            <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }} key={index}>
              <Box w="100%">
                <Box borderRadius="lg" overflow="hidden">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Image
                      transform="scale(1.0)"
                      src={
                        blog.imgurl
                      }
                      alt="..."
                      objectFit="contain"
                      width="100%"
                      transition="0.3s ease-in-out"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                    />
                  </Link>
                </Box>
                <BlogTags tags={["Like", "Dislike"]} marginTop="3" />
                <Heading fontSize="xl" marginTop="2">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    {blog.title}
                  </Link>
                </Heading>
                <Text as="p" fontSize="md" marginTop="2">
                  {blog.blog}
                </Text>
                <BlogAuthor
                  name={blog.author}
                  date={new Date("2021-04-06T19:01:27Z")}
                />
              </Box>
            </WrapItem>
          );
        })
        }

    
      </Wrap> 
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start"> 



      
      </VStack>
    </Container>
  );
};

export default ArticleList;
