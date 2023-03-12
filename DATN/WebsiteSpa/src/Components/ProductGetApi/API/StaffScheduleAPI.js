import { useState, useEffect } from "react";
import axios from "axios";

export default function StaffScheduleAPI() {
  const [staffschedules, setStaffSchedule] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getBookings = async () => {
      const res = await axios.get(
        `/api/staffschedule`
      );
      console.log(res);
    //   staffschedule=[...res.data];
    setStaffSchedule(res.data);
      
    };
    getBookings();
  }, [callback]); 
 console.log(staffschedules);
  return {
    staffschedule: [staffschedules, setStaffSchedule],
    callback: [callback, setCallback],
    
  };
}
