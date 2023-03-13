import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Service } from "./Components/GlobalState";
// import Contact from "./Components/Contact/Contact";
import Cart from "./Components/components/mainpages/Cart/Cart";
import Services from "./Components/components/Service/Services";
import Login from "./Components/components/mainpages/auth/Login";
import Register from "./Components/components/mainpages/auth/Register";
import NotFound from "./Components/components/utils/not_found/NotFound"
import DetailService from "./Components/components/detailService/DetailService";
import OrderHistory from "./Components/components/history/OrderHistory"
import OrderDetails from "./Components/components/history/OrderDetails";
import Categories from "./Components/components/categories/Categories";
import CreateService from "./Components/components/createService/CreateService";
import BookingSystem from "./Components/components/BookingSystem/BookingSystem";
import DetailCDPU from "./Components/components/CreateDataProcessUser/DetailCDPU";
import Account from "./Components/components/AccountManage/Account";
import Bookinghtr from "./Components/components/Bookinghtr/Bookinghtr";
import DashBoard from "./Components/components/DashBoard/DashBoard";
import CreateDataProcessUser from "./Components/components/CreateDataProcessUser/CreateDataProcessUser";
import DisplayDataProcessUser from "./Components/DisplayDataProcessUser/DisplayDataProcessUser";
import ContainerService from "./Components/components/ContainerService/ContainerService";
import StaffSchedule from "./Components/components/StaffSchedule/StaffSchedule";
//  import CheckSelect from "./Components/ServiceGetApi/components/CheckSelect";
import Contact from "./Components/components/Contact/Contact";
import ManageStaff from "./Components/components/AccountManage/ManageStaff";
import ManageCustomer from "./Components/components/AccountManage/ManageCustomer";
import Cost from "./Components/components/Cost/Cost";
import ContactTable from "./Components/components/ManageContact/ContactTable";
export default function App() {
  const location = useLocation();
  const state = useContext(Service);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isStaff]= state.userAPI.isStaff;
  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Services />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/bookingsystem" element={<BookingSystem />} />
        <Route path="/containerservice" element={<ContainerService />} />
        <Route path="/services" element={<Services />} />
        <Route path="/detail/:id" exact element={<DetailService />} />
        <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
         <Route path="/bookinghtr" element={<Bookinghtr />} />
         <Route path="/dashboard" element={<DashBoard />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/cost" element={<Cost />} />
         <Route path="/dataprocesscustomer" element={<CreateDataProcessUser />} />
         {/* <Route path="/checkselect" element={<CheckSelect />} /> */}
       <Route path="/managestaff" element={isAdmin ? <ManageStaff /> : <NotFound />} />
       <Route path="/managecustomer" element={isAdmin ? <ManageCustomer /> : <NotFound />} />

         <Route path="/displaydataprocessuser" element={<DisplayDataProcessUser />} />
       
        <Route path="/staffschedule" element={<StaffSchedule />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contacttable" element={<ContactTable />} />
        <Route
          path="/register"
          element={isLogged ? <NotFound /> : <Register />}
        />
        <Route
          path="/history"
          element={isLogged ? <OrderHistory /> : <NotFound />}
        />
        <Route
          path="/history/:id"
          element={isLogged ? <OrderDetails /> : <NotFound />}
        />
        <Route path="*" exact element={<NotFound />} />
        <Route
          path="/category"
          exact
          element={isAdmin ? <Categories /> : <NotFound />}
        />
       
        <Route
          path="/create_service"
          exact
          element={isAdmin ? <CreateService /> : <NotFound />}
        />
        <Route
          path="/accountcreatecompany"
          exact
          element={isAdmin ? <Account /> : <NotFound />}
        />
        <Route
          path="/dataprocesscustomer/update_process/:id"
          exact
          element={(isAdmin||isStaff) ? <DetailCDPU /> : <NotFound />}
        />
        <Route
          path="/managecustomer/update_process/:id"
          exact
          element={(isAdmin||isStaff) ? <DetailCDPU /> : <NotFound />}
        />
        <Route
          path="/edit_service/:id"
          exact
          element={isAdmin ? <CreateService /> : <NotFound />}
        />
      </Routes>
    </div>
  );
}
