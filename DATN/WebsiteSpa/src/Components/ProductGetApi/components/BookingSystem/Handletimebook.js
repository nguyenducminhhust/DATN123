import React, { useContext, useState, useEffect } from "react";
import { Cart2 } from "../../GlobalState";
export default function Handletimebook({index, numbertime, handlefreescheduletoupdate, setIndexCheck, indexcheck}) {
    const checkOnClick=(index)=>{
            
    }

    console.log(numbertime.isActive.toString());
    return(
        <div key={index} id={index.toString()} className={numbertime.isActive.toString()} onClick={()=>{handlefreescheduletoupdate(index); }}>{numbertime.time}</div>
    )
}
//checkboolean?isActive.toString():"false"
//checkOnClick(index)