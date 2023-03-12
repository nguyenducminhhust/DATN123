import React, { useContext, useState, useEffect } from "react";
import { Cart2 } from "../../GlobalState";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../headers/Header";
import axios from "axios";
import SubStaffSchedule from "./SubStaffSchedule";
import "./schedule.css"
// import "./Bookingsystem.css";
// import DatePicker from "react-datepicker";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import DateTimePicker from '@react-native-community/datetimepicker';
// import booklist from "../../../../../../models/booklist";
//import Filter from "./Filters";
//import LoadMore from "./LoadMore";
//import Footer from "../../../Home/Footer/Footer";
//import img from "../../../../assets/images/spa3.jpg";
//import HeaderNode from "../HeaderNode/HeaderNode";
//import Slider from "./Slider/Slider";
//import BookingAPI from "../../API/BookingAPI";
const initialState = {
    email:"",
    service: "",
    arraytimework : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    namestaff:"",
    daywork:"",

};

export default function StaffSchedule() {
  const state = useContext(Cart2);
  const [staffschedule, setStaffSchedule] = useState(initialState);
  const history = useNavigate();
  const [callback, setCallback] = state.bookingAPI.callback;
  const [staffcheck, setStaffCheck] = useState([]);
  const [userlistcheck, setUserListCheck] = state.userstaffAPI.alluser;  
  const [bookdatecheck, setBookDateCheck] = useState({bookdatecheck1: "",});
  const [isCheck, setIsCheck] = useState(false);
  const [dayworkcheck, setDayWorkCheck] = useState();
  const [staffschedulecheck]=state.staffscheduleAPI.staffschedule;
  const [scheduleaftercheck, setScheduleAfterCheck] = useState();
   const minDate = new Date();
   const maxDate = new Date();
   minDate.setTime(minDate.getTime()+7*60*60*1000);
   minDate.setDate(minDate.getDate()+1);
   maxDate.setDate(maxDate.getDate()+7);
   maxDate.setTime(maxDate.getTime()+7*60*60*1000);
   const [isStaff]= state.userAPI.isStaff;
   const [ischeckschedule, setIsCheckSchedule] = useState(false);
    // console.log(scheduleaftercheck, dayworkcheck, typeof dayworkcheck)
    const dayworkchoose =async(e)=>{
      const{name,value}=e.target;
      setDayWorkCheck(value);
    }
  useEffect(() => {

     
     const checkschedule = staffschedulecheck.filter((scc)=>
      scc.daywork==dayworkcheck
      )
      setScheduleAfterCheck(checkschedule);
      if(checkschedule){
      setIsCheckSchedule(true);}
      else {
        setIsCheckSchedule(false);
      }
    
  }, [dayworkcheck])
  // const CheckService = (service)=> userlistcheck.filter((userlist) => userlist.kindofstaff === service )
  // useEffect(() => {
    
  //   const res = userlistcheck.filter((userlist) =>
      
  //   userlist.service === booking.service 
  //   )
  
  //   setStaffChceck(res)
   
  // }, [isChecked2])
  
  const handleChangeInputDate = (e) => {
    const { name, value } = e.target;
    setStaffSchedule({ ...staffschedule, [name]: value.toString() });
    //console.log(booking);
    //console.log(staffcheck);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setStaffSchedule({ ...staffschedule, [name]: value });
    console.log(name, value);
    // handleStaffAnDate(staffs)

  }
  const handleChangeInputRole = (e) => {
    const { name, value } = e.target;
    setStaffSchedule({ ...staffschedule, [name]: value });
  //  setStaffCheck( CheckService(value));
    //setisChecked2(!isChecked2);
  };
  //console.log(staffcheck);
  const handleChangeInputRole2 = (e) => {
    const { name, value } = e.target;
    setStaffSchedule({ ...staffschedule, [name]: value });
    //console.log(userlistcheck);
  };
  
  // const handleChangeInputDate = (e) => {
  //   const { name, value } = e.target;
  //   setStaffSchedule({ ...staffschedule, [name]: value.toString() });
 
  //   // console.log(booking.service, typeof booking.service);
  // };
  const handleChangeInputDate2 = (e) => {
    const { name, value } = e.target;
    setBookDateCheck({ [name]: value.toString() });
    console.log(name, value);
    setIsCheck(!isCheck);
    
  };
  const [test3, setTest3]=useState(false);
  const handleDeleteClick = async (staffid)=>{
    // staffid.preventDefault();
    // setTest(staffid);
    try {
      const param = staffid._id;
      setTest3(param);
        await axios.delete(`/api/staffschedule/${param}`, {_id: staffid._id}); //images
        // console.log(user);
        // setUser({...initialState} );
        // setText("Created Succes");
        // setChecked(true);
      alert("Successful Delete!");
      window.location.reload();
    } catch (err) {
      alert(err.response.data.msg);
    }
}
  console.log(test3);
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/staffschedule", { ...staffschedule});
      setCallback(!callback);
      // console.log(booking);
    //  history("/role");
    alert("Create Sucessed");
    window.location.reload();
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  console.log(staffschedule);
  return (
   <>
      {/* {!isAdmin && (
        <>
          { <HeaderNode /> }
        </>
      )} */}
    { (isStaff)&&(<Header />)}

       {/* {!isAdmin && (  */}
       <div className="bookingpage">
        <form onSubmit={registerSubmit}> 
          
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
            onChange={handleChangeInput}
          />
          <input
            type="date"
            name="daywork"
            className="daywork"
            placeholder="dd-mm-yyyy"
            // min="02-23-2023"
            // min={minDate.toISOString().substring(0,10)}
            // max={maxDate.toISOString().substring(0,10)}
          
            // min="23/02/2023"
            // {maxDate.toISOString().substring(0,10)}
            required
            onChange={handleChangeInputDate}
            // defaultValue={booking.bookdate}
          /> 
          <div className="buttonsubmitbooking">
            <button  type="submit">Tạo</button>
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
         </>
  );
    } 
  
  
    
