import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
export default function SubStaffSchedule({index, scheduleaftercheck, handleDeleteClick}) {
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