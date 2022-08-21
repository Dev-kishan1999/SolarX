/**
 * Author : Kishan Mahendrabhai Savaliya - B00896729
 */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import React,{useState} from "react";

const EditModal = ({ isOpen, onClose, item }) => {
  const outOfStock = ()=>{
    fetch(`https://solarx-backend.herokuapp.com/admin-out-of-stock/${item.id}`,{
      method:"PUT",
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>response.json()).then(result=>{
      console.log(result)
      toast({
                  title: "Out of stock",
                  description: "Product is now out of stock.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
      })
      console.log(item)
      onClose();
    })
  }

  const deleteProduct = ()=>{
    fetch(`https://solarx-backend.herokuapp.com/admin-product-delete/${item.id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>response.json()).then(result=>{
      console.log(result);
      onClose();
    })
  }

  const toast = useToast();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() =>
                outOfStock()
                
              }
            >
              Out of Stock
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() =>
                // toast({
                //   title: "Deleted.",
                //   description: "Product deleted succesfully.",
                //   status: "success",
                //   duration: 5000,
                //   isClosable: true,
                // })
                deleteProduct()
              }
            >
              Delete
            </Button>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Verify</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
