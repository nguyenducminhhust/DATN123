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
  //const userinfo =
  // const [initservice, setInitBervice] = useState({
  //       serviceid: "",
  //       timebought: 1,
  //     });
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

  // const addCart = async (product) => {
  //   if (!isLogged) {
  //     return alert("Please login to continue buying");
  //   }
  //   const check = cart.every((item) => {
  //     return item.price !== product.price&&item.session!==product.session;
  //   });
  //   console.log(check);
  //   if (check && product.stock!==0) {
  //     console.log(product);
  //     setCart([...cart, { ...product, quantity: 1, email: user.email  }]);
  //     console.log(cart);
  //     await axios.patch(
  //       "/user/addcart",
  //       { cart: [...cart, { ...product, quantity: 1,email: user.email }] },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
     
  //     alert("Your product added to cart");
  //   } else  if(product.stock==0){
  //     alert("Out of Stock");
  //   } else {
  //     alert("This product has been added to cart");
  //   }
  // }
  const [checkdata, setCheckData] =useState(false);
  const addCart = async (product) => {
    if (!isLogged) {
      return alert("Please login to continue buying");
    }
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    setCheckData(check);
    if(!check){     // nếu đã có trong cart
      const findindex= cart.findIndex((cart)=> cart._id==product._id );
      // const checkssion= cart[findindex].session+product.session;
      // if(checkssion<25){
      cart[findindex].session+=product.session;
      cart[findindex].price+=product.price;
      const sessionadd = product.session.toString();
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
      
    } //&& product.stock!==
    else if (check ) { // chưa có trong cart
      console.log(product);
      const sessionToString = product.session.toString()+" Buổi";
      setCart([...cart, { ...product, detailsession: sessionToString,quantity: 1, email: user.email  }]);
      console.log(cart);
      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, detailsession: sessionToString,quantity: 1,email: user.email }] },
        {
          headers: { Authorization: token },
        }
      );
     
      alert("Your Service added to cart");
    } else  if(product.stock==0){
      alert("Out of Stock");
    } 
    else {
      alert("This Service has been added to cart");
    }
  }
  console.log(isStaff);
  
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isStaff:  [isStaff, setIsStaff],
    cart: [cart, setCart],
    addCart: addCart,  
    //initservice: initService,
    history: [history, setHistory],
    user: [user, setUser],
    userdataprocess: [userdataprocess,setUserDataProcess],
    callback :[callback, setCallBack],
  };
}
