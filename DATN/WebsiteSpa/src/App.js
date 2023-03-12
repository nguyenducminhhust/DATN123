import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Cart2 } from "./Components/ProductGetApi/GlobalState";
// import Contact from "./Components/Contact/Contact";
import Product2 from "./Components/ProductGetApi/components/products/Products";
import Login from "./Components/ProductGetApi/components/mainpages/auth/Login";
import Register from "./Components/ProductGetApi/components/mainpages/auth/Register";
import Cart3 from "./Components/ProductGetApi/components/mainpages/Cart/Cart";
import NotFound from "./Components/ProductGetApi/components/utils/not_found/NotFound";
import DetailProduct from "./Components/ProductGetApi/components/detailProduct/DetailProduct";
import OrderHistory from "./Components/ProductGetApi/components/history/OrderHistory";
import OrderDetails from "./Components/ProductGetApi/components/history/OrderDetails";
import Categories from "./Components/ProductGetApi/components/categories/Categories";
import CreateProduct from "./Components/ProductGetApi/components/createProduct/CreateProduct";
import BookingSystem from "./Components/ProductGetApi/components/BookingSystem/BookingSystem";
import DetailCDPU from "./Components/ProductGetApi/components/CreateDataProcessUser/DetailCDPU";
import Account from "./Components/ProductGetApi/components/AccountManage/Account";
import Bookinghtr from "./Components/ProductGetApi/components/Bookinghtr/Bookinghtr";
import DashBoard from "./Components/ProductGetApi/components/DashBoard/DashBoard";
import CreateDataProcessUser from "./Components/ProductGetApi/components/CreateDataProcessUser/CreateDataProcessUser";
import DisplayDataProcessUser from "./Components/ProductGetApi/DisplayDataProcessUser/DisplayDataProcessUser";
import ContainerService from "./Components/ProductGetApi/components/ContainerService/ContainerService";
import StaffSchedule from "./Components/ProductGetApi/components/StaffSchedule/StaffSchedule";
//  import CheckSelect from "./Components/ProductGetApi/components/CheckSelect";
import Contact from "./Components/ProductGetApi/components/Contact/Contact";
import ManageStaff from "./Components/ProductGetApi/components/AccountManage/ManageStaff";
import ManageCustomer from "./Components/ProductGetApi/components/AccountManage/ManageCustomer";
import Cost from "./Components/ProductGetApi/components/Cost/Cost";
export default function App() {
  const location = useLocation();
  const state = useContext(Cart2);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isStaff]= state.userAPI.isStaff;
  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Product2 />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/bookingsystem" element={<BookingSystem />} />
        <Route path="/containerservice" element={<ContainerService />} />
        <Route path="/products" element={<Product2 />} />
        <Route path="/detail/:id" exact element={<DetailProduct />} />
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
        <Route path="/cart2" element={<Cart3 />} />
        <Route path="*" exact element={<NotFound />} />
        <Route
          path="/category"
          exact
          element={isAdmin ? <Categories /> : <NotFound />}
        />
       
        <Route
          path="/create_product"
          exact
          element={isAdmin ? <CreateProduct /> : <NotFound />}
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
          path="/edit_product/:id"
          exact
          element={isAdmin ? <CreateProduct /> : <NotFound />}
        />
      </Routes>
    </div>
  );
}
