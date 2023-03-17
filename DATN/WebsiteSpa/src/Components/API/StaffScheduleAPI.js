import { useState, useEffect } from "react";
import axios from "axios";

export default function StaffScheduleAPI() {
  const [staffschedules, setStaffSchedule] = useState([]);
  const [callback, setCallback] = useState(false);
  // Lấy dữ liệu lịch nhân viên
  useEffect(() => {
    const getStaffSchedules = async () => {
      const res = await axios.get(
        `/api/staffschedule`
      );
      console.log(res);
    setStaffSchedule(res.data);
      
    };
    getStaffSchedules();
  }, [callback]); 
//  console.log(staffschedules);
  return {
    staffschedule: [staffschedules, setStaffSchedule],
    callback: [callback, setCallback],
    
  };
}
