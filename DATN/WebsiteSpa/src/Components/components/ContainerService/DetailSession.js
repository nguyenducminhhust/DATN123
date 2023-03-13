import React, { useState, useContext, useEffect} from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./detailsCS.css"
export default function DetailSession({dtshow, containerservices}) {
  const state = useContext(Service);
  const [isshowinfo, setisShowInfo] = useState(false);
  const [useridinfo, setUserIdinfo] = useState({
    useridinfos: "",
  });
  const [isAdmin] = state.userAPI.isAdmin;
  const [isStaff] = state.userAPI.isStaff;
  const [ischeck, setIsCheck] = useState(false);
  const [test, setTest]=useState(false);
  const [datashow, setDataShow] = useState([]);
  const [findsessionprocess, setFSP] = useState();
  const [datasessionaftercheck, setDSAC] = useState();
  const [payment, setPayment]= state.paymentAPI.payment;
  // const [cs]=state.containerserviceAPI.containerservice;
  const showinfo1 = (userdataid) => {
    setUserIdinfo({ useridinfos: userdataid });
    const findDataServiceUser = containerservices.filter((cs) =>
      cs.serviceid === userdataid
    )
    setDataShow(findDataServiceUser);
    setisShowInfo(!isshowinfo);
  };
  console.log(dtshow,containerservices);
  const isShow = () => {
    if(datasessionaftercheck){setIsCheck(true);}
     else {setIsCheck(false);}
    
  };
  // console.log(datasessionaftercheck);
  const [ischeck2, setIsCheck2] = useState(false);
  const filterProcessUser= async(e, serviceid)=>{
   const  value = parseInt(e); 
   let pushprocess=[];
    const findprocessuser= containerservices.filter((cs)=>
        cs.serviceid ===serviceid
  );
     //value, serviceid, 
    for(let i=0; i<findprocessuser.length; i++){
      const checkarrayprocess= findprocessuser[i].detailprocess;
      pushprocess.push(checkarrayprocess);
    }
    const takelistpushprocess = pushprocess[0];
    setTest(takelistpushprocess);
    for(let i=0; i<takelistpushprocess.length; i++){
    if(takelistpushprocess[i].session==value){
      setDSAC(takelistpushprocess[i]);
      
      setIsCheck(true);
      break;
    } else { setIsCheck(false);}
    }
    
}
console.log(test, typeof test);
const setActivePayment = async(dtshow)=>{

await axios.patch("api/payment", {paymentID: dtshow.paymentid, status: true});
alert("Update Status Sucesss")

}
const checkPaymentID = (payid)=> payment.filter((pay) => //Lọc ra  payment trong containerservice==payment id
pay.paymentID === payid );
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
          </div>
          <div className="selectinfoservice">
              <select 
              className="selectprocess"
              name ="selectprocess"
              onChange={e=> {filterProcessUser(e.target.value, dtshow.serviceid)}}
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
      
      

          

