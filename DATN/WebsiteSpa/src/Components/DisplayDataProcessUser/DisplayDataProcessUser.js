import React, { useContext, useState, useEffect } from "react";
import { Service } from "../GlobalState";
import Header from "../components/headers/Header";
import axios from "axios";
export default function DisplayDataProcessUser() {
  const state = useContext(Service);
  
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.dataprocesscustomerAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [timecheck, setTimeCheck] = useState({timecheck1: "",});
  const [dpulistcheck, setDpuListCheck] = useState([]);
  const [dpus, setDPUs] = state.dataprocesscustomerAPI.dataprocesscustomer;
useEffect(() => {
    
    const res = dpus.filter((dpulist) =>
    dpulist.daymake === timecheck.timecheck1
    )
    setDpuListCheck(res)
  }, [isCheck])
const handleChangeInputDate = (e) => {
    const { name, value } = e.target;
    setTimeCheck({ [name]: value.toString() });
    setIsCheck(!isCheck);
  };
  console.log( timecheck.timecheck1)
    return (
        <>
            <Header />      
            <div className="col-12 mb-5">
                <h1 className="display-6 fw-bolder text-center"> Service </h1>
                <hr />
            </div>
            <input
            type="date"
            name="timecheck1"
            required
            onChange={handleChangeInputDate}
          />
            <div className="dpus">
                {dpulistcheck.map((dpu) => {
                    return (
                        <div className="dpu_card" key={dpu._id}>
                            <img src={dpu.images.url} alt="" />

                            <div className="dpu_box">

                                <p>{dpu.staff}</p>
                                <p>{dpu.daymake}</p>
                                <p>{dpu.service}</p>
                                <p>Session:</p>
                                <p>{dpu.session}</p>
                            </div>


                        </div>
                    );
                })}
            </div>
         
        </>
    );
}
