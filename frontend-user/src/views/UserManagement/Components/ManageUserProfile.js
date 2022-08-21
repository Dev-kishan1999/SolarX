/**
 * @author: Mayank Sareen - B00899565
 * This file has the User Delivery Information form. It handles the form validations and also sends data to the profile page.
 */
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Center,
  Text,
  InputGroup,
  InputLeftAddon,
  Avatar,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { React, useState, Flex } from "react";
import { RiImageAddFill } from "react-icons/ri";
function ManageuserProfile() {
  // const navigate = useNavigate();
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const errorMessageColor = useColorModeValue("red.500", "white");
  const [isEdit, setIsEdit] = useState(false);
  const [toastComponent, setToastComponent] = useState({
    action: "",
    showToast: false,
    message: "",
  });
  const [selectedImage, setSelectedImage] = useState();
  const [source, setSource] = useState(localStorage.getItem("imgurl"));
  const [userProfileData, setUserProfileData] = useState({
    name: localStorage.getItem("name"),
    phone: localStorage.getItem("phone"),
    city: localStorage.getItem("city"),
    apt: localStorage.getItem("apt"),
    pincode: localStorage.getItem("pincode"),
    street: localStorage.getItem("street"),
    errorMessages: {
      name: "",
      phone: "",
      city: "",
      apt: "",
      pincode: "",
      street: "",
    },
    isValid: {
      name: "",
      phone: "",
      city: "",
      apt: "",
      pincode: "",
      street: "",
    },
  });

  const errorLabels = {
    name: "Name",
    phone: "Phone Number",
    street: "Street",
    city: "City",
    apt: "Appartment Number",
    pincode: "Postal Code",
  };

  function showToast(action, message) {
    toastComponent.action = action;
    toastComponent.showToast = true;
    toastComponent.message = message;
    setToastComponent({
      ...toastComponent,
    });
    setTimeout(function () {
      toastComponent.action = "";
      toastComponent.showToast = false;
      toastComponent.message = "";
      setToastComponent({
        ...toastComponent,
      });
    }, 3000);
  }

  function handleUnitNumberChange(event) {
    userProfileData.errorMessages[event.target.name] = "";
    const inputVal = event.target.value.replace(/ /g, "");
    let inputNumber = "";
    var rgx = /^[0-9]*\.?[0-9]*$/;
    inputNumber = inputVal.match(rgx).length > 0 ? inputVal : "";
    setUserProfileData({
      ...userProfileData,
      [event.target.name]: inputNumber,
    });
  }
  function handleFormChange(event) {
    userProfileData.errorMessages[event.target.name] = "";
    setUserProfileData({
      ...userProfileData,
      [event.target.name]: event.target.value,
    });
  }
  function submitForm() {
    validateForm();
    for (let i in userProfileData) {
      if (i !== "errorMessages" && i !== "isValid") {
        if (
          userProfileData.errorMessages[i] &&
          userProfileData.errorMessages[i].length !== 0
        ) {
          userProfileData.isValid[i] = false;
        } else {
          userProfileData.isValid[i] = true;
          localStorage.setItem(i, userProfileData[i]);
        }
      }
      setUserProfileData({
        ...userProfileData,
      });
    }
    if (
      userProfileData.isValid["name"] &&
      userProfileData.isValid["phone"] &&
      userProfileData.isValid["street"] &&
      userProfileData.isValid["city"] &&
      userProfileData.isValid["apt"] &&
      userProfileData.isValid["pincode"]
    ) {
      fetch("https://solarx-backend.herokuapp.com/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          name: localStorage.getItem("name"),
          phone: localStorage.getItem("phone").replace(/^(\+)|\D/g, "$1"),
          city: localStorage.getItem("city"),
          apt: localStorage.getItem("apt"),
          pincode: localStorage.getItem("pincode"),
          street: localStorage.getItem("street"),
          url: localStorage.getItem("imgurl"),
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          showToast("success", result.message);
          setIsEdit(false);
        })
        .catch((error) => {
          showToast("error", error.message);
          setIsEdit(false);
        });
    }
  }

  function validateForm() {
    for (let i in userProfileData) {
      if (i !== "errorMessages" && i !== "isValid") {
        let userinput = userProfileData[i];
        if (userinput) {
          userProfileData[i] = userinput.trim().split(/ +/).join(" ");
        }
        if (!userProfileData[i] || userProfileData[i] === "") {
          userProfileData.errorMessages[i] = errorLabels[i] + " is Required!";
        } else {
          if (i === "name") {
            var rgx = /^[A-Z0-9 a-z0-9]+$/;
            if (userProfileData[i].match(rgx) === null) {
              userProfileData.errorMessages[i] =
                errorLabels[i] + " allows only letters and name like John 2!";
            } else {
              userProfileData.errorMessages[i] = "";
            }
          } else if (i === "phone") {
            var rgx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (rgx.test(userProfileData[i])) {
              userProfileData[i] = userProfileData[i].replace(
                rgx,
                "($1) $2-$3"
              );
            } else {
              userProfileData.errorMessages[i] =
                errorLabels[i] + " is Invalid!";
            }
          } else {
            userProfileData.errorMessages[i] = "";
          }
        }
      }
      setUserProfileData({
        ...userProfileData,
      });
    }
  }

  const updatePicture = (event) => {
    let image = event.target.files[0];

    if (image && image["type"].split("/")[0] === "image") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "solarx");
      data.append("cloud_name", "dpgs2ejiz");
      fetch("https://api.cloudinary.com/v1_1/dpgs2ejiz/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((result) => {
          let url = result.url;
          localStorage.setItem("imgurl", url);
          document.querySelector("#headerProfileImage").src = url;
          setSelectedImage(event.target.files[0]);
          setSource(event.target.files[0]);
          fetch("https://solarx-backend.herokuapp.com/update-profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: localStorage.getItem("email"),
              name: localStorage.getItem("name"),
              phone: localStorage.getItem("phone").replace(/^(\+)|\D/g, "$1"),
              city: localStorage.getItem("city"),
              apt: localStorage.getItem("apt"),
              pincode: localStorage.getItem("pincode"),
              street: localStorage.getItem("street"),
              url: url,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              setSelectedImage(null);
              console.log(result.message);
              setSource(localStorage.getItem("imgurl"));
              showToast("success", "Your new picture looks amazing!");
            })
            .catch((error) => {
              showToast("error", error.message);
            });
        });
    } else {
      showToast("error", "Incorrect Picture format");
    }
  };

  return (
    <>
      {toastComponent.showToast && (
        <Alert status={toastComponent.action} variant="subtle">
          <AlertIcon />
          {toastComponent.message}
        </Alert>
      )}
      <FormControl isRequired={isEdit} p={{ lg: "16px" }}>
        <Grid
          mr={{ sm: "15px", lg: "0px" }}
          ml={{ sm: "15px", lg: "0px" }}
          mt={"10px"}
          templateColumns={{ sm: "1fr", md: "1.2fr 1.8fr", lg: "1.2fr 1.8fr" }}
          templateRows="1fr"
        >
          <GridItem mt="5%" mb={"10px"}>
            <center>
              <div>
                {!selectedImage && (
                  <Avatar src={source} size="2xl" bg="gray.400" />
                )}
                {selectedImage && (
                  <img
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                )}
                <br />
              </div>
              <br />
              {!selectedImage && (
                <label for="file-upload" class="custom-file-upload">
                  <RiImageAddFill /> Update Picture
                </label>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  updatePicture(event);
                }}
              />
            </center>
          </GridItem>
          <GridItem>
            <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr " }}>
              <GridItem>
                {userProfileData.errorMessages.name.length > 0 && (
                  <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                    {userProfileData.errorMessages.name}
                  </Text>
                )}
                <FormLabel mt="4px" ms="4px" fontSize="sm" fontWeight="normal">
                  Name:
                </FormLabel>
                <Input
                  name="name"
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  isReadOnly={!isEdit}
                  variant={isEdit ? "outline" : "flushed"}
                  isInvalid={userProfileData.errorMessages.name.length > 0}
                  placeholder="Enter your Name"
                  mb="12px"
                  maxLength={30}
                  value={userProfileData.name}
                  onChange={handleFormChange}
                />
              </GridItem>
              <GridItem ml={{ lg: "10px" }}>
                {userProfileData.errorMessages.phone.length > 0 && (
                  <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                    {userProfileData.errorMessages.phone}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Phone:
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+1" />
                  <Input
                    type="tel"
                    name="phone"
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    placeholder="Phone Number"
                    mb="12px"
                    isReadOnly={!isEdit}
                    variant={isEdit ? "outline" : "flushed"}
                    maxLength={30}
                    isInvalid={userProfileData.errorMessages.phone.length > 0}
                    value={userProfileData.phone}
                    onChange={handleFormChange}
                  />
                </InputGroup>
              </GridItem>
            </Grid>

            <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr " }}>
              <GridItem>
                {userProfileData.errorMessages.street.length > 0 && (
                  <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                    {userProfileData.errorMessages.street}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Street:
                </FormLabel>
                <Input
                  name="street"
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  isReadOnly={!isEdit}
                  variant={isEdit ? "outline" : "flushed"}
                  placeholder="Street"
                  mb="12px"
                  isInvalid={userProfileData.errorMessages.street.length > 0}
                  maxLength={30}
                  value={userProfileData.street}
                  onChange={handleFormChange}
                />
              </GridItem>
              <GridItem ml={{ lg: "10px" }}>
                {userProfileData.errorMessages.city.length > 0 && (
                  <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                    {userProfileData.errorMessages.city}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  City:
                </FormLabel>
                <Input
                  name="city"
                  fontSize="sm"
                  ms="4px"
                  isReadOnly={!isEdit}
                  variant={isEdit ? "outline" : "flushed"}
                  borderRadius="15px"
                  type="text"
                  placeholder="City"
                  mb="12px"
                  isInvalid={userProfileData.errorMessages.city.length > 0}
                  maxLength={30}
                  value={userProfileData.city}
                  onChange={handleFormChange}
                />
              </GridItem>
            </Grid>
            <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr " }}>
              <GridItem>
                {userProfileData.errorMessages.apt.length > 0 && (
                  <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                    {userProfileData.errorMessages.state}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Unit Number:
                </FormLabel>
                <Input
                  name="apt"
                  fontSize="sm"
                  isReadOnly={!isEdit}
                  variant={isEdit ? "outline" : "flushed"}
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  placeholder="Appartment Number"
                  mb="12px"
                  isInvalid={userProfileData.errorMessages.apt.length > 0}
                  maxLength={30}
                  value={userProfileData.apt}
                  onChange={handleUnitNumberChange}
                />
              </GridItem>
              <GridItem ml={{ lg: "10px" }}>
                {userProfileData.errorMessages.pincode.length > 0 && (
                  <Text ms="4px" fontSize="sm" color={errorMessageColor}>
                    {userProfileData.errorMessages.pincode}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Postal Code:
                </FormLabel>
                <Input
                  name="pincode"
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  isReadOnly={!isEdit}
                  variant={isEdit ? "outline" : "flushed"}
                  placeholder="Postal Code"
                  mb="12px"
                  isInvalid={userProfileData.errorMessages.pincode.length > 0}
                  maxLength={30}
                  value={userProfileData.pincode}
                  onChange={handleFormChange}
                />
              </GridItem>
            </Grid>
            <Center>
              {!isEdit && (
                <Button
                  onClick={() => setIsEdit(true)}
                  bg={bgButton}
                  fontSize="10px"
                  color="white"
                  fontWeight="bold"
                  w="40%"
                  h="35"
                  _hover={{
                    bg: "grey.900",
                  }}
                  _active={{
                    bg: { bgButton },
                  }}
                >
                  Edit
                </Button>
              )}
              {isEdit && (
                <Button
                  onClick={submitForm}
                  bg={bgButton}
                  fontSize="10px"
                  color="white"
                  fontWeight="bold"
                  w="40%"
                  h="35"
                  _hover={{
                    bg: "grey.900",
                  }}
                  _active={{
                    bg: { bgButton },
                  }}
                >
                  Save
                </Button>
              )}
            </Center>
          </GridItem>
        </Grid>
      </FormControl>
    </>
  );
}

export default ManageuserProfile;
