import React, { useState, useContext, useEffect} from "react";
import "./detailService.css";

export default function DetailSVSession({priceandsession, chooseSession }) {
        return (
              <div>
          <button className="Session Type" onClick={()=>chooseSession(priceandsession.price, priceandsession.session)}> Số buổi của liệu trình:  {priceandsession.session}</button>
       
          </div>
        
        )
}


          

