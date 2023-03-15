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
  // Lấy dữ liệu người dùng, xét quyền quản trị viên hoặc nhân viên   
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
  const [checkdata, setCheckData] =useState(false);
  // Thêm vào giỏ hàng
  const addCart = async (service) => {
    if (!isLogged) {
      return alert("Vui lòng đăng nhập để tiếp tục mua hàng");
    }
    // kiểm tra dịch vụ trong cart
    const check = cart.every((item) => {
      return item._id !== service._id;
    });
    setCheckData(check);
    if(!check){     // nếu đã có trong cart
      const findindex= cart.findIndex((cart)=> cart._id==service._id );
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
    } 
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
      alert("Dịch vụ của bạn đã được thêm vào giỏ hàng");
    } 
    else {
      alert("Dịch vụ này đã được thêm vào giỏ hàng");
    }
  }
  
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isStaff:  [isStaff, setIsStaff],
    cart: [cart, setCart], 
    history: [history, setHistory],
    user: [user, setUser],
    userdataprocess: [userdataprocess,setUserDataProcess],
    callback :[callback, setCallBack],
    addCart: addCart, 
  };
}
