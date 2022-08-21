import React from "react";
import {CgProfile} from 'react-icons/cg';
import {Button} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
const Signin = ({ isAuthorised })=>{
  const navigate = useNavigate();
    if(!isAuthorised){
      return(
        <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            onClick={()=>{
              navigate('/login')
            }}
          >
            Sign In
          </Button>
      )
    }
    else {
      return(
        <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            onClick={()=>{
              navigate('/profile')
            }}
          >
            <CgProfile style={{'cursor':'pointer'}}/>
          </Button>
      )
    }
}


export default Signin;
