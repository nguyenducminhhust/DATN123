import React, { useState, useContext, useEffect} from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DetailSession from "./DetailSession";
// import "./ContainerService.css";
import "./detailsCS.css"
export default function DetailsCS({userdata, containerservices, userdataprocess}) {
  const [isshowinfo, setisShowInfo] = useState(false);
  const [useridinfo, setUserIdinfo] = useState({
    useridinfos: "",
  });
 
  const [ischeck, setIsCheck] = useState(false);
  const [ischeck2, setIsCheck2] = useState(false);
  const [datashow, setDataShow] = useState([]);
  const [findsessionprocess, setFSP] = useState();
  const [datasessionaftercheck, setDSAC] = useState();
  const showinfo1 = (userdataid) => {
    setUserIdinfo({ useridinfos: userdataid });
    const findDataServiceUser = containerservices.filter((cs) =>
      cs.serviceid === userdataid
    )
    setDataShow(findDataServiceUser);
    setisShowInfo(!isshowinfo);
  };
  const isShow = () => {
    setIsCheck(!ischeck);
  };
  // const isCheckInfoSession = () => {
  //   const pushprocess =findsessionprocess;
  //   setDSAC(pushprocess);
  // };
  const filterProcessUser=(e, serviceid)=>{
   const  value = e;
   let pushprocess;
    const findprocessuser= containerservices.filter((cs)=>
        cs.serviceid ===serviceid
  );
    //const takedetailprocess = findprocessuser[0].detailprocess;
    // const findsessionprocess = takedetailprocess.filter((tdp)=>
    // tdp.session===value
    // )
    for(let i=0; i<findprocessuser.length; i++){
      const checkarrayprocess= findprocessuser[i];
      const checkdetailprocesslength=checkarrayprocess.detailprocess.length;
      for(let i=0; i<checkdetailprocesslength; i++){
        const findsessionprocess = checkarrayprocess.detailprocess;
        if(findsessionprocess[i].session===value){
        // { pushprocess =findsessionprocess[i];
        //   setDSAC(pushprocess);
          setFSP(true); 
          setIsCheck2(true);
        } else{setFSP(false);}
         //setFSP(findsessionprocess[i]);
        //  setFSP(findsessionprocess);
      }
      //  setFSP(checkdetailprocesslength);
    }
   // const pushprocess =findsessionprocess;
    //setDSAC(pushprocess);
}
const checktruefalse =(e)=>{
  const {value} = e.target;
  if(value<5){ setFSP(true);}
  else {setFSP(false);}
}
console.log(findsessionprocess, userdata);

    return (
      <div className="inforcontainerservice">
        <div className="imgandbutcontainer">
          <div className="imgcontainerservice">    <img src={userdata.images.url} alt="" /></div>
          <div className="titleservicename"><p>{userdata.title}</p></div>
          <div className="buttonshowinfocontainer">  <button type="button" className="detailbutcontainerservice" onClick={() => { showinfo1(userdata._id); isShow() }} >Xem thông tin</button></div>
        </div>
        <div className="showdetailcontainer">
        <div>
          {datashow.map((dtshow, index) => {
            return ( 
              (userdata._id === dtshow.serviceid)
              && (userdata.paymentid === dtshow.paymentid)
              && (userdata.email === dtshow.email)
              && ischeck
              && (<DetailSession
                key={index}
                dtshow={dtshow}
                containerservices={containerservices}
              />)
             
            )
          }
          )}
           </div>
        </div>
      </div>
      )
    }


          

