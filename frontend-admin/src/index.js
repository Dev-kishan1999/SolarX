import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import {  Route, Switch, Redirect,BrowserRouter } from "react-router-dom"; //"react-router-dom": "^5.3.0"
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
    
        <BrowserRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          
          
          <Redirect from='/' to='/auth' />
        </Switch>
        </BrowserRouter>
      
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
