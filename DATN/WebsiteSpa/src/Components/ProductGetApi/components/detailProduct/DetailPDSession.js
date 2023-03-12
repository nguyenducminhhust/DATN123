import React, { useState, useContext, useEffect} from "react";
import { Cart2 } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./detailProduct.css";
import { Dialog } from "@material-ui/core";
// import DetailSession from "./DetailSession";
// import "./ContainerService.css";
export default function DetailPDSession({priceandsession, chooseSession }) {
    
  //chooseSession
    return (
       
        
         //   <div className="sobuoilieutrinh">
              <div>
          <button className="Session Type" onClick={()=>chooseSession(priceandsession.price, priceandsession.session)}> Số buổi của liệu trình:  {priceandsession.session}</button>
       
          </div>
        
        )
}


          

