import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Service } from "../../GlobalState";
import ServiceItem from "./../Service/ServiceItem";
import Header from "../headers/Header";
import "./detailService.css";
import Comment from "./Comment";
import DetailPDSession from "./DetailSVSession";
export default function DetailService() {
  const params = useParams();
  const state = useContext(Service);
  const [services] = state.servicesAPI.services;
  const [detailService, setDetailService] = useState([]);
  const addCart = state.userAPI.addCart;
  const [priceDisplay, setPriceDisplay]= useState(false);
  const [sessionUpdate, setSessionUpdate]= useState("0");

  console.log(params);
  useEffect(async() => {
    if (params.id) {
     await services.forEach((service) => {
        if (service._id === params.id) {
         setDetailService(service);
        }
      });
    }
    // 
  }, [params.id, services]);
  //
  // console.log({...detailService, price: priceDisplay, session: sessionUpdate});
  // console.log(priceDisplay, typeof priceDisplay, sessionUpdate, typeof sessionUpdate);
  if (detailService.length === 0) return null;
  const chooseSession =(price, session)=>{
    const priceint = parseInt(price,10);
    const sessionint = parseInt(session,10);
    setPriceDisplay(priceint);
    setSessionUpdate(sessionint);
   
  };
  return (
    <>
      <Header />
      <div className="detail">
        <img src={detailService.images.url} alt="" />
        <div className="box-detail">
          <div className="row_id">
            <h2>{detailService.title}</h2>
            <h6>#id: {detailService.service_id}</h6>
          </div>
        { priceDisplay &&( <div className="Session Type"> $ {priceDisplay}  </div>)}
            <p>Chọn liệu trình để xem giá cụ thể:</p>
        <div className="sobuoilieutrinh">
          {detailService.price.map((pr, index)=>{
          return(
        
          <DetailPDSession
          key={index}
          priceandsession={pr}
          chooseSession={chooseSession}
          // containerservices= {containerservices}
          // userdataprocess={userdataprocess}
          />
          )})}
          </div>
          <p className="linebreackp">{detailService.description}</p>
          <text className="linebreackp">{detailService.content}</text>
          {/* <p>Sold: {detailService.sold}</p> */}
          {/* <p>Stock: {detailService.stock}</p> */}
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart({...detailService, price: priceDisplay, session: sessionUpdate})}
          >
            Buy Now
          </Link>
          {/* {services.map((service) => {
        return service._id === params.id ? (
          <Link id="btn_view" to={`/detail/${service._id}`}>
            View
          </Link>
        
        ) : null;
      })} */}
          {/* <Link id="btn_view" to={`/detail/${service._id}`}>
            View
          </Link> */}
        </div>
      </div>
     
      {/* {services.map((service) => {
        return service._id === params.id ? (
          <Comment key={service._id} service={service} />
        ) : null;
      })} */}
      <div>
        <h2>Dịch vụ liên quan:</h2>
        <div className="relatedservice">
          {services.map((service) => {
            return service.category === detailService.category ? (
              <ServiceItem key={service._id} service={service} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
