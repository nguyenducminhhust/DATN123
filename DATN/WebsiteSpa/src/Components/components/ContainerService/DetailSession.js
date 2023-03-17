import React, { useState, useContext, useEffect} from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./detailsCS.css"
export default function DetailSession({index, dtshow, containerservices}) {
  const state = useContext(Service);
  const [token] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isStaff] = state.userAPI.isStaff;
  const [user, setUser]= state.userAPI.user;
  const [ischeck, setIsCheck] = useState(false);
  const [test, setTest]=useState(false);
  const [datasessionaftercheck, setDSAC] = useState();
  const [payment, setPayment]= state.paymentAPI.payment;
  const [ischeck2, setIsCheck2] = useState(false);
  // Xử lý dữ liệu điều trị khách hàng theo buổi được chọn
  const filterProcessUser= async(e, serviceid, index)=>{
   const  {name, value} = e.target;
   const value1 = parseInt(value)
   let pushprocess=[];
    const findprocessuser= containerservices.filter((cs)=>
        cs.serviceid ===serviceid
  );
  for(let i=0; i<findprocessuser.length; i++){
    const checkarrayprocess= findprocessuser[i].detailprocess;
    pushprocess.push(checkarrayprocess);
  }
  const takelistpushprocess = pushprocess[index];
    
    for(let i=0; i<takelistpushprocess.length; i++){
    if(takelistpushprocess[i].session==value1){
      setDSAC(takelistpushprocess[i]);
      setIsCheck(true);
      break;
    } else { setIsCheck(false);}
    }
    
};
// kích hoạt liệu trình sau khi khách thanh toán/ cọc
const setActivePayment = async(dtshow)=>{

await axios.patch("api/payment", {paymentID: dtshow.paymentid, status: true});
alert("Đã cập nhật trạng thái thành công!")
}

console.log(user.name, user.debt);
const cancelService = async(dtshow)=>{
const filterpayment = payment.filter((pay)=>
  pay.paymentID === dtshow.paymentid
);
  const getPriceService= getPrice(filterpayment[0], dtshow.servicename);
 
  const handledebt = user.debt - getPriceService-(getPriceService/dtshow.totalsession)*dtshow.detailprocess.length;
  const _id = dtshow._id;
  // setTest(changeToBalance);
  try {
    await axios.patch(
      "/user/updatedebt",
      {handledebt},
      {
        headers: { Authorization: token },
      }
    );
    await axios.patch(
      "/api/updatestatuscontainerservice",
      {_id: _id, status: false},
      
    )
    
    
    alert("Đã hủy dịch vụ");
} catch (err) {
  alert(err.response.data.msg);
}

  }
  const getPrice = (arr, item) => {
    const filtered = arr.cart.filter(obj => obj.title === item);
    const prices = filtered.map(obj => obj.price);
    
    return prices[0];

  }
  console.log(test);
//Lọc ra  thanh toán trong containerservice==payment id
const checkPaymentID = (payid)=> payment.filter((pay) => 
pay.paymentID === payid );
// trả về trạng thái của payment
const statuspayment = (payid)=>{
  const checkpayment = checkPaymentID(payid);
  const status = checkpayment[0].status;
  return status;
}
    return (
      <div key={dtshow._id} className="detailprocessservice">
        <div className="infodetailservice1">
          <div>
              <p >Mã mua: {dtshow.paymentid} </p>
              <p >Lần mua thứ: {dtshow.timebought} </p>
              <p >Tên dịch vụ: {dtshow.servicename}</p>
              <p >Tổng số buổi liệu trình: {dtshow.totalsession}</p>
              <p >Đã làm: {dtshow.detailprocess.length}/{dtshow.totalsession}</p>
          </div>
            <div className="fillinfoservice">
            {(isAdmin||isStaff)&&(
            <div className="fillinfoservicebut">
            {statuspayment(dtshow.paymentid)?(<Link
            id="button update"
            to={`update_process/${dtshow._id}`}
          > Điền thông tin
          </Link>):(<button type="button" onClick={()=>setActivePayment(dtshow)}>Kích Hoạt</button>)}
          </div>
          )}
            {(!isAdmin && !isStaff) && (
              <button type="button" onClick={() => cancelService(dtshow)}>Hủy dịch vụ</button>
            )}
          </div>
          <div className="selectinfoservice">
              <select 
              className="selectprocess"
              name ="selectprocess"
              onChange={e=> {filterProcessUser(e, dtshow.serviceid, index)}}
              >
                <option value="0">  Chọn buổi liệu trình </option>
                {dtshow.detailprocess.map((dts, index)=>{
                return(
                          <option value={index+1}>  Buổi làm thứ {index+1}             </option>
                )
                 } )}
                 </select>
                 </div>
                 </div>
                 <div className="detailbysession">
                 
                {(ischeck)&&(
                  <div className="detailbysession2">
                    <div className="detailbysession3">
                    <img src={datasessionaftercheck.images.url} alt="" />
                    </div>
                    <div className="detailbysession4">
                    <p>Nhân viên thực hiện: {datasessionaftercheck.staff} </p>
                    <p>Buổi làm thứ:  {datasessionaftercheck.session}</p>
                    <p>Ngày làm:  {datasessionaftercheck.daymake}</p>
                    <p>Dịch vụ:  {datasessionaftercheck.service} </p>
                  
                    </div>
                    </div>
                    )}
                    
            </div>
           </div>
            
          )
        }
      
      

          

