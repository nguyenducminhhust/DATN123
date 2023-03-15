import React, { useState, useContext, useEffect} from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DetailSession from "./DetailSession";
// import "./ContainerService.css";
import "./detailsCS.css"
export default function DetailsCS({userdata}) {
  const state = useContext(Service);
  const [token] = state.token;
  const [isshowinfo, setisShowInfo] = useState(false);
  const [useridinfo, setUserIdinfo] = useState({
    useridinfos: "",
  });
  const [containerservices, setContainerServices] = state.containerserviceAPI.containerservice;
  const [callback, setCallBack] = state.containerserviceAPI.callback;
  const [ischeck, setIsCheck] = useState(false);
  const [datashow, setDataShow] = useState([]);
  // Lấy dữ liệu liệu trình
  useEffect(() => {
    const getContainerServices = async () => {
      const res = await axios.get("/api/containerservice");
      console.log(res);
      setContainerServices(res.data);
    };

    getContainerServices();
  }, [callback]);
  // set thông tin liệu trình, hiển thị thông tin
  const showinfo1 = (userdataid) => {
    setUserIdinfo({ useridinfos: userdataid });
    const findDataServiceUser = containerservices.filter((cs) =>
      cs.serviceid === userdataid
    )
    setDataShow(findDataServiceUser);
    setisShowInfo(!isshowinfo);
    setCallBack(!callback);
  };
  const isShow = () => {
    setIsCheck(!ischeck);
  };
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
                index={index}
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


          

