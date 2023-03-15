import { useState, useEffect } from "react";
import axios from "axios";

export default function CostAPI() {
  const [costs, setCosts] = useState([]);
  const [callback, setCallback] = useState(false);
  // Lấy dữ liệu Hàng trong kho
  useEffect(() => {
    const getCosts = async () => {
      const res = await axios.get(
        `/api/costs`
      );
      console.log(res);
      setCosts(res.data);
      
    };
    getCosts();
  }, [callback]); 
  return {
    costs: [costs, setCosts],
    callback: [callback, setCallback],
    
  };
}
