import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { Service } from "../../GlobalState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
//import Role from "../ContainerService/ContainerService"
import axios from "axios";
import DropDown from "./DropDown";
export default function Header() {
  const state = useContext(Service);
  const [isMobile, setIsMobile]= useState(false);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isStaff] = state.userAPI.isStaff;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [acne, setAcne] = useState([]);
  const [listservice] = state.servicesAPI.services;
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  useEffect(()=>{
  const getServices = async () => {
    const res = await axios.get(
      `/api/services` 
      //limit=${page *8}&
    );
    console.log(res);
    console.log(res.data.services);
    setAcne(res.data.services.filter((service)=>
    service.category == "Trị mụn"
    ));
    // setResult(res.data.result);
  };
  getServices();
},[dropdown]);
  const onMouseEnter = () => {
    setDropdown(true);
    // if (window.innerWidth > 960) {
    //   setDropdown(false);
    // } else {
    //   setDropdown(true);
    // }
  };

  const onMouseLeave = () => {
    setDropdown(false);
    // if (window.innerWidth < 960) {
    //   setDropdown(false);
    // } else {
    //   setDropdown(false);
    // }
  };
  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();

    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };
  const adminRouter = () => {
    return (
      <>
      
          <Link to="/dashboard" className="dashboard"><li>DashBoard</li></Link>
        
             
      
          <Link to="/dataprocesscustomer" className="dataprocesscustomer"> <li>Dataprocesscustomer</li> </Link>
        
      
          <Link to="/accountcreatecompany" className="accountcreatecompany">  <li>Account Create Staff</li></Link>
        
       
          <Link to="/create_service" className="createservice"> <li>Create Service</li></Link>
        
        
          <Link to="/category" className="category"><li>Categories</li></Link>
        
        
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
     
          <Link to="/staffschedule" className="staffschedule"> <li>StaffSchedule</li> </Link>
        
     
      
          <Link to="/displaydataprocessuser" className="displaydataprocessuser"><li>DisplayDataProcessUser</li> </Link>
        
      
          <Link to="/containerservice" className="containerservice"><li>Danh Sách Liệu Trình </li></Link>
       
      
    
          <Link to="/bookinghtr" className="bookinghtr">  <li>Booking History</li></Link>
        
       
          <Link to="/bookingsystem" className="bookingsystem"> <li>Booking </li></Link>
       
        
          <Link to="/history" className="history"><li>History  </li></Link>
      
       
          <Link to="/" onClick={logoutUser} className="logout">
          <li>Logout</li>
          </Link>
        
      </>
    );
  };

  return (
    <>
   {(isLogged )&& (!isAdmin ) && (
    <header>
      
    <nav className="navbar1">

    <h1 >
        <Link to="/" className="logo1">
          {isAdmin ? "Admin" : "HÀ NỘI SPA"}
        </Link>
        </h1>
      <ul 
        className={isMobile? "nav-links-mobile" : "nav-links1"}
        onClick={()=> setIsMobile(false)}
        
        >
  
      
       {(isStaff)&&( <Link to="/staffschedule" className="staffschedule"> <li>Lịch Nhân Viên</li> </Link>)}
       {(isStaff)&&( <Link to="/dataprocesscustomer" className="dataprocesscustomer"> <li>QL Liệu Trình Khách</li> </Link>
)}
   
    
    
  
   {(!isStaff)&&( <Link to="/containerservice" className="containerservice1"
      ><li>Danh Sách Liệu Trình </li></Link>)}
   
  

      <Link to="/bookinghtr" className="bookinghtr">  <li>Lịch sử đặt lịch</li></Link>
    
   
      {(!isStaff)&&( <Link to="/bookingsystem" className="bookingsystem"> <li>Đặt Lịch Hẹn </li></Link>)}
   
    
      {(!isStaff)&&( <Link to="/history" className="history"><li>Lịch Sử Mua Hàng  </li></Link>)}
  
      <Link to="/" onClick={logoutUser} className="logout">
      <li>Logout</li>
      </Link>
      {(!isStaff)&&( <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <i  className="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>)}
      </ul>
         <button className="mobile-menu-icon" onClick={()=> setIsMobile(!isMobile)}>
          {isMobile ? <i className="fas fa-times"></i>: <i className="fa-solid fa-bars"></i>}
         </button>
       </nav>  
   </header>
   ) }
 {  (!isLogged) && (
    <header>
      
    <nav className="navbar1">

    <h1 >
        <Link to="/" className="logo1">
          {isAdmin ? "Admin" : "HÀ NỘI SPA"}
        </Link>
        </h1>
      <ul  className={isMobile? "nav-links-mobile" : "nav-links1"} onClick={()=> setIsMobile(false)} >
      <li className='nav-item1'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
        <Link to="/contact" className="contacts1"  >
         {isAdmin ? "" : "Liên Hệ"}    
        </Link>
        {/* {dropdown ? ( <ul className="dropdown-list" onMouseEnter={onMouseEnter}>
         {acne.map((acne)=>{
          return(
          <Link to={`/detail/${acne._id}`} className="testlinkoke" >
            <li >   {acne.title}  </li>
            </Link>    )
         })}
                 
       

        </ul>
        
        
        ):null} */}
        {/* {dropdown  */}
        {/* &&  */}
        {/* <DropDown /> */}
        {/* }   */}
        </li>
      <Link to="/login" className="login1"> <li>Login ✥ Register </li></Link>
      
      <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <i  className="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>
      </ul>
      <button className="mobile-menu-icon" onClick={()=> setIsMobile(!isMobile)}>
          {isMobile ? <i className="fas fa-times"></i>: <i className="fa-solid fa-bars"></i>}
         </button>
       </nav>  
   </header>
   )}
  
    
   
  {(isAdmin)&&(
    <header>
      
      <nav className="navbar1">
  
      <h1 >
          <Link to="/" className="logo1">
            {isAdmin ? "Admin" : "HÀ NỘI SPA"}
          </Link>
          </h1>
        <ul 
          className={isMobile? "nav-links-mobile" : "nav-links1"}
          onClick={()=> setIsMobile(false)}
          
          >
        <Link to="/dashboard" className="dashboard1"><li>DashBoard</li></Link>
        <Link to="/managecustomer" className="dataprocesscustomer"> <li>QL Khách Hàng</li> </Link>
        
        <Link to="/managestaff" className="dataprocesscustomer"> <li>QL Nhân Viên</li> </Link>

        <Link to="/accountcreatecompany" className="accountcreatecompany">  <li>Tạo tài khoản nhân viên</li></Link>
      
     
        <Link to="/create_service" className="createservice"> <li>Tạo dịch vụ</li></Link>
      
      
        <Link to="/category" className="category"><li>Danh Mục</li></Link>
    
        <Link to="/bookinghtr" className="bookinghtr">  <li>Lịch sử đặt lịch</li></Link>
      
     
        <Link to="/cost" className="managecost"><li>QL chi phí </li></Link>
        <Link to="/contacttable" className="contacttable"><li>Liên hệ khách hàng </li></Link>
        <Link to="/history" className="history"><li>Lịch Sử Mua Hàng  </li></Link>
    
        <Link to="/" onClick={logoutUser} className="logout">
        <li>Logout</li>
        </Link>
        {/* <div className="cart-icon">
            <span>{cart.length}</span>
            <Link to="/Service">
              <i  className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div> */}
        </ul>
           <button className="mobile-menu-icon" onClick={()=> setIsMobile(!isMobile)}>
            {isMobile ? <i className="fas fa-times"></i>: <i className="fa-solid fa-bars"></i>}
           </button>
         </nav>  
     </header>

  )}
   
   </>
  );
      
}

       