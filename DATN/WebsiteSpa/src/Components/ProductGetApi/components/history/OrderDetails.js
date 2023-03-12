import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Cart2 } from "../../GlobalState";
import Header from "../headers/Header";
import Footer from "../Footer/Footer";
import "./history.css"
export default function OrderDetails() {
  const state = useContext(Cart2);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);
  const params = useParams();
  const [isAdmin] = state.userAPI.isAdmin;
  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  return (
    <>
      <Header />{" "}
      <div className="history-page">
        <h2>Thông Tin Khách Hàng</h2>
        <table style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Địa Chỉ Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orderDetails.name}</td>
              <td>
                {orderDetails.email}
              </td>
            </tr>
          </tbody>
        </table>

        <table style={{ margin: "30px 0px", textAlign: "center" }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh Dịch Vụ</th>
              <th>Dịch Vụ</th>
              <th>Tổng số buổi làm</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.cart.map((item,index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>
                <img src={item.images.url} alt="" />
                </td>
                <td>{item.title}</td>
                <td>{item.session}</td>
                <td>{item.price}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br/>
      <br/>
      {!isAdmin && (
        <>
          <Footer />
        </>
      )}
    </>
  );
}
