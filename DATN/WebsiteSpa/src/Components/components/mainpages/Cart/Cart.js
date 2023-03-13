import React, { useContext, useState, useEffect } from "react";
import Header from "../../headers/Header";
import { Service } from "../../../GlobalState";
import Footer from "../../Footer/Footer";
import axios from "axios";
import "./cart.css";
import PaypalButton from "./PaypalButton";
import ContainerService from "../../ContainerService/ContainerService";
import { debounce } from "lodash";

export default function Cart() {
  const state = useContext(Service);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;
  const [pdid, setPDID] = useState([]);
  const [pdemail, setPDEMAIL] = useState([]);
  const [pdname, setPDName] = useState([]);
  const [pdsession, setPDSession] = useState([]);
  const [pdidlist, setPDIDList] = useState([]);
  const [callback, setCallBack] = state.userAPI.callback;
  const [usertimebought, setTimeBought] = state.userAPI.userdataprocess;
  const [paymentid, setPaymentID] = useState();
  const [user, setUser]= state.userAPI.user;
  const [pid, setPID] = useState("");
  const [callback2, setCallBack2] = useState(false);
  const [isOnlinePayment, setOnlinePayment]=useState(false);
  const [isCashPayment, setCashPayment]=useState(false);
  const [callbackcontainerservice, setCallBackContainerService] = state.containerserviceAPI.callback;
  const [status, setStatus] = useState(false);

 // mảng timebought

  // const [initservice, setInitService] = useState({
  //       serviceid: "",
  //       timebought: 1,
  //     });
    // console.log(cart[0]);
  
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/user/infor", {
          headers: { Authorization: token },
        }); 
        // const cart = res.data.cart;
        // setCart(cart);
        const servicebought = res.data.servicebought;
        setTimeBought(servicebought);
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    getUser();
   
  
  }, [callback], [callback2]);
  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };
  const addServiceBought = async (paymentID, cartlength) => {
    let cartupdate = []
    for (let i = 0; i < cartlength; i++) {
      const value = cart[i];
      // console.log(value);
      cartupdate.push({...value,paymentid: paymentID} );
    };
  // setPID(paymentID);
    
    await axios.patch(
      "/user/addservicebought", 
      {cartupdate},
      {
        headers: { Authorization: token },
      }
    );
    setCallBack2(!callback2);
    // setCallBack(!callback);
  };
  // console.log(pid, typeof pid);
  // const increment = (id) => {
  //   cart.forEach((item) => {
  //     if (item._id === id && item.quantity<item.stock) {
  //       item.quantity += 1;
  //     }
  //     else if(item.quantity>=item.stock&&item._id === id) {
  //       alert("You added maximum service on stock");
  //     }
  //   });

  //   setCart([...cart]);
  //   addToCart(cart);
  // };

  // const decrement = (id) => {
  //   cart.forEach((item) => {
  //     if (item._id === id) {
  //       item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
  //     }
  //   });

  //   setCart([...cart]);
  //   addToCart(cart);
  // };

  const removeService = (id) => {
    if (window.confirm("Do you want to delete this service?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address, status},
      {
        headers: { Authorization: token },
      }
    );
   
    addServiceBought(paymentID, cart.length);
    initService(paymentID);
    setCart([]);
    addToCart([]);

    setCallBack(!callback);
    setCallBackContainerService(!callbackcontainerservice);
    alert("Bạn đã đặt hàng thành công.");
  };
  

  
  const cashpayment = debounce(async () => {
    const paymentID= `id${user.name}${new Date().getTime()}`; // Tạo id cho khách thanh toán tiền mặt
    const handledebt = user.debt+total;
    
    await axios.post(
      "/api/payment",
      { cart, paymentID, status },
      {
        headers: { Authorization: token },
      }
    );
    await axios.patch(
      "/user/updatedebt",
      {handledebt},
      {
        headers: { Authorization: token },
      }
    )  
    addServiceBought(paymentID, cart.length);
    initService(paymentID);
    setCart([]);
    addToCart([]);
    setCallBack(!callback);
    setCallBackContainerService(!callbackcontainerservice);
    alert("Bạn đã đặt hàng thành công.");
  },1000);
  const initser = async (info, paymentID) => {
    let timeboughtcheked = [];
     for (let i=0; i<pdid.length;i++){
    const checkTimeBought = usertimebought.filter((utb) => 
  utb._id ==pdid[i]
     );    
   const lengthcheck = checkTimeBought.length;
   timeboughtcheked.push(lengthcheck);
  }
    const initservice = ({ timebought: (timeboughtcheked[info] +1 )  , serviceid: pdid[info], email: pdemail[info], paymentid: paymentID, servicename: pdname[info], totalsession: pdsession[info], status: status});
    console.log(initservice);
    await axios.post("/api/containerservice", { ...initservice });
    console.log(initservice.timebought);
  }
   console.log(cart);
  const initService = async (paymentID) => {

    for (let i = 0; i < cart.length; i++) {
      const value = cart[i]._id;
      pdid.push(value);
    };
    for (let i = 0; i < cart.length; i++) {
      const value = cart[i].email;
      pdemail.push(value);
    };
    for (let i = 0; i < cart.length; i++) {
      const value = cart[i].title;
      pdname.push(value);
    };
    for (let i = 0; i < cart.length; i++) {
      const value = cart[i].session;
      pdsession.push(value);
    };
    for (let i = 0; i < pdid.length; i++) {
      await initser(i, paymentID);
    };    
     };   

  const clickcashpaybut =()=>{
     setOnlinePayment(false);
     setCashPayment(true);
     setStatus(false);
  }
  const clickonlinepaybut =()=>{
    setOnlinePayment(true);
    setCashPayment(false);
    setStatus(true);
  }
  if (cart.length === 0)
    return (
      <>
        <Header />
        <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
      </>
    );
  return (
    <>
      <Header />
      <div className="cartcheckfinal">

        <div className="infocustomerbuy">
          <div className="infoall">
            <span className="infoname">Tên khách hàng:    </span>
            <span>{user.name}</span>
            <br />
            <span className="infoemail">Email khách hàng: </span>
            <span>{user.email}</span>
          </div>
          <div className="blockbetween"></div>
        </div>
        <div className="infocart">
          {cart.map((service, index) => (
            <div className="detailcart" key={service._id}>
              <p>STT: {index+1}</p>
              <div className="boxdetail">
              <div className="imgborder">
                <img src={service.images.url} alt="" className="imgcartfinal" />
              </div>
              
                <div className="detailtreatment">
                  <h2>{service.title}</h2>
                  <h3>Gói đã chọn : <small>{service.detailsession}</small></h3>
                  <h3>Tổng số buổi: {service.session}</h3>
                  <h3>$ {service.price * service.quantity}</h3>
                  {/* <p>{service.description}</p>
                  <p>{service.content}</p> */}
                </div>
                <div className="amount">
                  {/* <button onClick={() => decrement(service._id)}> - </button> */}
                  {/* <span>{service.quantity}</span> */}
                  {/* <button onClick={() => increment(service._id)}>+ </button> */}
                </div>
                </div>
                <div
                  className="deleteservice"
                  onClick={() => removeService(service._id)}
                >
                  X
                </div>
                
              
              <div className="blockbetweenservice"></div>
            </div>
            
          ))}
        </div>
        <div className="total">
          <h3>Tổng cộng: $ {total}</h3>
          <div className="choosetypepayment">
              <div className="typepayment" onClick={()=>{clickonlinepaybut()}} >Thanh toán trực tuyến</div>
              <div className="typepayment" onClick={()=>{clickcashpaybut()}}>Thanh toán tiền mặt</div>
          </div>
          <div className="buttonpayment">
              {(isCashPayment)&&(<div className="cashpay" onClick={()=>cashpayment()}>Xác nhận thanh toán tiền mặt</div>)}
             {(isOnlinePayment) &&(<PaypalButton total={total} tranSuccess={tranSuccess} />)}
          </div>
        </div>
      </div>

    </>
  );
}
// sb-osrp625183317@personal.example.com
// q.$#wF8D
//sb-wvscz16826465@business.example.com
//u#d6J0yx
