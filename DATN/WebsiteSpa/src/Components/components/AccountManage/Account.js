import React, { useState, useContext } from "react";
import Header from "../headers/Header";
import axios from "axios";
//import "../mainpages/auth/login.css";
import { useNavigate } from "react-router-dom";
//import "./Account.css";
import { Service } from "../../GlobalState";
import { debounce } from "lodash";

import "./Account.css";
const initialState = {
  name: "",
    email: "",
    password: "",
    role: 0,
    service: "",
    kindofstaff: "",
    phonenumber:0,
    salary: 0,
};
export default function Account() {
  const state = useContext(Service);
  const [user, setUser] = useState(
    initialState
  );
  const [checked, setChecked]= useState(false);
  const history = useNavigate();
  const [select, setSelect] = useState([]);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const [err, setErr] = useState();
  const [text, setText] = useState(); 
  const [category, setCategory]=state.categoriesAPI.categories;
  const [callback, setCallBack] = state.alluserAPI.callback;

  
const handleChangeInputDate = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value.toString() });
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  const handleChangeInputRole = (e) => {
    let { name, value } = e.target;
    value = parseInt(value);
    setUser({ ...user, [name]: value });
    
  
  };
  const handleChangeInputRole2 = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("/user/createaccount", { ...user}); //images
        console.log(user);
        setUser({...initialState} );
        setText("Created Succes");
        setChecked(true);
        setCallBack(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  console.log(user);
  return (
    <>
   <Header />
      <div className="login-page">
        <form onSubmit={registerSubmit}>
          <h2>Tạo Tài Khoản</h2>
          <input
            type="text"
            name="name"
            required
            placeholder="Họ và Tên"
            value={user.name}
            onChange={onChangeInput}
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Địa chỉ Email"
            value={user.email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            required
            // autoComplete="on"
            placeholder="Mật khẩu"
            value={user.password}
            onChange={onChangeInput}
          />
          <input
            type="tel"
            name="phonenumber"
            required
            // autoComplete="on"
            placeholder="Số điện thoại"
            defaultvalue={user.phonenumber}
            onChange={onChangeInput}
          />
          {/* <PasswordStrengthBar password={user.password} /> */}
          <select
            id="role"
            name="role"
            onChange={handleChangeInputRole}
            required
            className="staffaccountselect1"
            value = {user.role}
          >
            <option value="">Chọn phân quyền</option>
            {/* <option value="0">0. Customer</option> */}
            <option value="1">1. Quản Lý</option>
            <option value="2">2. Nhân Viên</option>
          </select>
          <select
            id="kindofstaff"
            name="kindofstaff"
            onChange={handleChangeInputRole2}
            className="staffaccountselect2"
            value={user.kindofstaff}
            required
          >
            <option value="default" >Chọn kiểu nhân viên</option>
            {/* <option value="00. Customer</option> */}
            <option value="Kĩ Thuật Viên">1. Kĩ Thuật Viên </option>
            <option value="Bác Sĩ">2. Bác Sĩ</option>
          </select>
          <select
            id="service"
            name="service"
            onChange={handleChangeInputRole2}
            className="staffaccountselect3"
            required
            value={user.service}
          >
            <option value="default">Chọn danh mục dịch vụ</option>
            {category.map((ctg, index)=>
            <option value={ctg.name}>{`${index+1}. ${ctg.name}`}</option>
            )}

          </select>
          <input
            type="number"
            name="salary"
            required
            placeholder="Lương"
            value={user.salary}
            onChange={handleChangeInputRole}
          />
          <div className="row_id">
            <button type="submit" >Tạo</button>
            {checked && (<p >{text}</p>)}
          </div>
        </form>
      </div>
    </>
  );
}
