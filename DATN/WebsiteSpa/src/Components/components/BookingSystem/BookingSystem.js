import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
// import Header from "../headers/Header";
// import ProductItem from "../utils/productItem/ProductItem";
// import Loading from "../utils/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../headers/Header";
import axios from "axios";
import "./Bookingsystem.css";
import Handletimebook from "./Handletimebook";
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
  //booking_id: ""
  email:"",
  bookdate: "",
  service: "",
  namecustomer: "",
  phonenumber: 0,
  //booknote: "",
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
  const [isChecked, setisChecked] = useState(false);
  const [userlistcheck, setUserListCheck] = state.alluserAPI.alluser;  
  const [bookdatecheck, setBookDateCheck] = useState({bookdatecheck1: "",});
  const [usercheck, setUserCheck] = useState({usercheck1: "",});
  const [isChecked2, setisChecked2] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [staffselect, setStaffSelect] = useState();
  const [test, setTest] = useState();
  const [test2, setTest2] = useState();
  const [test3, setTest3] = useState();
  const [staffsch,setStaffSch] = state.staffscheduleAPI.staffschedule;
  const [changesetime, setChangSeTime] = useState();
  const [arraycheck, setArrayCheck] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [staffselected, setStaffSelected] = useState();
  const [staffchangearray, setStaffChangeArray]= useState();
  const [arraytimeworkupdate, setArrayTimeWorkUpdate]= useState();
  const [listservice, setListService] = useState([]);
  const [category, setCategory]=state.categoriesAPI.categories;
  const [service, setService]= state.servicesAPI.services;
  const [durationTime, setDurationTime]= useState();
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setTime(minDate.getTime()+7*60*60*1000);
  minDate.setDate(minDate.getDate());
  maxDate.setDate(maxDate.getDate()+7);
  maxDate.setTime(maxDate.getTime()+7*60*60*1000);
  // console.log(minDate.toISOString(), maxDate.toISOString());
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
  useEffect(() => {
    const [bookinglistcheck, setBookingListCheck] = state.bookingAPI.bookings;
    const res = bookinglistcheck.filter((booklist) =>
      booklist.bookdate === bookdatecheck.bookdatecheck1
    )
    setBookCheck(res)
  }, [isCheck])
  // Xử lý kiểm tra lịch trống 
  const [check1, setCheck1]=useState();

  const handlefreeschedule =(bookdate)=>{

    if (isSelected) {
      const filterstaff = staffselect.filter((atw) =>
        atw.daywork === bookdate
      );
      if(filterstaff.length!==0){
      const infostaff = filterstaff[0];
      const arraytimeworkstaffselected= infostaff.arraytimework;
      setStaffSelected(infostaff);
    
      handlefssbu(arraytimeworkstaffselected, durationTime);
    }
      else{setArrayCheck([]);}
    } else {
      const filterstaff = staffsch.filter((atw) =>
        atw.daywork === bookdate
      );
      for (let i = 0; i < filterstaff.length; i++) {
        const arraytime = filterstaff[i].arraytimework;
        setCheck1(arraytime);
         
        handlefssbu(arraytime, durationTime);
      }
    }
  };
  
 ///* Xử lý update //// Kiểm tra bookdate == booking.bookdate
  const handlefreescheduletoupdate = async (e)=>{
    const {name, value}=e.target;
    const index = parseInt(value);
    setTest(index);  //   setTest( indexcheck);
  
    if(isSelected){
     handlefssbu2(staffselected.arraytimework, durationTime, index, staffselected);
    } 
    else {
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
  
  /////////////////
  const handlefssbu2=(arraytime, length, index, filterstaff)=>{
    let checkresult= false;
    const checkarray = arraytime.includes(index+1);
  //  setTest(checkarray)
    if(checkarray){
      const indexof = arraytime.indexOf(index+1);
     // setTest2(indexof);
      for(let j=indexof; j<indexof + length-1; j++){
        if((arraytime[j+1]-arraytime[j])==1){
          checkresult= true;
          
        }else{ checkresult = false;
        break;  }
      };
     
    if(checkresult){
      setStaffChangeArray(filterstaff);
      let newArray = filterstaff.arraytimework.filter((item) => 
     (item <=(index)) ||(item > (index+length))
      );
      setBooking({...booking, numbertime: index});
      setArrayTimeWorkUpdate(newArray);
    };
    setCheckIndex(checkresult);
   
  
}
  };
  
  // const handlechoosetime =(bookdate, index)=>{
  //   // 2 trường hợp
  //    //trường hợp 1: nếu có chọn nhân viên
  //    if(isSelected){
  //      const filterstaff= staffselect.filter((atw)=>
  //      atw.daywork===bookdate
  //    );
  //    const arraytimeworkstaffselected = filterstaff[0].arraytimework;
  //    const length =3;
  //    handlefssbu2(arraytime, length, index);
  //    } 
  //  };
  // console.log(check1);
  // console.log( staffsch);
  //* Xử lý kiểm tra từng người một,, handle free schedule by user
  // const handlefssbu2=(arraytime, length1)=>{
  //   for(let j=0; j<=arraytime.length-length1+1; j++){
     
  //     lengthtime(arraytime,length1,j);
  //   }
  // }
  const handlefssbu=(arraytime, length1)=>{
    for(let j=0; j<=arraytime.length-length1+1; j++){
     
      lengthtime(arraytime,length1,j);
    }
  }
  //* xử lý length
  const lengthtime =(arraytime,length2, value)=>{
    if(isSelected){
      // setArrayCheck([]);
      let checkresult= false;
      for(let j=value; j<value + length2-1; j++){
        if((arraytime[j+1]-arraytime[j])==1){
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
          arraycheck.push(arraytime[value]);
        };
      }
    
  }
  console.log(arraycheck);
  ///////////////////////////////////
  const handleStaffAndDate=(arrtimework, bookdate, value)=>{
  //   const timemake=3;
  //   const filterstaff= arrtimework.filter((atw)=>
    
  //     atw.daywork===bookdate
  //   );
  //   const choosestaff= filterstaff[0].arraytimework;
  //  setTest(filterstaff);

  //   const changrselecttime = parseInt(value) ;
    
  //   let checkresult = choosestaff.some(item=>
  //     item>=(changrselecttime+1)&&item<=(changrselecttime+timemake)
  //     );
     

  // let newArray = choosestaff.filter(item => item < changrselecttime || item > (changrselecttime+timemake));
  // setTest2(newArray);
  // setTest(changrselecttime+timemake);
      // await ;
    }
  


    const changeselecttime =(e)=>{
      const {name, value} = e.target;
      setChangSeTime(value);
      handleStaffAndDate(staffselect, booking.bookdate, value);
    }
 
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
  const handleCategory = (e) => {
    const {name,value}= e.target;
    setListService(listService(value));
    setStaffCheck( CheckServiceStaff(value));
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
  const handleService = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    const checktitleservice = checkTitleService(value);
    setDurationTime(checktitleservice[0].durationtime/30)
  };
  console.log(durationTime);
  const handleChangeInputRole2 = (e) => {
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
  // console.log(staffsch);
  const handleChangeInputDate = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value.toString() });
    handlefreeschedule(value.toString());
    //console.log(booking);
    //console.log(staffcheck);
    // console.log(booking.service, typeof booking.service);
    

  };
  const handleChangeInputDate2 = (e) => {
    const { name, value } = e.target;
    setBookDateCheck({ [name]: value.toString() });
    // console.log(name, value);
    setIsCheck(!isCheck);
    
  };
 // console.log(staffchangearray, arraytimeworkupdate);
  const bookingSubmit = async (e) => {
    e.preventDefault();
    try {
      // const testid= test[0]._id; 
      await axios.post("/api/bookings", { ...booking});
      if(arraytimeworkupdate){
      await axios.put("/api/staffschedule", {staffchangearray, arraytimeworkupdate})}
      setCallback(!callback);
      // console.log(booking);
    //  history("/role");
    alert("Create Sucessed");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  // const registerSubmit2 = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("/api/booklist", { ...bookcheck});
  //    // setCallback(!callback);
  //     console.log(booking);
  //   //  history("/role");
  //   } catch (err) {
  //     alert(err.response.data.msg);
  //   }
  // };
  return (
   <>
      {/* {!isAdmin && (
        <>
          { <HeaderNode /> }
        </>
      )} */}
     <Header />

       {/* {!isAdmin && (  */}
       <div className="bookingpage">
        <form onSubmit={bookingSubmit}> 
          
          <h1>ĐẶT LỊCH HẸN</h1>

          <input
            type="text"
            name="email"
            className="inputemailandname"
            required
            placeholder="Địa chỉ Email"
            defaultValue={booking.email}
            onChange={handleChangeInput}
          />



          <input
            type="text"
            className="inputemailandname"
            name="namecustomer"
            required
            placeholder="Họ và Tên"
            defaultValue={booking.namecustomer}
            onChange={handleChangeInput}
          />

          <input
            type="number"
            name="phonenumber"
            className="inputemailandname"
            required
            placeholder="Số Điện Thoại"
            defaultValue={booking.phonenumber}
            onChange={handleChangeInput}
          />
          
          <select
            id="category"
            name="category"
            aria-label="Role"
            onChange={handleCategory}
            className="selectkindofservice"
          >
            <option value="select">Chọn Dịch Vụ</option>
            {category.map((ctg, index)=>
            <option value={ctg.name}>{`${index+1}. ${ctg.name}`}</option>
            )}
            
           
          </select>
          <select
            id="service"
            name="service"
            aria-label="Role"
            onChange={handleService}
            className="selectkindofservice"
          >
            <option value="select">Chọn Dịch Vụ</option>
            {listservice.map((cv, index)=>
            <option value={cv.title}>{`${index+1}. ${cv.title}`}</option>
            )}

          </select>
          <select
            id="namestaff"
            name="namestaff"
           // aria-label="Role"
            onChange={handleChangeInputRole2}
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
            // min="02-23-2023"
            // min={minDate.toISOString().substring(0,10)}
            // max={maxDate.toISOString().substring(0,10)}
           
            // min="23/02/2023"
            // {maxDate.toISOString().substring(0,10)}
            // defaultValue={booking.bookdate}
            required
            onChange={handleChangeInputDate}
            // defaultValue={booking.bookdate}
          /> 
          {/* <div className="displayfreetimework">
            <select name="timework"
              className="timework"
               onChange={changeselecttime}
              >
              <option value="default">  Chọn buổi liệu trình </option>
              {numbertime.map((ss, index) => {
                return (
                  <option value={index+1}> {ss.time} </option>
                )
              })}
            </select>
          </div> */}
           <div className="timeparent">
           <select 
              className="selecttimebooking"
              name ="selecttimebooking"
              onChange={e=> {handlefreescheduletoupdate(e)}}
              >
            <option value="default">  Chọn buổi thời gian </option>

          {numbertimeformat.map((nbt,index)=>
          {
            if(checkindexnumbertime(index+1)){
              return(
                <option key={index} value={index}>  {nbt.time}    </option>

          // <Handletimebook
          //       index={index}
          //       numbertime={nbt}
          //       handlefreescheduletoupdate={handlefreescheduletoupdate}
          //       setIndexCheck={setIndexCheck}
          //       indexcheck={indexcheck}
          //       // isActive={isActive}
          //       />              )
          //   }
          // }
          )}})}
          </select>
                </div>

          <div className="buttonsubmitbooking">
            <button  type="submit">Submit</button>
          </div>
        </form>
      </div>
      {/* <DateRange
                    editableDateInputs={true}
                    // onChange={(item) => setDates([item.selection])}
                    // moveRangeOnFirstSelection={false}
                    // ranges={dates}
                    className="date"
                    minDate={new Date()}
                    maxDate={maxDate}
                  /> */}

         </>
  );
    } 
  
  
    
