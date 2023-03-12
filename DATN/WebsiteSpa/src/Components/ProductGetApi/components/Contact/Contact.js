import React, { useState, useContext, useEffect, Fragment } from "react";
import { Cart2 } from "../../GlobalState";
import "./Contact.css";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function Contact() {
  const [contact, setContact] = useState([{ 
    email: "", 
    name: "",
    phonenumber: 0,
    title:"",
    content:"",
 }]);
  const handleInputContact = (e, index, ) => {
    const { name, value } = e.target;
    setContact({...contact, [name] :value});
  };
  const contactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contacts", {...contact});
      setContact({email: "", 
      name: "",
      phonenumber: 0,
      title:"",
      content:""})
    alert("Create Sucessed");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  console.log(contact);
  return (
    <div>
      <div className="contactContainer">
          <div className="infoContact">
            <h1 className="contactTitle">Liên hệ</h1>
            
            <div className="contactItem">
            <form onSubmit={contactSubmit} className="contactsubmit">
                <div className="contactListItem">
                  <div><span className="lsOptionText">
                    Địa chỉ mail:
                  </span></div>
                  <div>
                    <input 
                    type="email" 
                    className="contactInput"
                    name="email" 
                    placeholder="Địa chỉ Email"
                    value={contact.email}
                    onChange={handleInputContact}
                    /></div>
                </div>
                <div className="contactListItem">
                  <div><span className="lsOptionText">
                    Họ và tên
                  </span></div>
                  <div>
                    <input 
                    type="text" 
                    className="contactInput"
                    name="name" 
                    placeholder="Họ và Tên"
                    value={contact.name}
                    onChange={handleInputContact}
                    /></div>
                </div>
                <div className="contactListItem">
                <div>  <span className="lsOptionText">Số điện thoại</span></div>
                  <div><input
                    type="tel"
                    className="contactInput"
                    name="phonenumber" 
                    placeholder="Số điện thoại"
                    value={contact.phonenumber}

                    onChange={handleInputContact}
                  />
                </div></div>
                <div className="contactListItem">
                  <div><span className="lsOptionText">Tiêu đề</span></div>
                 <div> <input
                    type="text"
                    className="contactInput"
                    name="title" 
                    placeholder="Chủ đề"
                    value={contact.title}

                    onChange={handleInputContact}
                  /></div>
                </div>
                <div className="contactListItem">
                <div> <span className="lsOptionText">Nội dung</span></div> 
                <div>  <textarea
                    type="text"
                    className="contactInput"
                    name="content" 
                    placeholder="Nội dung liên hệ"
                    value={contact.content}

                    onChange={handleInputContact}
                  /></div>
                </div>
                <button type="submit">Gửi thông tin</button>
            </form>
            </div>
            
          </div>
         
        
      </div>
    </div>
  );
  };
  