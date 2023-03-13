import { useState, useEffect } from "react";
import axios from "axios";

export default function BookingAPI() {
  const [bookings, setBookings] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getBookings = async () => {
      const res = await axios.get(
        `/api/bookings`
      );
      console.log(res);
      setBookings(res.data);
      
    };
    getBookings();
  }, [callback]); 
  //console.log(bookings);
  return {
    bookings: [bookings, setBookings],
    callback: [callback, setCallback],
    
  };
}
