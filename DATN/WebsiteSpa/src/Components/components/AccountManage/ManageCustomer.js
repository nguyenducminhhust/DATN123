import React, { useState, useContext, useEffect, Fragment } from "react";
import { Service } from "../../GlobalState";
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
  note:"",
};
export default function ManageCustomer() {
    const state = useContext(Service);
    const [alluser,setAllUser]=state.alluserAPI.alluser;
    const [customerdata, setCustomerData] = useState(
      initialState
    );
    const [isAdmin]= state.userAPI.isAdmin;
    //Lọc khách hàng
    const customerlist= alluser.filter((alus)=>
    alus.role ===0);   
    const [handlestt, setHandleSTT]=useState(false);
    // phân trang
    const itemsPerPage = 5;
    const [itemOffset, setItemOffset] = useState(0);
    const [editcustomer, setEditCustomer]= useState(null);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = customerlist.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(customerlist.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % customerlist.length;
      setHandleSTT(event.selected);
      setItemOffset(newOffset);
    };
    const onChangeInput = (e) => {
      const { name, value } = e.target;
      setCustomerData({ ...customerdata, [name]: value });
    };
    
    const handleChangeInput = (e) => {
      let { name, value } = e.target;
      value = parseInt(value);
      setCustomerData({ ...customerdata, [name]: value });
    };
    const handleChangeInput2 = (e) => {
      const { name, value } = e.target;
      setCustomerData({ ...customerdata, [name]: value });
    };
  const handleEditClick = (event, stl)=>{
      event.preventDefault();
      setEditCustomer(stl._id);
      const formvalue ={
        name: stl.name,
        email: stl.email,
        phonenumber:stl.phonenumber,
        debt: stl.debt,
        _id: stl._id,
        note:stl.note,
      }
      setCustomerData(formvalue);
  }
  console.log(isAdmin);
  const handleCancelClick = (event, stl)=>{
      event.preventDefault();
      setEditCustomer(null);
  }
  console.log(customerdata);
  const handleDeleteClick = async (staffid)=>{
   
      try {
        const param = staffid._id;
          await axios.delete(`/user/deleteuser/${param}`, {_id: staffid._id}); 
         
        alert("Successful Delete!");
        window.location.reload();
      } catch (err) {
        alert(err.response.data.msg);
      }
  }
  const editformSubmit = async (e) => {
      e.preventDefault();
      const handledebt = customerdata.debt;
      const handlenote =customerdata.note;
      const _id = customerdata._id;
      try {
          await axios.patch("/user/modifydebt", { _id, handledebt,handlenote});
        alert("Cập nhật thành công!");
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
                            { editcustomer === stl._id ? 
                            (<EditDebt
                              isAdmin={isAdmin}
                              index={handlestt?(index+handlestt*itemsPerPage):(index)}
                              customerlist={customerdata}
                                 onChangeInput={onChangeInput}
                                handleChangeInput={handleChangeInput}
                                handleChangeInput2={handleChangeInput2}
                                handleCancelClick={handleCancelClick}
                                
                                />):
                             ( <ReadOnlyCustomer 
                              key={index}
                              isAdmin={isAdmin}
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
          previousLabel="Trước"
          nextLabel="Sau"
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
<div className="viewdatacustomer">Xem Dữ Liệu Khách Hàng:</div>
<div>  <CreateDataProcessUser/></div>
</>
)
}
