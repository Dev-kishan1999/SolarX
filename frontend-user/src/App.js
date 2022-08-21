import "./assets/css/App.css";
import React, { useContext, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ProductProvider } from "./Cart/Contexts/productContext";

//prachi
import Cartmain from "./Cart/CartPage/Cartmain";
import Products from "./Cart/SolarPanels/Products";
import MyOrders from "./Cart/ViewOrders/MyOrders";
import Home from "./HomePage/Home";
import Blogs from "../src/Blogs/Blogs";
import HeaderHome from "./HomePage/HeaderHome";
import FeedbackPage from "./ModalFeed/FeedbackPage";

//radhey
import Billprediction from "./views/PackagePrediction/billprediction";
import CostPrediction from "./views/PackagePrediction/costprediction";

//Kavya
import Login from "./views/Authentication/Login";
import ForgetPassword from "./views/Authentication/ForgetPassword";
import Register from "./views/Authentication/Register";

//Mayank
import theme from "./theme/theme";
import UserManagement from "./views/UserManagement/UserManagement";

//Meghna
import ServicesPage from "./services/ServicesPage";

// Layout for login
import { Outlet } from "react-router";

const AuthLayout = () => (
  <>
    <HeaderHome />
    <main>
      <div>
        <Outlet />
      </div>
    </main>
  </>
);

const App = (props) => {
  const [userData, setUserData] = useState({});
  const handleCallback = (childData) => {
    setUserData(childData);
  };
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLoggedin(true);
    }
  }, []);

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <BrowserRouter>
        <ProductProvider>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/fp" element={<ForgetPassword />} />
            <Route exact path="/register" element={<Register />} />
            <Route element={<AuthLayout />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route exact path="/contactus" element={<FeedbackPage />} />
              <Route exact path="/billpred" element={<Billprediction />} />
              <Route
                exact
                path="/costprediction"
                element={<CostPrediction />}
              />
              <Route
                path="/Cartmain"
                element={<Cartmain message={userData} />}
              />
              <Route
                path="/products"
                element={<Products parentCallback={handleCallback} />}
              />
              <Route path="/MyOrders" element={<MyOrders />} />
              <Route exact path="/profile" element={<UserManagement />} />
              <Route exact path="/appointment" element={<ServicesPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </ProductProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
