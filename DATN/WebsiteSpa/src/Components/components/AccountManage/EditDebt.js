import React, { useState, useContext, useEffect } from "react";
import { Service } from "../../GlobalState";
import "./ManageStaff.css"
export default function EditDebt({isAdmin,index,customerlist,onChangeInput,handleChangeInput,handleChangeInput2,handleCancelClick}) {
    const state = useContext(Service);
    const [serviceboughtlist,setServiceBoughtList]=state.containerserviceAPI.containerservice;
    // Lọc danh sách liệu trình
    const totalservicebuycustomer = serviceboughtlist.filter((sbl)=>
    sbl.email ===customerlist.email
    );
    // Lấy ra danh sách tổng số buổi của các liệu trình, tính tổng
    const takedetailsession=()=>{
        let totalsessioncus =[];
        for(let i=0; i<totalservicebuycustomer.length; i++){
            const takedetailcesssion = totalservicebuycustomer[i].totalsession;
            totalsessioncus.push(takedetailcesssion);
        }
        return totalsessioncus;
    }  
    let totalsession=takedetailsession().reduce((total, value)=> total+parseInt(value),0);
    
    return(
            <tr>
              <td>{index+1}</td>
                <td>{customerlist.email}</td>
                <td>{customerlist.name}</td>
                <td>{customerlist.phonenumber}</td>
                <td>{totalservicebuycustomer.length}</td>
                <td>Tổng Chi Tiêu </td>
                <td>{totalsession}</td>
                <td> 
                    <input
                type="number"
                name="debt"
                required

                placeholder="Tiền chưa thanh toán"
                value={customerlist.debt}
                onChange={onChangeInput}
                        />
          </td>
          <td> 
                <textarea
                type="text"
                name="note"
                
                value={customerlist.note}
                onChange={onChangeInput}
                        />
          </td>
            <td>
            {(isAdmin)&&(
                <>
                <button className="savestaffbut" type="submit"> Lưu </button>
                <button className="cancelstaffbut" type="button" onClick={handleCancelClick}> Hủy</button>
                
                </>)}
            </td>         
            </tr>
    )
}
