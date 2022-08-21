/**
 * Author : Kishan Mahendrabhai Savaliya - (B00896729)
 */
import React,{useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
const EditPage = () => {
    const location = useLocation();
    const toast = useToast();
    const [data,setData] = useState({});
    const history = useHistory();
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [desc,setDesc] = useState("");
    const [stock,setStock] = useState(0);
    useEffect(()=>{
      console.log(location.state.data)
        setData(location.state.data);
    },[location])

    const deleteHandler =()=>{
      console.log('deletion started.')
        fetch(`https://solarx-backend.herokuapp.com/admin-product-delete/${data.id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json'
          }
        }).then(resp=>resp.json()).then(result=>{
          toast({
          title: result.message,
          description: "",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        history.push('/admin/dashboard')
        })
    }

    const outOfStockHandler = ()=>{
      console.log("Out of stock started.")
      fetch(`https://solarx-backend.herokuapp.com/admin-out-of-stock/${data.id}`,{
        method:"PUT",
        headers:{
          'Content-Type':'application/json'
        },
      }).then(resp=>resp.json()).then(result=>{
        toast({
          title: result.message,
          description: "",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        history.push('/admin/dashboard')
      })
    }

    const updateHandler = ()=>{
      console.log('updating started.')
      fetch(`https://solarx-backend.herokuapp.com/admin-product-update/${data.id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name: name === "" ? data.name : name,
          description: desc === "" ? data.description : desc,
          stock: stock === 0 ? data.stock : stock,
          price: price === 0 ? data.price : price
        })
      }).then(resp=>resp.json()).then(result=>{
        toast({
          title: result.message,
          description: "",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        history.push('/admin/dashboard')
      })
    }

  return (
    <div style={{ marginTop: "5rem" }}>
      <p className="lead">
        <mark>EDIT</mark> products here!
      </p>
        <div style={{'marginTop':'2rem'}}>
        <div className="input-group mb-3" style={{'width':'40%'}}>
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Product Name
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder={data.name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div className="input-group mb-3" style={{'width':'40%'}}>
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              stock
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder={data.stock}
            onChange={(e)=>setStock(e.target.value)}
          />
        </div>

        <div className="input-group mb-3" style={{'width':'40%'}}>
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Price
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder={data.price}
            onChange={(e)=>setPrice(e.target.value)}
          />
        </div>

        <div className="input-group mb-3" style={{'width':'40%'}}>
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Description
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder={data.description}
            onChange={(e)=>setDesc(e.target.value)}
          />
        </div>
        <div style={{display:'flex','justifyContent':'space-around','color':'#fff','marginTop':'4rem'}}>
            <button type="button" className="btn btn-success" style={{'width':'25%'}} onClick={()=>updateHandler()}>Update</button>
            <button type="button" className="btn btn-danger" style={{'width':'25%'}} onClick={()=>deleteHandler()}>Delete Product</button>
            <button type="button" className="btn btn-warning" style={{'width':'25%'}} onClick={()=>outOfStockHandler()}>Out of Stock</button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
