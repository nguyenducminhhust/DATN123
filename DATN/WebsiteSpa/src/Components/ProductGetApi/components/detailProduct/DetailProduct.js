import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Cart2 } from "../../GlobalState";
import ProductItem from "../products/ProductItem";
import Header from "../headers/Header";
import "./detailProduct.css";
import Comment from "./Comment";
import DetailPDSession from "./DetailPDSession";
export default function DetailProduct() {
  const params = useParams();
  const state = useContext(Cart2);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const addCart = state.userAPI.addCart;
  const [priceDisplay, setPriceDisplay]= useState(false);
  const [sessionUpdate, setSessionUpdate]= useState("0");

  console.log(params);
  useEffect(async() => {
    if (params.id) {
     await products.forEach((product) => {
        if (product._id === params.id) {
         setDetailProduct(product);
        }
      });
      // setPriceDisplay(detailProduct.price);
    }
    // 
  }, [params.id, products]);
  //
  console.log({...detailProduct, price: priceDisplay, session: sessionUpdate});
  console.log(priceDisplay, typeof priceDisplay, sessionUpdate, typeof sessionUpdate);
  if (detailProduct.length === 0) return null;
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
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row_id">
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
        { priceDisplay &&( <div className="Session Type"> $ {priceDisplay}  </div>)}
            <p>Chọn liệu trình để xem giá cụ thể:</p>
        <div className="sobuoilieutrinh">
          {detailProduct.price.map((pr, index)=>{
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
          <p className="linebreackp">{detailProduct.description}</p>
          <text className="linebreackp">{detailProduct.content}</text>
          {/* <p>Sold: {detailProduct.sold}</p> */}
          {/* <p>Stock: {detailProduct.stock}</p> */}
          <Link
            to="/cart2"
            className="cart"
            onClick={() => addCart({...detailProduct, price: priceDisplay, session: sessionUpdate})}
          >
            Buy Now
          </Link>
          {/* {products.map((product) => {
        return product._id === params.id ? (
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        
        ) : null;
      })} */}
          {/* <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link> */}
        </div>
      </div>
     
      {/* {products.map((product) => {
        return product._id === params.id ? (
          <Comment key={product._id} product={product} />
        ) : null;
      })} */}
      <div>
        <h2>Sản phẩm liên quan:</h2>
        <div className="relatedservice">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
