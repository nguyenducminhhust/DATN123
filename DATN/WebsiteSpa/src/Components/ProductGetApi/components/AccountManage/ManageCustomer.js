import React, { useState, useContext, useEffect, Fragment } from "react";
import { Cart2 } from "../../GlobalState";
import axios from "axios";
import ReadOnlyCustomer from "./ReadOnlyCustomer";
import "./ManageCustomer.css"
import Header from "../headers/Header";
import ReactPaginate from "react-paginate";
import EditDebt from "./EditDebt";
import CreateDataProcessUser from "../CreateDataProcessUser/CreateDataProcessUser";

const initialState = {
  name: "",
  email: "",
  phonenumber:0,
  totalsession: 0,
  debt: 0,
  totalservicebuycustomer:0,
  _id:0,
};
export default function ManageCustomer() {
    const state = useContext(Cart2);
    const [alluser,setAllUser]=state.userstaffAPI.alluser;
    const [customerdata, setCustomerData] = useState(
      initialState
    );
    const customerlist= alluser.filter((alus)=>
    alus.role ===0);   
    const [handlestt, setHandleSTT]=useState(false);
    const itemsPerPage = 5;
    const [itemOffset, setItemOffset] = useState(0);
    const [editstaff, setEditStaff]= useState(null);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = customerlist.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(customerlist.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % customerlist.length;
      
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setHandleSTT(event.selected);
      setItemOffset(newOffset);
    };
    const onChangeInput = (e) => {
      const { name, value } = e.target;
      //console.log(name, value);
      setCustomerData({ ...customerdata, [name]: value });
    };
    
    const handleChangeInputRole = (e) => {
      let { name, value } = e.target;
      //console.log(name, value);
      value = parseInt(value);
      setCustomerData({ ...customerdata, [name]: value });
      
      // if (!e.target.value) {
      //   setSelect([]);
      //   return;
      // }
  
      // if (select.includes(e.target.value)) {
      //   setSelect((value) => value.filter((val) => val !== e.target.value));
      // } else {
      //   setSelect(e.target.value);
      // }
    };
    const handleChangeInputRole2 = (e) => {
      const { name, value } = e.target;
      //console.log(name, value);
      setCustomerData({ ...customerdata, [name]: value });
      // console.log(name, typeof name, value, typeof value);
      // console.log(user);
      // if (!e.target.value) {
      //   setSelect([]);
      //   return;
      // }
  
      // if (select.includes(e.target.value)) {
      //   setSelect((value) => value.filter((val) => val !== e.target.value));
      // } else {
      //   setSelect(e.target.value);
      // }
    };
  const handleEditClick = (event, stl)=>{
      event.preventDefault();
      setEditStaff(stl._id);
      const formvalue ={
        name: stl.name,
        email: stl.email,
        phonenumber:stl.phonenumber,
        // totalservicebuycustomer: stl.totalservicebuycustomer,
        // totalsession: 0,
        debt: stl.debt,
        _id: stl._id,
      }
      setCustomerData(formvalue);
  }
  const handleCancelClick = (event, stl)=>{
      event.preventDefault();
      setEditStaff(null);
  }
  console.log(customerdata);
  const handleDeleteClick = async (staffid)=>{
   
      try {
        const param = staffid._id;
          await axios.delete(`/user/deleteuser/${param}`, {_id: staffid._id}); //images
         
        alert("Successful Delete!");
        window.location.reload();
      } catch (err) {
        alert(err.response.data.msg);
      }
  }
  // console.log(test);
  const editformSubmit = async (e) => {
      e.preventDefault();
      const handledebt = customerdata.debt;
      const _id = customerdata._id;
      try {
          await axios.patch("/user/modifydebt", { _id, handledebt}); //images
          // console.log(user);
          // setUser({...initialState} );
          // setText("Created Succes");
          // setChecked(true);
        alert("Success update!");
        window.location.reload();

      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    return( <>
      <Header/>
      <div className="titlemanagecustomer">
        <h2> Quản Lý Khách Hàng</h2>
        <p>Tổng số Khách Hàng: {customerlist.length}</p>
      </div>
<div className="managecustomer">
    <form onSubmit={editformSubmit}>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Địa Chỉ Email</th>
                        <th>Họ Và Tên</th>
                        <th>Số Điện Thoại</th>
                        <th>Tổng số liệu trình đã mua</th>
                        <th>Tổng chi tiêu</th>
                        <th>Tổng số buổi liệu trình</th>
                        <th>Tiền chưa thanh toán</th>
                        <th>Ghi chú</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((stl, index) => (  
                         <Fragment>
                            { editstaff === stl._id ? 
                            (<EditDebt
                              index={handlestt?(index+handlestt*itemsPerPage):(index)}
                              customerlist={customerdata}
                                 onChangeInput={onChangeInput}
                                handleChangeInputRole={handleChangeInputRole}
                                handleChangeInputRole2={handleChangeInputRole2}
                                handleCancelClick={handleCancelClick}
                                
                                />):
                             ( <ReadOnlyCustomer 
                              key={index}
                              index={index+handlestt*itemsPerPage}
                              customerlist={stl} 
                              handleEditClick={handleEditClick}
                              handleDeleteClick={handleDeleteClick}
                              />)
                            }
                        </Fragment>
                        )
                    )}
                </tbody>
            </table>
            </form>
            <div className="paginatemanagecustomer">
              <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
       </div>
       
</div>
<div> <CreateDataProcessUser/></div>
</>
)
}
