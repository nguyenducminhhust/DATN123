import React, { useState, useContext, useEffect, Fragment } from "react";
import { Cart2 } from "../../GlobalState";
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
    const state = useContext(Cart2);
    const [alluser,setAllUser]=state.userstaffAPI.alluser;
    const [staffdata, setStaffData] = useState(
        initialState
      );
    const stafflist= alluser.filter((alus)=>
    alus.role ===2);
    
    const [handlestt, setHandleSTT]=useState(false);
    const [callback, setCallBack]= useState(false);
    const [editstaff, setEditStaff]= useState(null);
    const [test, setTest]= useState(false);
    const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = stafflist.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(stafflist.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % stafflist.length;
    
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setHandleSTT(event.selected);
    setItemOffset(newOffset);
  };

    //  useEffect(() => {
    //     const getAllUser = async() => {
    //     const getstaff = alluser.filter((alus)=>
    //     alus.role===2
    //     )
    //     setStaffList(getstaff);
    //     //   const res = await axios.get("/user/userstaff");
    //     //   console.log(res);
    //     // //   res.data.role === 2 ? setIsStaff(true) : setIsStaff(false);
    //     //  setAllUser(res.data);
    //     //  setStaffList(alluser.filter((alus)=>
    //     //     alus.role ===2
    //     //     ));
    //     //   console.log(res.data);

    //   };
    //     // getAllUser()
    //   }
    // , []);
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        //console.log(name, value);
        setStaffData({ ...staffdata, [name]: value });
      };
      
      const handleChangeInputRole = (e) => {
        let { name, value } = e.target;
        //console.log(name, value);
        value = parseInt(value);
        setStaffData({ ...staffdata, [name]: value });
        
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
        setStaffData({ ...staffdata, [name]: value });
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
            password: stl.password,
            role: stl.role,
            service: stl.service,
            kindofstaff: stl.kindofstaff,
            phonenumber: stl.phonenumber,
            salary: stl.salary,
        }
        setStaffData(formvalue);
    }
    const handleCancelClick = (event, stl)=>{
        event.preventDefault();
        setEditStaff(null);
    }
    const handleDeleteClick = async (staffid)=>{
        // staffid.preventDefault();
        // setTest(staffid);
        try {
          const param = staffid._id;
            await axios.delete(`/user/deleteuser/${param}`, {_id: staffid._id}); //images
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
    console.log(test);
    const editformSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("/user/updatestaff", { ...staffdata}); //images
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
    console.log(stafflist);
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
                                handleChangeInputRole={handleChangeInputRole}
                                handleChangeInputRole2={handleChangeInputRole2}
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
       <StaffSchedule/>
</div>
    
</>
)
}
