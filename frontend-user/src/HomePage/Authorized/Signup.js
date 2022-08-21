import React from "react";
import { CgProfile } from "react-icons/cg";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Signup = ({ isAuthorised }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log(JSON.parse(localStorage.getItem("item")));
    var obj = JSON.parse(localStorage.getItem("item"));
    var length = Object.keys(obj).length;
    console.log(length);
    for (var index = 0; index < length; index++) {
      const dataadd = {
        userid: localStorage.getItem("email"),
        price: JSON.parse(localStorage.getItem("item"))[index].price,
        quantity: JSON.parse(localStorage.getItem("item"))[index].quantity,
        url: JSON.parse(localStorage.getItem("item"))[index].url,
        id: JSON.parse(localStorage.getItem("item"))[index].id,
      };
      console.log(dataadd);

      fetch("https://solarx-backend.herokuapp.com/addcart", {  //http://localhost:5000/addcart
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataadd),
      })
        .then((response) => response.json())
        .then((result) => {});
    }
    localStorage.removeItem("email");
    localStorage.removeItem("item");
    navigate("/login");
  };
  if (!isAuthorised) {
    return (
      <Button
        as={"a"}
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
        href={"/register"}
      >
        Sign Up
      </Button>
    );
  } else {
    return (
      <Button
        as={"a"}
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    );
  }
};

export default Signup;
