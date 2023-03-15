import React, { useState, useContext, useEffect, Fragment } from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import ReadOnlyStaff from "./ReadOnlyStaff";
import EditStaff from "./EditStaff";
import Header from "../headers/Header";
import "./ManageStaff.css"
import ReactPaginate from "react-paginate";
import StaffSchedule from "../StaffSchedule/StaffSchedule";
const initialState = {
      name: "",
      email: "",
      password: "",
      role: 0,
      service: "",
      kindofstaff: "",
      phonenumber:0,
      salary: "",
  };
export default function ManageStaff() {
    const state = useContext(Service);
    const [alluser,setAllUser]=state.alluserAPI.alluser;
    const [staffdata, setStaffData] = useState(
        initialState
      );
      const [token] = state.token;
      // lọc ra danh sách nhân viên
    const stafflist= alluser.filter((alus)=>
    alus.role ===2);
    const [handlestt, setHandleSTT]=useState(false);
    const [callback, setCallBack]= state.alluserAPI.callback;
    const [editstaff, setEditStaff]= useState(null);
    // phân trang
    const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = stafflist.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(stafflist.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % stafflist.length;
    setHandleSTT(event.selected);
    setItemOffset(newOffset);
  };
     useEffect(() => {
      const getAllUser = async() => {
        const res = await axios.get("/user/alluser");
        setAllUser(res.data);
    };
      getAllUser()
      }
    , [token,setAllUser, callback]);
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setStaffData({ ...staffdata, [name]: value });
      };
      
      const handleChangeInput = (e) => {
        let { name, value } = e.target;
        value = parseInt(value);
        setStaffData({ ...staffdata, [name]: value });
      };
      const handleChangeInput2 = (e) => {
        const { name, value } = e.target;
        setStaffData({ ...staffdata, [name]: value });
      };
    const handleEditClick = (event, stl)=>{
        event.preventDefault();
        setEditStaff(stl._id);
        const formvalue ={
            name: stl.name,
            email: stl.email,
            password: stl.password,
            role: stl.role,
            service: stl.service,
            kindofstaff: stl.kindofstaff,
            phonenumber: stl.phonenumber,
            salary: stl.salary,
        }
        setStaffData(formvalue);
    }
    // hủy thao tác
    const handleCancelClick = (event, stl)=>{
        event.preventDefault();
        setEditStaff(null);
    }
    // xóa thông tin nhân viên
    const handleDeleteClick = async (staffid)=>{
        try {
          const param = staffid._id;
            await axios.delete(`/user/deleteuser/${param}`, {_id: staffid._id});
            setCallBack(!callback);
          alert("Xóa thành công!");
        } catch (err) {
          alert(err.response.data.msg);
        }
    }
    // cập nhật thông tin nhân viên
    const editformSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("/user/updatestaff", { ...staffdata}); 
            setEditStaff(null);
            setCallBack(!callback);
          alert("Cập nhật thành công!");
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
    return( <>
      <Header/>
      <div className="titlemanagestaff">
        <h2> Quản Lý Nhân Viên</h2>
        <p>Tổng số Nhân Viên Spa: {stafflist.length}</p>
      </div>
<div className="managestaff">
    <form onSubmit={editformSubmit}>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Địa Chỉ Email</th>
                        <th>Họ Và Tên</th>
                        <th>Số Điện Thoại</th>
                        <th>Phân Quyền</th>
                        <th>Loại Nhân Viên</th>
                        <th>Dịch Vụ</th>
                        <th>Lương</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((stl, index) => (
                        <Fragment>
                            { editstaff === stl._id ? 
                            (<EditStaff 
                              index={handlestt?(index+handlestt*itemsPerPage):(index)}
                                staffdata={staffdata}
                                onChangeInput={onChangeInput}
                                handleChangeInput={handleChangeInput}
                                handleChangeInput2={handleChangeInput2}
                                handleCancelClick={handleCancelClick}
                                />):
                             ( <ReadOnlyStaff key={index} 
                                index={index+handlestt*itemsPerPage}
                                stafflist={stl} 
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
            <div className="paginatemanagestaff">
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
       <StaffSchedule/>
</div>
    
</>
)
}
