import { useState, useEffect } from "react";
import axios from "axios";
export default function AllUserAPI() {
  const [alluser, setAllUser] = useState([]);
  const [callback, setCallback] = useState(false);
  const [isstaff, setIsStaff] = useState(false);
  // Lấy dữ liệu tất cả người dùng
  useEffect(() => {
      const getAllUser = async() => {
        const res = await axios.get("/user/alluser");
        console.log(res);
        res.data.role === 2 ? setIsStaff(true) : setIsStaff(false);
        setAllUser(res.data);
        console.log(res.data);
    };
      getAllUser();
    }
  , [callback]);
  return {
    callback: [callback, setCallback],
    alluser: [alluser, setAllUser],
    isstaff: [isstaff, setIsStaff],
  };
}
