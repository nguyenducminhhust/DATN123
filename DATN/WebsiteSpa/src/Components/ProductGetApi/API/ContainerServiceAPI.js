import { useState, useEffect } from "react";
import axios from "axios";

export default function ContainerServiceAPI() {
  const [containerservices, setContainerServices] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getContainerServices = async () => {
      const res = await axios.get("/api/containerservice");
      console.log(res);
      setContainerServices(res.data);
    };

    getContainerServices();
  }, [callback]);
  return {
    containerservice: [containerservices, setContainerServices],
    callback: [callback, setCallback],
  };
}
