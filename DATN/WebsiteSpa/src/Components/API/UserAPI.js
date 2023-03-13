import { useState, useEffect } from "react";
import axios from "axios";
export default function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [callback, setCallBack] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState([]);
  const [userdataprocess, setUserDataProcess] = useState([]);   
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          res.data.role === 2 ? setIsStaff(true) : setIsStaff(false);
          console.log(res);
          setCart(res.data.cart);
          setUserDataProcess(res.data.servicebought);
          setUser(res.data);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
  

      getUser();
     
    }
  }, [token], [callback]);
  console.log(cart);

  // const addCart = async (service) => {
  //   if (!isLogged) {
  //     return alert("Please login to continue buying");
  //   }
  //   const check = cart.every((item) => {
  //     return item.price !== service.price&&item.session!==service.session;
  //   });
  //   console.log(check);
  //   if (check && service.stock!==0) {
  //     console.log(service);
  //     setCart([...cart, { ...service, quantity: 1, email: user.email  }]);
  //     console.log(cart);
  //     await axios.patch(
  //       "/user/addcart",
  //       { cart: [...cart, { ...service, quantity: 1,email: user.email }] },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
     
  //     alert("Your service added to cart");
  //   } else  if(service.stock==0){
  //     alert("Out of Stock");
  //   } else {
  //     alert("This service has been added to cart");
  //   }
  // }
  const [checkdata, setCheckData] =useState(false);
  const addCart = async (service) => {
    if (!isLogged) {
      return alert("Please login to continue buying");
    }
    const check = cart.every((item) => {
      return item._id !== service._id;
    });
    setCheckData(check);
    if(!check){     // nếu đã có trong cart
      const findindex= cart.findIndex((cart)=> cart._id==service._id );
      // const checkssion= cart[findindex].session+service.session;
      // if(checkssion<25){
      cart[findindex].session+=service.session;
      cart[findindex].price+=service.price;
      const sessionadd = service.session.toString();
      cart[findindex].detailsession+= ", " +sessionadd +" Buổi"; // Nối chuỗi liệu trình
      await axios.patch(
        "/user/addcart",
        { cart: [...cart] },
        {
          headers: { Authorization: token },
        }
        
      );
      alert(" Da them 1 lieu trinh");
   // } 
    //else{ alert(" Ban da dat gioi han session");}
      
    } //&& service.stock!==
    else if (check ) { // chưa có trong cart
      console.log(service);
      const sessionToString = service.session.toString()+" Buổi";
      setCart([...cart, { ...service, detailsession: sessionToString,quantity: 1, email: user.email  }]);
      console.log(cart);
      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...service, detailsession: sessionToString,quantity: 1,email: user.email }] },
        {
          headers: { Authorization: token },
        }
      );
     
      alert("Your Service added to cart");
    } else  if(service.stock==0){
      alert("Out of Stock");
    } 
    else {
      alert("This Service has been added to cart");
    }
  }
  
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isStaff:  [isStaff, setIsStaff],
    cart: [cart, setCart],
    addCart: addCart,  
    history: [history, setHistory],
    user: [user, setUser],
    userdataprocess: [userdataprocess,setUserDataProcess],
    callback :[callback, setCallBack],
  };
}
