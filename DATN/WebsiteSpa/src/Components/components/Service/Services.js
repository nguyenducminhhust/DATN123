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
  // chọn dịch vụ để thao tác
  const handleCheck = (id) => {
    services.forEach((service) => {
      if (service._id === id) service.checked = !service.checked;
    });
    setServices([...services]);
  };
  // xóa dịch vụ
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
  // chọn tất cả dịch vụ
  const checkAll = () => {
    services.forEach((service) => {
      service.checked = !isCheck;
    });
    setServices([...services]);
    setIsCheck(!isCheck);
  };
  // xóa tất cả dịch vụ
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
          
        <div className="sildersetsize">  <Slider /></div>
        </>
      )}
      </div>
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
