import React, { useState, useContext, useEffect } from "react";
//import "./createProduct.css";
import axios from "axios";
import { Cart2 } from "../../GlobalState";
import Loading from "../utils/loading/Loading";
import Header from "../headers/Header";

import { useNavigate, useParams } from "react-router-dom";
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
  const state = useContext(Cart2);
  const [dpu, setDPU] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getdatauser, setGetDataUser] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const userdata = state.userstaffAPI.alluser;
  const param = useParams();
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [dpus] = state.dataprocesscustomerAPI.dataprocesscustomer; // data timebought of user
  const [callback, setCallback] = state.productsAPI.callback;
  const [updatecheck, setUpdateCheck] = useState(false);
  const [upcs, setUPCS]= state.containerserviceAPI.containerservice; // container data
  const [useremail, setUserEmail] = useState({
    useremail1: "",
  });
  const [serviceboughtcheck, setSBK] = useState();
//   useEffect(() => {
    
//         setUpdateCheck(true);
//         dpus.forEach((dpus) => {
//         if (dpus._id === param.id) {   
//           setImages(dpus.images);
//         }
//       });
//   }, [param.id]);

//   console.log(images);
  const handleEmail = (e) => {
    const { name, value } = e.target;
    setUserEmail({ useremail1: value });
    
  }

  let emailusercheck = useremail.useremail1;
 
  const checkemailSubmit = () => {
    const CheckEmail =  userdata[0].filter((userlist) => userlist.email == emailusercheck )
    setGetDataUser(CheckEmail);
    setSBK( CheckEmail[0].servicebought);
    if(CheckEmail.length >=1){setCheck(true);}
    else {setCheck(false); }
    
  };
  //console.log(serviceboughtcheck);
const upContainerService = async ()=> {
  const checkupcs = upcs.filter((upcs)=>
  (upcs.serviceid == "63eee97fad5fcf68886df046")&&(upcs.timebought==1)
  );
  const serviceid = checkupcs[0].serviceid;
  const timebought = checkupcs[0].timebought;
  const detailpcs = [dpu];
  console.log(serviceid,timebought, detailpcs, typeof detailpcs );
  await axios.patch(
    "/user/adddetailprocess", 
    {detailpcs,serviceid, timebought},
  );
};
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
    //   if (!isAdmin) return alert("You're not an admin");
       const file = e.target.files[0];

    //   if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/webp" &&
        file.type !== "image/jpg"
      )
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      //setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      //setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
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
    setDPU({ ...dpu, dataprocesscustomerid : e });
  };
  const handleChangeInputDate = (e) => {
    const { name, value } = e.target;
    setDPU({ ...dpu, [name]: value.toString() });
  };
  const [test, setTest]= useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      window.confirm("Are you sure with this infor!");
        let adddetailprocessinfo= [];
        adddetailprocessinfo.push({...dpu, images, _id: param.id});
        setTest(adddetailprocessinfo);
        // console.log(adddetailprocessinfo, typeof adddetailprocessinfo);
       await axios.patch(`/api/adddetailprocess/${param.id}`, { adddetailprocessinfo});
        setCallback(!callback);
        console.log(dpu);
    
//      upContainerService();
      alert("Sucess");
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    console.log(test);
  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <>
      <Header />      
{/* 
      //////////////////// */}

 
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
              {/* <span onClick={handleDestroy}>X</span> */}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
           {/* <div className="row">
            <label htmlFor="dataprocesscustomerid">DPU Email</label>
            <input
              type="text"
              name="dataprocesscustomerid"
              required
              value={getdatauser[0].email}
              onChange={handleChangeInput2}
              
            />
          </div>  */}
          <div className="row">
            <label htmlFor="staff">Staff</label>
            <input
              type="text"
              name="staff"
             // id="staff"
              required
              defaultValue={dpu.staff}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="session">Session</label>
            <input
              type="number"
              name="session"
       
              required
              defaultValue={dpu.session}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="service">Service</label>
            <input
              type="text"
              name="service"
          
              required

              defaultValue={dpu.service}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="daymake">DayMake</label>
            <input
            type="date"
            name="daymake"
            required
            onChange={handleChangeInputDate}
            defaultValue={dpu.daymake}
          />
          </div>

          <button type="submit">Create</button>
        </form>
      </div>
      </>

      
    </>
  );
}
