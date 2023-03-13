import React, { useState, useContext, useEffect} from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./detailService.css";
import { Dialog } from "@material-ui/core";
// import DetailSession from "./DetailSession";
// import "./ContainerService.css";
export default function DetailSVSession({priceandsession, chooseSession }) {
    
  //chooseSession
    return (
       
        
         //   <div className="sobuoilieutrinh">
              <div>
          <button className="Session Type" onClick={()=>chooseSession(priceandsession.price, priceandsession.session)}> Số buổi của liệu trình:  {priceandsession.session}</button>
       
          </div>
        
        )
}


          

