import { useState, useEffect } from "react";
import axios from "axios";

export default function ContactAPI() {
  const [contact, setContact] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getContact = async () => {
      const res = await axios.get("/api/contacts");
      console.log(res);
      setContact(res.data);
    };

    getContact();
  }, [callback]);
  return {
    contact: [contact, setContact],
    callback: [callback, setCallback],
  };
}
