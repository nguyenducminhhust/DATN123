import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Service } from "../../GlobalState";
import ServiceItem from "./../Service/ServiceItem";
import Header from "../headers/Header";
import "./detailService.css";
import DetailPDSession from "./DetailSVSession";
export default function DetailService() {
  const params = useParams();
  const state = useContext(Service);
  const [services] = state.servicesAPI.services;
  const [detailService, setDetailService] = useState([]);
  const addCart = state.userAPI.addCart;
  const [priceDisplay, setPriceDisplay]= useState(false);
  const [sessionUpdate, setSessionUpdate]= useState("0");

  // lấy dữ liệu dịch vụ
  useEffect(async() => {
    if (params.id) {
     await services.forEach((service) => {
        if (service._id === params.id) {
         setDetailService(service);
        }
      });
    }
  }, [params.id, services]);
  if (detailService.length === 0) return null;
  // set chọn liệu trình
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
        <div className="infodetailservice">
        <div className="imgandpricedetail"><img src={detailService.images.url} alt="" />
        <div className="box-detail">
          <div className="row_id">
            <h2 >{detailService.title}</h2><br/>
            <h6 >#id: {detailService.service_id}</h6>
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
          />
          )})}
          
         <div className="divbuyservicedteail"> 
         <h5>Chọn liệu trình và mua ngay!</h5>
         <Link
            to="/cart"
            className="buttonbuyservice"
            onClick={() => addCart({...detailService, price: priceDisplay, session: sessionUpdate})}
          >
           Đặt Ngay
          </Link>
          </div>
          </div>
          </div>
          </div>
          <div className="detailcontentservice">
          <h2>Vấn đề:</h2>
          <p className="linebreakp">{detailService.description}</p>
          <h2>Giải pháp của Hà Nội Spa:</h2>
          <text className="linebreakp1">{detailService.content}</text>
          
          </div>
      </div>
      </div>
      <div>
        
        <div className="relatedservice">
        <h2>Dịch vụ liên quan:</h2>
        <div className="relatedserviceinfor">
          {services.map((service) => {
            return service.category === detailService.category ? (
              <ServiceItem key={service._id} service={service} />
            ) : null;
          })}
          </div>
        </div>
      </div>
    </>
  );
}
