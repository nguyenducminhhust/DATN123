import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Service } from "../../GlobalState";
import Loading from "../utils/loading/Loading";
import Header from "../headers/Header";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailCDPU.css"
//DataProcessUser-DPU
//dataprocesscustomer-dpu
const initialState = {
  dataprocesscustomerid: "",
    session: 1 ,
    staff: "",
    daymake:"",
    service:"",
    _id:"",
};

export default function DetailCDPU() {
  const state = useContext(Service);
  const [dpu, setDPU] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const userdata = state.alluserAPI.alluser;
  const param = useParams();
  const [callback, setCallback] = state.servicesAPI.callback;
  const [useremail, setUserEmail] = useState({
    useremail1: "",
  });
  const history = useNavigate();
  let emailusercheck = useremail.useremail1;
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
       const file = e.target.files[0];
      if (file.size > 1024 * 1024)
        return alert("Kích thước quá lớn!");

      if (file.type !== "image/webp" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/png"

      )
        return alert("Định dạng tệp không chính xác.");

      let formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err);
    }
  };

  const handleDestroy = async () => {
    try {
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDPU({ ...dpu, [name]: value });
  };
  const handleChangeInput2 = (e) => {
    const { name, value } = e.target;
    setDPU({ ...dpu, [name]: parseInt(value) });
  };
  const handleChangeInputDate = (e) => {
    const { name, value } = e.target;
    setDPU({ ...dpu, [name]: value.toString() });
  };
  // tạo thông tin buổi điều trị cho khách
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(window.confirm("Bạn chắc chắn với những thông tin này!")){
        let adddetailprocessinfo= [];
        adddetailprocessinfo.push({...dpu, images, _id: param.id});
       await axios.patch(`/api/adddetailprocess/${param.id}`, { adddetailprocessinfo});}
        setCallback(!callback);
        console.log(dpu);
      alert("Thành công!");
      history("/managecustomer");
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <>
      <Header />      
      <>
        <div className="create_dpu">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>
          <div className="formupdatedata">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="staff">Nhân Viên Làm</label>
            <input
              type="text"
              name="staff"
              required
              defaultValue={dpu.staff}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="session">Buổi Làm Thứ</label>
            <input
              type="number"
              name="session"
              required
              defaultValue={dpu.session}
              onChange={handleChangeInput2}
            />
          </div>
          <div className="row">
            <label htmlFor="service">Mô tả dịch vụ</label>
            <textarea
              type="text"
              name="service"
              required
              defaultValue={dpu.service}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="daymake">Ngày Làm</label>
            <input
            type="date"
            name="daymake"
            required
            onChange={handleChangeInputDate}
            defaultValue={dpu.daymake}
          />
          </div>
          <button type="submit">Tạo</button>
        </form>
      </div>
      </div>
      </>

      
    </>
  );
}
