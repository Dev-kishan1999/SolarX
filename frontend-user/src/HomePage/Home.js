/*
 * @author: Prachi Raval - B00883324
 *
 * This file is the main home page of the application.
 */

import React, { useEffect } from "react";

import SplitWithImage from "./SplitWithImage";
import StatsGridWithImage from "./StatsGridWithImage";
import Footer from "./Footer";
import SimpleThreeColumns from "./SplitThreeColumns";
import Details from "./Details";
import HeaderHome from "./HeaderHome";
import { IoMagnet } from "react-icons/io5";
import Reviews from "./Reviews";
import Gradient from "./Gradient";
import FeedbackPage from "../ModalFeed/FeedbackPage";
import Userfeedback from "../services/Userfeedback";


export default function Home() {
  
  return (
    <>
      <Gradient></Gradient>
      <SimpleThreeColumns></SimpleThreeColumns>
      <SplitWithImage></SplitWithImage>

      <Details></Details>

      <StatsGridWithImage></StatsGridWithImage>

      <Userfeedback></Userfeedback>
      <Footer></Footer>
    </>
  );
}
