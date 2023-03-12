import { useState, useEffect } from "react";
import axios from "axios";

export default function DataProcessCustomerAPI() {
    const [dataprocesscustomers, setDataProcessCustomers] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getDataProcessCustomers = async () => {
          const res = await axios.get(
            "/api/dataprocesscustomers"
          );
          console.log(res);
          setDataProcessCustomers(res.data);
          
        };
        getDataProcessCustomers();
      }, [callback]); 
      return {
        dataprocesscustomer: [dataprocesscustomers, setDataProcessCustomers],
        callback: [callback, setCallback],
        
      };
}
