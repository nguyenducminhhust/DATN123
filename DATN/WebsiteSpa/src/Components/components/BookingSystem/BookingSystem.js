import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../headers/Header";
import axios from "axios";
import "./Bookingsystem.css";
import Handletimebook from "./Handletimebook";

const initialState = {
  email:"",
  bookdate: "",
  service: "",
  namecustomer: "",
  phonenumber: 0,
  namestaff: "",
  numbertime:0,

};

export default function BookingSystem() {
  const state = useContext(Service);
  const [booking, setBooking] = useState(initialState);
  const history = useNavigate();
  const [bookinglist, setBookingList] = state.bookingAPI.bookings;
  const [callback, setCallback] = state.bookingAPI.callback;
  const [bookcheck, setBookCheck] = useState([]);
  const [staffcheck, setStaffCheck] = useState([]);
  const [userlistcheck, setUserListCheck] = state.alluserAPI.alluser;
  const [user, setUser] = state.userAPI.user;  
  const [bookdatecheck, setBookDateCheck] = useState({bookdatecheck1: "",});
  const [isCheck, setIsCheck] = useState(false);
  const [staffselect, setStaffSelect] = useState();
  const [test, setTest] = useState();
  const [staffsch,setStaffSch] = state.staffscheduleAPI.staffschedule;
  const [arraycheck, setArrayCheck] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [staffselected, setStaffSelected] = useState();
  const [staffchangearray, setStaffChangeArray]= useState();
  const [arraytimeworkupdate, setArrayTimeWorkUpdate]= useState();
  const [listservice, setListService] = useState([]);
  const [category, setCategory]=state.categoriesAPI.categories;
  const [service, setService]= state.servicesAPI.services;
  const [durationTime, setDurationTime]= useState(); // Thời gian làm dự kiến
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setTime(minDate.getTime()+7*60*60*1000); // + 7 tiếng
  minDate.setDate(minDate.getDate());
  maxDate.setDate(maxDate.getDate()+7); // +7 ngày
  maxDate.setTime(maxDate.getTime()+7*60*60*1000); // + 7 tiếng
  const bookCheckInputs = () => {
    setIsCheck(!isCheck);  
  }
  let numbertimeformat =[
    {time: "08:00", isActive: false},
    {time: "08:30", isActive: false},
    {time: "09:00", isActive: false},
    {time: "09:30", isActive: false},
    {time: "10:00", isActive: false},
    {time: "10:30", isActive: false},
    {time: "11:00", isActive: false},
    {time: "11:30", isActive: false},
    {time: "12:00", isActive: false},
    {time: "12:30", isActive: false},
    {time: "13:00", isActive: false},
    {time: "13:30", isActive: false},
    {time: "14:00", isActive: false},
    {time: "14:30", isActive: false},
    {time: "15:00", isActive: false},
    {time: "15:30", isActive: false},
    {time: "16:00", isActive: false},
    {time: "16:30", isActive: false},
    {time: "17:00", isActive: false},
    {time: "17:30", isActive: false},
  ];
  // Lấy dữ liệu lịch đặt
  useEffect(() => {
    const getBookings = async () => {
      const res = await axios.get(
        `/api/bookings`
      );
      console.log(res);
      setBookingList(res.data);
    };
    getBookings();
  }, [callback]); 
  // Lấy dữ liệu lịch nhân viên
  useEffect(() => {
    const getStaffSchedules = async () => {
      const res = await axios.get(
        `/api/staffschedule`
      );
      console.log(res);
      setStaffSch(res.data);
    };
    getStaffSchedules();
  }, [callback]); 
  // Lọc dữ liệu lịch đặt
  useEffect(() => {
    const [bookinglistcheck, setBookingListCheck] = state.bookingAPI.bookings;
    const res = bookinglistcheck.filter((booklist) =>
      booklist.bookdate === bookdatecheck.bookdatecheck1
    )
    setBookCheck(res)
  }, [isCheck]);
  const [check1, setCheck1]=useState();

  // Xử lý lịch trống theo 2 lựa chọn - Có chọn nhân viên - Không chọn nhân viên
  const handlefreeschedule =(bookdate)=>{
    if (isSelected) { // có chọn nhân viên
      const filterstaff = staffselect.filter((atw) =>
        atw.daywork === bookdate
      );
      if(filterstaff.length!==0){
      const infostaff = filterstaff[0];
      const arraytimeworkstaffselected= infostaff.arraytimework;
      setStaffSelected(infostaff);
      // xử lý thời gian trống
      handlefssbu(arraytimeworkstaffselected, durationTime);
    }
      else{setArrayCheck([]);}
    } else { // không chọn nhân viên
      const filterstaff = staffsch.filter((atw) =>
        atw.daywork === bookdate
      );
      for (let i = 0; i < filterstaff.length; i++) {
        const arraytime = filterstaff[i].arraytimework;
        setCheck1(arraytime);
          // xử lý thời gian trống
        handlefssbu(arraytime, durationTime);
      }
    }
  };
  const handlefssbu=(arraytime, length1)=>{
    for(let j=0; j<=arraytime.length-length1+1; j++){
     
      lengthtime(arraytime,length1,j);
    }
  }
  // Xử lý thời gian trống, trả về mảng thời gian
  const lengthtime =(arraytime,length2, value)=>{
    if(isSelected){
      let checkresult= false;
      for(let j=value; j<value + length2-1; j++){
        if((arraytime[j+1]-arraytime[j])==1){ // kiểm tra có khoảng thời gian được chọn không
          checkresult= true;
        }else{ checkresult = false;
        break;  }
      };
        if(checkresult){
          arraycheck.push(arraytime[value]);
        };

    } else {
      let checkresult= false;
      for(let j=value; j<value + length2-1; j++){
        if((arraytime[j+1]-arraytime[j])==1){
          checkresult= true;
        }else{ checkresult = false;
        break;  }
      };
        if(checkresult){
          arraycheck.push(arraytime[value]); // mảng thời gian hiển thị
        };
      }
    
  }
  
 // Xử lý thời gian sau khi chọn
  const handlefreescheduletoupdate = async (e)=>{
    const {name, value}=e.target;
    const index = parseInt(value);
    setTest(index);
    if(isSelected){ // có chọn nhân viên
     handlefssbu2(staffselected.arraytimework, durationTime, index, staffselected);
    } 
    else { // không chọn nhân viên
    const filterstaff = staffsch.filter((atw) =>
    atw.daywork === booking.bookdate
  );
  for (let i = 0; i < filterstaff.length; i++) {
    const arraytime = filterstaff[i].arraytimework;
    setCheck1(arraytime);
    handlefssbu2(arraytime, durationTime, index,filterstaff[i]);
    if(checkindex){
      break;
    }
    };
  }
  };
  const [checkindex, setCheckIndex]= useState(false);
  // xử lý thời gian, trả về mảng thời gian mới của nhân viên để cập nhật
  const handlefssbu2=(arraytime, length, index, filterstaff)=>{
    let checkresult= false;
    const checkarray = arraytime.includes(index+1);
    if(checkarray){
      const indexof = arraytime.indexOf(index+1);
      for(let j=indexof; j<indexof + length-1; j++){
        if((arraytime[j+1]-arraytime[j])==1){
          checkresult= true;
          
        }else{ checkresult = false;
        break;  }
      };
    if(checkresult){
      setStaffChangeArray(filterstaff);
      // lọc ra mảng thời gian sau khi lấy đi khoảng thời gian đặt
      let newArray = filterstaff.arraytimework.filter((item) => 
     (item <=(index)) ||(item > (index+length))
      );
      setBooking({...booking, numbertime: index});
      setArrayTimeWorkUpdate(newArray);
    };
    setCheckIndex(checkresult);
}
  };
    ///////////////////////////////////
  // Kiểm tra giá trị có trong mảng thời gian không
    const checkindexnumbertime=(index)=>{
      if(arraycheck.includes(index)){return true}
       else{ return false};
    }
  const CheckServiceStaff = (service)=> userlistcheck.filter((userlist) => 
  userlist.service === service );

  const listService = (category)=> service.filter((sv) => 
  sv.category === category );
 
  const checkTitleService = (title)=> service.filter((sv) => 
  sv.title === title );
  // Xử lý loại dịch vụ
  const handleCategory = (e) => {
    const {name,value}= e.target;
    setListService(listService(value));
    setStaffCheck( CheckServiceStaff(value));
    setCallback(!callback);
  };
  const filterstaffschedule =(namestaff)=>{
    const fss = staffsch.filter((sc)=>
    sc.namestaff == namestaff
    )
    setStaffSelect(fss);
  }
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  }
  // set dịch vụ và thời gian làm dự kiến
  const handleService = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    const checktitleservice = checkTitleService(value);
    setDurationTime(checktitleservice[0].durationtime/30)
  };

  const handleChangeInput2 = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    filterstaffschedule(value);
    if(value=="default"){
      setIsSelected(false);
    }else{
      setIsSelected(true);
    }
    setArrayCheck([]);
    booking.bookdate="";
  };
  const handleChangeInputDate = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value.toString() });
    handlefreeschedule(value.toString());
  };
  const handleChangeInputDate2 = (e) => {
    const { name, value } = e.target;
    setBookDateCheck({ [name]: value.toString() });
    setIsCheck(!isCheck);
    
  };
  const bookingSubmit = async (e) => {
    e.preventDefault();
    try {
       const useremail = user.email;
       const username = user.name;
       const userphonenumber = user.phonenumber;
      await axios.post("/api/bookings", { ...booking, email: useremail, namecustomer: username, phonenumber: userphonenumber });
      if(arraytimeworkupdate){
      await axios.put("/api/staffschedule", {staffchangearray, arraytimeworkupdate})}
      setCallback(!callback);
      setBooking(initialState);
    alert("Đặt thành công");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
   <>
      
     <Header />
       <div className="bookingpage">
        <form onSubmit={bookingSubmit}> 
          
          <h1>ĐẶT LỊCH HẸN</h1>

          <input
            type="text"
            name="email"
            className="inputemailandname"
            required
            placeholder="Địa chỉ Email"
            value={user.email}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="inputemailandname"
            name="namecustomer"
            required
            placeholder="Họ và Tên"
            value={user.name}
            onChange={handleChangeInput}
          />

          <input
            type="number"
            name="phonenumber"
            className="inputemailandname"
            required
            placeholder="Số Điện Thoại"
            value={user.phonenumber}
            onChange={handleChangeInput}
          />
          
          <select
            id="category"
            name="category"
            aria-label="Role"
            onChange={handleCategory}
            className="selectkindofservice"
          >
            <option value="select">Chọn Loại Dịch Vụ</option>
            {category.map((ctg, index)=>
            <option value={ctg.name}>{`${index+1}. ${ctg.name}`}</option>
            )}
            
           
          </select>
          <select
            id="service"
            name="service"
            aria-label="Role"
            onChange={handleService}
            className="selectservice"
          >
            <option value="select">Chọn Dịch Vụ</option>
            {listservice.map((cv, index)=>
            <option value={cv.title}>{`${index+1}. ${cv.title}`}</option>
            )}

          </select>
          <select
            id="namestaff"
            name="namestaff"
            onChange={handleChangeInput2}
            className="selectstaff"
          > <option value="default">Chọn Nhân Viên</option>
          {staffcheck.map((staffck) => (
            <option value={staffck.name}>{staffck.name}</option>
          ))}
          </select>
          <input
            type="date"
            name="bookdate"
            className="bookingdate"
            placeholder="dd-mm-yyyy"
            value={booking.bookdate}
            min={minDate.toISOString().substring(0,10)}
            max={maxDate.toISOString().substring(0,10)}
           

            required
            onChange={handleChangeInputDate}
          /> 
           <div className="timeparent">
           <select 
              className="selecttimebooking"
              name ="selecttimebooking"
              onChange={e=> {handlefreescheduletoupdate(e)}}
              >
            <option value="default">  Chọn thời gian </option>

          {numbertimeformat.map((nbt,index)=>
          {
            if(checkindexnumbertime(index+1)){
              return(
                <option key={index} value={index}>  {nbt.time}    </option>
          )}})}
          </select>
                </div>
          <div className="buttonsubmitbooking">
            <button  type="submit">Đặt lịch</button>
          </div>
        </form>
      </div>
         </>
  );
    } 
  
  
    
