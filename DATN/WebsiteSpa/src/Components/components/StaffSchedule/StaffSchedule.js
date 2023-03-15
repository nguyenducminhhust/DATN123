import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../headers/Header";
import axios from "axios";
import SubStaffSchedule from "./SubStaffSchedule";
import "./schedule.css"
const initialState = {
    email:"",
    service: "",
    arraytimework : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], // mảng thời gian
    namestaff:"",
    daywork:"",

};
export default function StaffSchedule() {
  const state = useContext(Service);
  const [staffschedule, setStaffSchedule] = useState(initialState);
  const history = useNavigate();
  const [callback, setCallback] = state.bookingAPI.callback;
  const [dayworkcheck, setDayWorkCheck] = useState();
  const [staffschedulecheck, setStaffScheduleCheck]=state.staffscheduleAPI.staffschedule;
  const [scheduleaftercheck, setScheduleAfterCheck] = useState();
   const minDate = new Date();
   const maxDate = new Date();
   minDate.setTime(minDate.getTime()+7*60*60*1000); //+ 7 tiếng
   minDate.setDate(minDate.getDate()+1);
   maxDate.setDate(maxDate.getDate()+14); // 2 tuần
   maxDate.setTime(maxDate.getTime()+7*60*60*1000); //+ 7 tiếng
   const [isStaff]= state.userAPI.isStaff;
   const [ischeckschedule, setIsCheckSchedule] = useState(false);
// Chọn ngày xem lịch nhân viên
   const dayworkchoose =async(e)=>{ 
      const{name,value}=e.target;
      setDayWorkCheck(value);
    }
    // lấy dữ liệu lịch nhân viên
  useEffect(() => {
    const getStaffSchedules = async () => {
      const res = await axios.get(
        `/api/staffschedule`
      );
      setStaffScheduleCheck(res.data);
    };
    getStaffSchedules();
     const checkschedule = staffschedulecheck.filter((scc)=>
      scc.daywork==dayworkcheck
      )
      setScheduleAfterCheck(checkschedule);
      if(checkschedule){
      setIsCheckSchedule(true);}
      else {
        setIsCheckSchedule(false);
      }
    
  }, [dayworkcheck, callback])
// set ngày làm việc
  const handleChangeInputDate = (e) => {   
    const { name, value } = e.target;
    setStaffSchedule({ ...staffschedule, [name]: value.toString() });
  };
  // xử lý giá trị nhập vào
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const newvalue= value.toLowerCase();
    setStaffSchedule({ ...staffschedule, [name]: newvalue});
  }
  const handleChangeInput1 = (e) => {
    const { name, value } = e.target;
    const newvalue= value;
    setStaffSchedule({ ...staffschedule, [name]: newvalue});
  }
  // Xóa lịch của nhân viên trên bảng 
  const handleDeleteClick = async (staffid)=>{
    try {
      const param = staffid._id;
      await axios.delete(`/api/staffschedule/${param}`, {_id: staffid._id}); 
      setCallback(!callback);
      alert("Xóa thành công!");
    } catch (err) {
      alert(err.response.data.msg);
    }
}
  // xử lý tạo lịch nhân viên
  const scheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/staffschedule", { ...staffschedule});
      setCallback(!callback);
    alert("Tạo thành công");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
   <>
      {(isStaff) && (<Header />)}
      <div className="staffschedulecontainer">
        <div className="bookingpage">
          <form onSubmit={scheduleSubmit}>

            <h1>Tạo Lịch Nhân Viên</h1>

            <input
              type="text"
              name="email"
              className="inputemailandname"
              required
              placeholder="Điền Email Nhân Viên"
              defaultValue={staffschedule.email}
              onChange={handleChangeInput}
            />
            <input
              type="text"
              className="inputemailandname"
              name="namestaff"
              required
              placeholder="Điền Tên Nhân Viên"
              defaultValue={staffschedule.namestaff}
              onChange={handleChangeInput1}
            />
            <input
              type="date"
              name="daywork"
              className="daywork"
              placeholder="dd-mm-yyyy"
              min={minDate.toISOString().substring(0, 10)}
              max={maxDate.toISOString().substring(0, 10)}
              required
              onChange={handleChangeInputDate}
            />
            <div className="buttonsubmitbooking">
              <button type="submit">Tạo</button>
            </div>
          </form>

        </div>
        <div className="tableschedule">
          <table>
            <thead>
              <tr>Ngày Làm {dayworkcheck}<input type="date" onChange={dayworkchoose} /></tr>
              <tr>
                <th>STT</th>
                <th>Tên Nhân Viên</th>
                <th>Email Nhân Viên</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {(ischeckschedule) && (
                scheduleaftercheck.map((sac, index) => {
                  return (
                    <SubStaffSchedule
                      index={index}
                      scheduleaftercheck={sac}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )
                }
                )
              )
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
    } 
  
  
    
