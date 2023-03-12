import React, { useState, useContext } from "react";
import Header from "../headers/Header";
import axios from "axios";
//import "../mainpages/auth/login.css";
import { useNavigate } from "react-router-dom";
//import "./Account.css";
import { Cart2 } from "../../GlobalState";
//import Loading from "../utils/loading/Loading";
//import PasswordStrengthBar from "react-password-strength-bar";
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
export default function Account() {
  const state = useContext(Cart2);
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
  function isValidEmail(email) {
    return /\S+@\S+/.test(email);
  }
  const Input = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // if (!isValidEmail(e.target.value)) {
    //   setErr(1);
    // } else if (isValidEmail(e.target.value)) {
    //   setErr(2);
    // } else {
    //   setErr(null);
    // }

  };
const handleChangeInputDate = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value.toString() });
    //console.log(name, value);
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  
  const handleChangeInputRole = (e) => {
    let { name, value } = e.target;
    //console.log(name, value);
    value = parseInt(value);
    setUser({ ...user, [name]: value });
    
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
    setUser({ ...user, [name]: value });
    console.log(name, typeof name, value, typeof value);
    console.log(user);
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
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      
      // if(user.role ==""){
      //   setText("Ban can chon Role");
      // } else if ( user.kindofstaff==""){ 
      //   setText("Ban can chon loai nhan vien");
      // }
      // else if(user.service ==""){
      //   setText("Ban can chon loai dich vụ");
      // } else {}
        await axios.post("/user/createaccount", { ...user}); //images
        console.log(user);
        setUser({...initialState} );
        setText("Created Succes");
        setChecked(true);
      
        
      // localStorage.setItem("firstLogin", false); // Luu y
      // history("/account");
      
  //    console.log(localStorage.getItem("firstLogin"), typeof localStorage.getItem("firstLogin"));

  //    alert("Create Success");
      // window.location.href = "/";
    //   window.location.reload();
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     try {
//       const file = e.target.files[0];

//       if (!file) return alert("File not exist.");

//       if (file.size > 1024 * 1024)
//         // 1mb
//         return alert("Size too large!");

//       if (
//         file.type !== "image/jpeg" &&
//         file.type !== "image/png" &&
//         file.type !== "image/webp" &&
//         file.type !== "image/jpg"
//       )
//         // 1mb
//         return alert("File format is incorrect.");

//       let formData = new FormData();
//       formData.append("file", file);

//       setLoading(true);
//       const res = await axios.post("/api/upload", formData, {
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: token,
//         },
//       });
//       setLoading(false);
//       setImages(res.data);
//     } catch (err) {
//       alert(err.response.data.msg);
//     }
//   };
//   const handleDestroy = async () => {
//     try {
//       setLoading(true);
//       await axios.post(
//         "/api/destroy",
//         { public_id: images.public_id },
//         {
//           headers: { Authorization: token },
//         }
//       );
//       setLoading(false);
//       setImages(false);
//     } catch (err) {
//       alert(err.response.data.msg);
//     }
//   };
  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <>
   <Header />
      <div className="login-page">
        <form onSubmit={registerSubmit}>
          <h2>Create Account</h2>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            value={user.name}
            onChange={onChangeInput}
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            required
            // autoComplete="on"
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
          />
          <input
            type="number"
            name="phonenumber"
            required
            // autoComplete="on"
            placeholder="PhoneNumber"
            defaultvalue={user.phonenumber}
            onChange={onChangeInput}
          />
          {/* <PasswordStrengthBar password={user.password} /> */}
          <select
            id="role"
            name="role"
            onChange={handleChangeInputRole}
            required
            className="replaced"
            value = {user.role}
          >
            <option value="">Please select role</option>
            {/* <option value="0">0. Customer</option> */}
            <option value="1">1. Manager</option>
            <option value="2">2. Staff</option>
          </select>
          <select
            id="kindofstaff"
            name="kindofstaff"
            onChange={handleChangeInputRole2}
            className="replaced2"
            value={user.kindofstaff}
            required
          >
            <option value="default" >Please select Kind of Staff</option>
            {/* <option value="00. Customer</option> */}
            <option value="spa therapist">1. Kĩ Thuật Viên </option>
            <option value="doctor">2. Bác Sĩ</option>
          </select>
          <select
            id="service"
            name="service"
            onChange={handleChangeInputRole2}
            className="replaced3"
            required
            value={user.service}
          >
            <option value="default">Please select Service</option>
            <option value="Chăm Sóc Da">1. Chăm Sóc Da</option>
            <option value="Thăm Khám">2. Thăm Khám</option>
            <option value="Trị Mụn">3. Trị Mụn</option>
            <option value="Triệt Lông">4. Triệt Lông</option>

          </select>
          <input
            type="text"
            name="salary"
            required
            placeholder="Salary"
            value={user.salary}
            onChange={onChangeInput}
          />
          <div className="row_id">
            <button type="submit" >Create</button>
            {checked && (<p >{text}</p>)}
          </div>
        </form>
      </div>
    </>
  );
}
