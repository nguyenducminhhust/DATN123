import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
import Header from "../headers/Header";
import ServiceItem from "./ServiceItem";
import Loading from "../utils/loading/Loading";
import "./services.css";
import axios from "axios";
import Filter from "./Filters";
import LoadMore from "./LoadMore";
import Footer from "../Footer/Footer";
import img from "./../../../assets/images/spa3.jpg";
import HeaderNode from "../HeaderNode/HeaderNode";
import Slider from "./Slider/Slider";
import ReactPaginate from "react-paginate";
import Servicesub from "./Servicesub";
import Contact from "../Contact/Contact";
export default function Services() {
  const state = useContext(Service);
  const [services, setServices] = state.servicesAPI.services;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.servicesAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [category, setCategory] = state.categoriesAPI.categories;       
  const handleCheck = (id) => {
    services.forEach((service) => {
      if (service._id === id) service.checked = !service.checked;
    });
    setServices([...services]);
  };
  console.log(services);

  const deleteService = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteService = axios.delete(`/api/services/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteService;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    services.forEach((service) => {
      service.checked = !isCheck;
    });
    setServices([...services]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    services.forEach((service) => {
      if (service.checked) deleteService(service._id, service.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      {/* {!isAdmin && (
        <>
          <HeaderNode />
        </>
      )} */}
      <Header />
     <div className="mainservice">
      <div>
      {!isAdmin && (
          <div className="imagesetsize">
            <img src={img} className="card-img" alt="Background" />
          </div>
      )}
     
      {!isAdmin && (
        <>
          {/* <div className="featureservice">
            <h1 className="featureservicefont">
              FEATURED SERVICE
            </h1>
            <hr />
          </div> */}
        <div className="sildersetsize">  <Slider /></div>
        </>
      )}
      </div>
    
      {/* <div className="service">
        <h1 className="service font"> Service </h1>
     
      </div> */}
      <Filter />
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}
      <div className="contactandservice">
        <div className="serviceWrapper">
        {(!isAdmin)&&( <div className="contactsize">
      <Contact/>
        
        </div>)}  
      <div className="categoryservice">
      {category.map((ctg, index)=>{
        return(
          <Servicesub 
          key={index}
          category={ctg}
          services={services}
          isAdmin={isAdmin}
          deleteService={deleteService}
          handleCheck={handleCheck}
          
          
          />
        )
      }
      
      )}
      </div>
      </div>
      </div>
      {services.length === 0 && <Loading />}
      <div>
      <Footer />
      </div>
      </div>
    </>
  );
}
