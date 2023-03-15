import React, { useContext, useEffect } from "react";
import { Service } from "../../GlobalState";
import { Link } from "react-router-dom";
import Header from "../headers/Header";
import "./history.css";
import axios from "axios";
import Footer from "../Footer/Footer";
export default function OrderHistory() {
  const state = useContext(Service);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  // Lấy toàn bộ dữ liệu đặt hàng nếu là Admin hoặc lấy dữ liệu đặt hàng riêng từng khách hàng
  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);
 
  return (
    <>
      <Header />
      <div className="history-page">
        <h2>LỊCH SỬ MUA DỊCH VỤ</h2>
        <h4>TỔNG CÓ {history.length} ĐƠN HÀNG</h4>

        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Thanh Toán ID</th>
              <th>Ngày Mua</th>
              <th> Xem Chi Tiết</th>
            </tr>
          </thead>
          <tbody>
            {history.map((items, index) => (
              <tr key={items._id}>
                <td>{index+1}</td>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>Xem</Link>
                </td>
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
