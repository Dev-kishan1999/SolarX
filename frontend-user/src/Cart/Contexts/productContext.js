/*
 * @author: Prachi Raval - B00883324
 *
 * This file stores product data used all around the code.
 */


import React, { createContext, useState } from "react";
import "../App.css";
export const ProductData = createContext(null);

export const ProductProvider = (props) => {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userid");

  return (
    <ProductData.Provider value={{ data, setData }}>
      {props.children}
    </ProductData.Provider>
  );
};
