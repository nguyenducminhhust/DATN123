import React, { useState, useContext, useEffect } from "react";
import { Service } from "../../GlobalState";
import "./ManageStaff.css"
export default function ReadOnlyCustomer({ isAdmin,index, customerlist, handleEditClick,handleDeleteClick }) {
    const state = useContext(Service);
    const [serviceboughtlist,setServiceBoughtList]=state.containerserviceAPI.containerservice;
        // Lọc danh sách liệu trình
    const totalservicebuycustomer = serviceboughtlist.filter((sbl)=>
    sbl.email ===customerlist.email
    );
        // Lọc thanh toán
    const [payment]= state.paymentAPI.payment;
    const filteruser = payment.filter((al)=>
        al.email==customerlist.email
    );   
         // Lấy ra danh sách tổng số buổi của các liệu trình, tính tổng
    const takedetailsesstion=()=>{
        let totalsessioncus =[];
        for(let i=0; i<totalservicebuycustomer.length; i++){
            const takedetailcesssion = totalservicebuycustomer[i].totalsession;
            totalsessioncus.push(takedetailcesssion);
        }
        return totalsessioncus;
    }  
    let totalsession=takedetailsesstion().reduce((total, value)=> total+parseInt(value),0);
        // Tính tổng chi tiêu các đơn hàng đã kích hoạt
    const totalspend = () => {
        let total = 0;
        filteruser.forEach(element => {
            if(element.status===true){element.cart.forEach(item => {
                total += item.price;
              });}
        });
        return total;
    
      }
    return(
            <tr>    
                <td>{index+1}</td>
                <td>{customerlist.email}</td>
                <td>{customerlist.name}</td>
                <td>{customerlist.phonenumber}</td>
                <td>{totalservicebuycustomer.length}</td>
                <td>{totalspend()} $</td>
                <td>{totalsession}</td>
                <td>{customerlist.debt}</td>
                <td>{customerlist.note}</td>
                <td>
                {(isAdmin)&&(
                <>   
                    <button className="editstaffbut" type="button" onClick={(event)=> handleEditClick(event, customerlist)}
                    > Sửa</button>
                    <button className="deletestaffbut" type="button" onClick={()=> handleDeleteClick(customerlist)}
                    > Xóa</button> </>
                )}
                </td>
            </tr>
          
            
                
       
    )
}
