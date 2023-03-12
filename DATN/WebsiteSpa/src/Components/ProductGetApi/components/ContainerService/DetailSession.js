import React, { useState, useContext, useEffect} from "react";
import { Cart2 } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./detailsCS.css"
export default function DetailSession({dtshow, containerservices}) {
  const state = useContext(Cart2);
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
  const [ischeck2, setIsCheck2] = useState(false);
  const filterProcessUser= async(e, serviceid)=>{
   const  value = parseInt(e); 
   let pushprocess=[];
    const findprocessuser= containerservices.filter((cs)=>
        cs.serviceid ===serviceid
  );
    setTest(value, serviceid, findprocessuser );
    for(let i=0; i<findprocessuser.length; i++){
      const checkarrayprocess= findprocessuser[i].detailprocess;
      pushprocess.push(checkarrayprocess);
    }
    const takelistpushprocess = pushprocess[0];
    for(let i=0; i<takelistpushprocess.length; i++){
    if(takelistpushprocess[i].session==value){
      setDSAC(takelistpushprocess[i]);
      
      setIsCheck(true);
      break;
    } else { setIsCheck(false);}
    }
    
}
console.log(ischeck2);
console.log(test);
    return (
      <div key={dtshow._id} className="detailprocessservice">
        <div className="infodetailservice1">
          <div>
              <p >Lần mua thứ: {dtshow.timebought} </p>
              <p >Tên dịch vụ: {dtshow.servicename}</p>
              <p >Tổng số buổi liệu trình: {dtshow.totalsession}</p>
              <p >Đã làm: {dtshow.detailprocess.length}/{dtshow.totalsession}</p>
          </div>
            <div className="fillinfoservice">
            {(isAdmin||isStaff)&&(
            <div className="fillinfoservicebut">
            <Link
            id="button update"
            to={`update_process/${dtshow._id}`}
          > Điền thông tin
          </Link>
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
      
      

          

