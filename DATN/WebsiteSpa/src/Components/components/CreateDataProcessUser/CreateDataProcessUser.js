import React, { useState, useContext, useEffect } from "react";
//import "./createProduct.css";
import axios from "axios";
import { Service } from "../../GlobalState";
import Loading from "../utils/loading/Loading";
import Header from "../headers/Header";
import { useNavigate, useParams } from "react-router-dom";
import DetailsCS from "../ContainerService/DetailsCS";
import "./CreateDataProcessUser.css"
//DataProcessUser-DPU
//dataprocesscustomer-dpu
const initialState = {
  dataprocesscustomerid: "",
    session: 1 ,
    staff: "",
    daymake:"",
    service:"",
};

export default function CreateDataProcessUser() {
  const state = useContext(Service);
  const [getdatauser, setGetDataUser] = useState([]);
  const [token] = state.token;
  const [userdata, setUserData] = state.alluserAPI.alluser;
  const [check, setCheck] = useState(false);
  const [upcs, setUPCS]= state.containerserviceAPI.containerservice;
  const [callback1, setCallBack1]= useState(false);
  const [useremail, setUserEmail] = useState({
    useremail1: "",
  });
  const [serviceboughtcheck, setSBK] = useState();
  const handleEmail = (e) => {
    const { name, value } = e.target;
    setUserEmail({ useremail1: value });
    
  }
  // kiểm tra dữ liệu khách thông qua email
  const checkemailSubmit = () => {
    const CheckEmail =  userdata.filter((userlist) => userlist.email == useremail.useremail1.toLowerCase() )

    if(CheckEmail.length >=1)
    { setGetDataUser(CheckEmail);
    setSBK( CheckEmail[0].servicebought);
    setCheck(true);
    setCallBack1(!callback1);
    }
    else {setCheck(false); 
    }
    
  };

  return (
    <>
      {/* {isStaff&&(<Header />)}   */}
      <div className="searchinforcustomer">
      <input
            type="text"
            name="email"
            required
            placeholder="Email"
            Value={useremail.useremail1}
            onChange={handleEmail}
          />
          <button className="buttonsearchinforcustomer" type="button" onClick={checkemailSubmit}>Tìm theo Email</button>
      </div>
  { check&&(
      <div className="dpus2">
        {serviceboughtcheck.map((userdata, index) => {
          return (   
                <DetailsCS 
                key={index}
                // index={index}
                userdata={userdata}
                containerservices= {upcs}
                userdataprocess={serviceboughtcheck}
                />         
          )
          })}                                                
              </div> )}  
    </>
  );
}
