import ServiceForm from "./ServiceForm";
import Newappointments from "./Newappointments";
import OldAppointments from "./OldAppointments";

import { Box, SimpleGrid, VStack, StackDivider } from "@chakra-ui/react";
import CarouselInfo from "./CarouselInfo";
import Userfeedback from "./Userfeedback";
import { Stack, HStack} from '@chakra-ui/react'
import {useState, useEffect} from "react";

function Appointments() {

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [oldAppointments, setOldAppointments] = useState([]);


  useEffect(()=>{
    fetch(`https://solarx-backend.herokuapp.com/viewAppointment/${localStorage.getItem("email")}`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>response.json()).then(result=>{
      result.map((appointment) => {
        if(new Date(appointment.date) >= Date.now()){
          setUpcomingAppointments(upcomingAppointments => [...upcomingAppointments, appointment ]);
          console.log("upcomingAppointments", upcomingAppointments);
        }else{
          setOldAppointments(oldAppointments =>[...oldAppointments, appointment ]);
          console.log("oldAppointments", oldAppointments);
        }
      })
    })
  },[])

  return (
    // <div class="container">
    //   {/* <h1>Grid</h1> */}
    //   <div class="row">
    //     <div class="col-lg-6">
    //       {/* <SplitScreen/> */}
    //       <ServiceForm />
    //     </div>
    //     <div class="col-lg-6">
    //       <SimpleGrid rows={20} spacing={100}>
    //         <Newappointments />
    //       </SimpleGrid>
    //       <SimpleGrid rows={20} spacing={100}>
    //         <OldAppointments />
    //       </SimpleGrid>
    //     </div>
    //     <br />
    //     <br />

    //     {/* <SimpleGrid columns={20} spacing={100}> */}
    //     {/* <Carousel/> */}

    //     {/* </SimpleGrid> */}
    //   </div>
    //   <div class="row">
    //     <div class="col-lg-12">
    //       <h2>
    //         {" "}
    //         <b>Our Clients' Feedback</b>
    //       </h2>{" "}
    //     </div>
    //     {/* <Carousel/> */}
    //     <SimpleGrid>
    //       <CarouselInfo />
    //     </SimpleGrid>
    //   </div>
    // </div>

    <SimpleGrid minChildWidth="250px" spacing="40px">
      <Box>
        {/* <ServiceForm /> */}
        <ServiceForm />
      </Box>
      
      <Box>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Box overflow="hidden">
            {/* <Newappointments /> */}
            <Newappointments data1={upcomingAppointments}/>
          </Box>
          <Box overflow="hidden">
            <OldAppointments data1={oldAppointments}/>
          </Box>
        </VStack>
      </Box>
     
    </SimpleGrid>
  
  

 
   
   );
 
}
export default Appointments;
