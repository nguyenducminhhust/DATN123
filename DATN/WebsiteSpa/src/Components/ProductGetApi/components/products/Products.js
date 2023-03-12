import React, { useContext, useState, useEffect } from "react";
import { Cart2 } from "../../GlobalState";
import Header from "../headers/Header";
import ProductItem from "./ProductItem";
import Loading from "../utils/loading/Loading";
import "./products.css";
import axios from "axios";
import Filter from "./Filters";
import LoadMore from "./LoadMore";
import Footer from "../../components/Footer/Footer";
import img from "../../../../assets/images/spa3.jpg";
import HeaderNode from "../HeaderNode/HeaderNode";
import Slider from "./Slider/Slider";
import ReactPaginate from "react-paginate";
import Productsub from "./Productsub";
import Contact from "../Contact/Contact";
export default function Products() {
  const state = useContext(Cart2);
  const [products, setProducts] = state.productsAPI.products;
  console.log(products);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [category, setCategory] = state.categoriesAPI.categories;       
  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
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
          <div className="featureservice">
            <h1 className="featureservicefont">
              FEATURED SERVICE
            </h1>
            <hr />
          </div>
        <div className="sildersetsize">  <Slider /></div>
        </>
      )}
      </div>
    
      <div className="service">
        <h1 className="service font"> Service </h1>
     
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
      <div className="contactsize">
        <Contact/>
        
        </div>
      <div className="categoryservice">
      {category.map((ctg)=>{
        return(
          <Productsub 
          category={ctg}
          products={products}
          isAdmin={isAdmin}
          deleteProduct={deleteProduct}
          handleCheck={handleCheck}
          
          
          />
        )
      }
      
      )}
      </div>
      </div>
      </div>
      {products.length === 0 && <Loading />}
      <div>
      <Footer />
      </div>
      </div>
    </>
  );
}
