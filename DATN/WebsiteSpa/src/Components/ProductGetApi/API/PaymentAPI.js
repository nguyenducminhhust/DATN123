import { useState, useEffect } from "react";
import axios from "axios";

export default function PaymentAPI() {
  const [payment, setPayment] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getPayment = async () => {
      const res = await axios.get("/api/payment");
      console.log(res);
      setPayment(res.data);
    };

    getPayment();
  }, [callback]);
  return {
    payment: [payment, setPayment],
    callback: [callback, setCallback],
  };
}
