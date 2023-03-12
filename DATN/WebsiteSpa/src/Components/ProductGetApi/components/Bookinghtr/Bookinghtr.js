import React, { useContext, useState, useEffect } from "react";
import Header from "../headers/Header";
import { Cart2 } from "../../GlobalState";
import "./Bookinghtr.css"
import axios from "axios";
export default function Bookinghtr() {
    const state = useContext(Cart2);
    const [isCheck, setIsCheck] = useState(false);
    const [bookinglist, setBookingList] = state.bookingAPI.bookings;
    const [userbook, setUserBook] = state.userAPI.user;
    const [bookdatecheck, setBookDateCheck] = useState({bookdatecheck1: "",});
    const [databookcheck, setDataBookCheck] = useState([]);
    const [isAdmin]= state.userAPI.isAdmin;
    const [isStaff]= state.userAPI.isStaff;
    const bookCheckInputs = () => {       
        setIsCheck(!isCheck);
    };
    console.log(databookcheck, bookinglist, bookdatecheck);
    useEffect(() => {
        
        if(isAdmin||isStaff) { const datauserbook1 = bookinglist.filter((booklist)=>
        booklist.bookdate == bookdatecheck.bookdatecheck1);
        setDataBookCheck(datauserbook1);    
      }
        else{
        const datauserbook2 = bookinglist.filter((booklist)=>
        booklist.email === userbook.email&& booklist.bookdate == bookdatecheck.bookdatecheck1);
        setDataBookCheck(datauserbook2);   
      }
      }, [isCheck]);
     


    const handleChangeInputDate2 = (e) => {
        const { name, value } = e.target;
        setBookDateCheck({ [name]: value.toString() });
        console.log(name, value);        
      };
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
      const handleDeleteClick = async (bookcheck)=>{
        try {
          const param = bookcheck._id;
            await axios.delete(`/api/bookings/${param}`, {_id: bookcheck._id}); //images
          alert("Successful Delete!");
          window.location.reload();
        } catch (err) {
          alert(err.response.data.msg);
        }
    }
      console.log(databookcheck)
return (
    <>
    <Header/>
 <div className="bookinglisthtr">
  <div className="bookinglisthtr1">
      <div className="butbookinghtr">  <button className="butbookinghtr1" onClick={bookCheckInputs} >Kiểm Tra</button></div>
       <div className="datebookinghtr">
        <input 
            className="datebookinghtr1"
            type="date"
            name="bookdatecheck1"
            required
            onChange={handleChangeInputDate2}     
            />
            </div>
            </div>
            <div className="bookinglisthtr2">
  <table>
  <thead>
    <tr>
      <th>STT</th>
      <th>Email</th>
      <th>Tên Khách Hàng</th>
      <th>Số Điện Thoại</th>
      <th>Dịch Vụ</th>
      <th>Nhân Viên Làm</th>
      <th>Đặt Lịch Ngày</th>
      <th>Thời gian</th>
      <th>Thao tác</th>
    </tr>
  </thead>
  <tbody>
  {databookcheck.map((bookcheck,index) => (
    <tr key={bookcheck._id}>
      <td>{index+1}</td>
      <td>{bookcheck.email}</td>
      <td>{bookcheck.namecustomer}</td>
      <td>0{bookcheck.phonenumber}</td>
      <td>{bookcheck.service}</td>
      <td>{bookcheck.namestaff}</td>
      <td>{bookcheck.bookdate}</td>
      <td>{numbertimeformat[bookcheck.numbertime].time}</td>
      <td>
      <button className="deletestaffbut" type="button" onClick={()=> handleDeleteClick(bookcheck)}
                    > Xóa</button></td>
    </tr>
  ))}
  </tbody>
  
</table>
</div>

      </div> 
      </>
);
}