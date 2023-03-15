import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
export default function Handletimebook({index, numbertime, handlefreescheduletoupdate, setIndexCheck, indexcheck}) {
    return(
        <div key={index} id={index.toString()} className={numbertime.isActive.toString()} onClick={()=>{handlefreescheduletoupdate(index); }}>{numbertime.time}</div>
    )
}
