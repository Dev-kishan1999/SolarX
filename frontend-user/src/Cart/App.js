import "./assets/css/App.css";
import React, { useState } from "react";
// import Header from "./Cart/Pages/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./Cart/Contexts/productContext";

//prachi
import Cartmain from "./Cart/CartPage/Cartmain";
import Products from "./Cart/SolarPanels/Products";
import MyOrders from "./Cart/ViewOrders/MyOrders";
import Home from "./HomePage/Home";
import Blogs from "../src/Blogs/Blogs";
import HeaderHome from "./HomePage/HeaderHome";
// import FeedbackModal from "./ModalFeed/FeedbackModal";
import FeedbackPage from "./ModalFeed/FeedbackPage";

//radhey
import Billprediction from "./views/PackagePrediction/billprediction";
import CostPrediction from "./views/PackagePrediction/costprediction";

//Kavya
import Login from "./views/Authentication/Login";
import ForgetPassword from "./views/Authentication/ForgetPassword";
import Register from "./views/Authentication/Register";

//Mayank
import Payment from "./views/Payment/Payment";
import theme from "./theme/theme";
import UserManagement from "./views/UserManagement/UserManagement";

//Meghna
import Appointments from "./services/New1";

//import NavBar from './views/Navbar/components/Header';
//import Navbar from './views/Navbar/Navbar';

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

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <BrowserRouter>
        <ProductProvider>
          {/* <Navbar /> */}
          <Routes>
            {/* kavya */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/fp" element={<ForgetPassword />} />
            <Route exact path="/register" element={<Register />} />
            <Route element={<AuthLayout />}>
              {/* prachi */}
              <Route exact path="/" element={<Home />} />
              <Route
                path="/Cartmain"
                element={<Cartmain message={userData} />}
              />
              <Route path="/MyOrders" element={<MyOrders />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route
                path="/products"
                element={<Products parentCallback={handleCallback} />}
              />
              <Route exact path="/contactus" element={<FeedbackPage />} />

              {/* radhey */}
              <Route exact path="/billpred" element={<Billprediction />} />
              <Route
                exact
                path="/costprediction"
                element={<CostPrediction />}
              />

              {/* mayank */}
              <Route exact path="/payment" element={<Payment />} />
              <Route exact path="/profile" element={<UserManagement />} />
              {/* meghna */}
              <Route exact path="/appointment" element={<Appointments />} />
            </Route>
          </Routes>
        </ProductProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
