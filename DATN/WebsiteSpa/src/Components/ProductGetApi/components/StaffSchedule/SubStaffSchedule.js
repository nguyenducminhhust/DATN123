import React, { useContext, useState, useEffect } from "react";
import { Cart2 } from "../../GlobalState";
export default function SubStaffSchedule({index, scheduleaftercheck, handleDeleteClick}) {
 console.log(scheduleaftercheck);
    return(
    <tr>
    <td>{index+1}</td>
    <td>{scheduleaftercheck.namestaff}</td>
    <td>{scheduleaftercheck.email}</td>
    <td>
    <button className="deletestaffbut" type="button" onClick={()=> handleDeleteClick(scheduleaftercheck)}
                    > Xóa</button>
         </td> 
    </tr>
 )
}