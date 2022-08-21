/**
 * @author: Radhey Rupapara - B00910695
 */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select
} from '@chakra-ui/react';
import React,{useState} from 'react';


export default function SignupCard() {

  const [fans,setFans] = useState(0);
  const [tvs,setTvs] = useState(0);
  const [heaters,setHeaters] = useState(0);
  const [fridges,setFridges] = useState(0);
  const [consumption,setConsumption] = useState(0);
  const baseUrl = 'https://solarx-backend.herokuapp.com' // //http://localhost:5000

  const submitHandler = ()=>{
    fetch(baseUrl+"/predictbill",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        fans,
        tvs,
        heaters,
        fridges
      })
    }).then(response=>response.json()).then(result=>{
      console.log(result)
      fetch(baseUrl+"/getpackages/"+result.consumption,{
        method: 'GET',
        headers:{
          'Content-Type':'application/json'
        }
      }).then(response=>response.json()).then(result=>{
        console.log(result);
        localStorage.setItem("packages", JSON.stringify(result));
        window.location.href = "/costprediction";
      })
      if(result){
        setConsumption(result.consumption)
      }
    })
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')} >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            your power consumption : {consumption}
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          >
          <Stack spacing={4}>
              <Box>
                <FormControl id="firstName">
                  <HStack>
                  <FormLabel>Number of fans</FormLabel>
                  <Select placeholder='Select option' onChange={(e)=>setFans(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='10'>7+</option>
                  </Select>
                  </HStack>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="firstName">
                  <HStack>
                  <FormLabel>Number of TVs</FormLabel>
                  <Select placeholder='Select option' onChange={(e)=>setTvs(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>3+</option>
                  </Select>
                  </HStack>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="firstName">
                  <HStack>
                  <FormLabel>Number of Heaters</FormLabel>
                  <Select placeholder='Select option' onChange={(e)=>setHeaters(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>1+</option>
                  </Select>
                  </HStack>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="firstName">
                  <HStack>
                  <FormLabel>Number of Fridge</FormLabel>
                  <Select placeholder='Select option' onChange={(e)=>setFridges(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>2+</option>
                  </Select>
                  </HStack> 
                </FormControl>
              </Box>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={()=>submitHandler()}
                >
                Predict
              </Button>
            </Stack>
            
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
