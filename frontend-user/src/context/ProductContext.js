// import React, { createContext, useState } from "react";
// import "../App.css";
// export const ProductData = createContext(null);

// export const ProductProvider = (props) => {
//   const info = [
//     {
//       id:1,
//       isNew: true,
//       imageURL:
//       "https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c29sYXJ8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=4600&q=80",
//       name: 'Wayfarer Classic',
//       price: 4.5,
//       rating: 4.2,
//       numReviews: 34,
//       description: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
//     },
//     {
//       id:2,
//       isNew: true,
//       imageURL:
//       'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c29sYXJ8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//       name: 'Wayfarer Classic',
//       price: 4.5,
//       rating: 4.2,
//       numReviews: 34,
//       description: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
//     },
//     {
//       id:3,
//       isNew: true,
//       imageURL:
//       'https://images.unsplash.com/photo-1548705102-56b00f2bb299?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c29sYXJ8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//       name: 'Wayfarer Classic',
//       price: 4.5,
//       rating: 4.2,
//       numReviews: 34,
//       description: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
//     },
//     {
//       id:4,
//       isNew: true,
//       imageURL:
//       'https://images.unsplash.com/photo-1501494278684-d0fb421388ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c29sYXJ8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//       name: 'Wayfarer Classic',
//       price: 4.5,
//       rating: 4.2,
//       numReviews: 34,
//       description: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
//     },
//   ]; 
//   const [data, setData] = useState(info);
//   const [cart,setCart] = useState([]);
//   return (
//     <ProductData.Provider value={{ data, setData, cart, setCart }}>
//       {props.children}
//     </ProductData.Provider>
//   );
// };



import React, { createContext, useState } from "react";
import "../App.css";
export const ProductData = createContext(null);

export const ProductProvider = (props) => {
  const [data, setData] = useState([{}]);
  return (
    <ProductData.Provider value={{ data, setData }}>
      {props.children}
    </ProductData.Provider>
  );
};