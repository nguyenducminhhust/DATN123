import React, { useState, useContext, useEffect } from "react";
import { Cart2 } from "../../GlobalState";
import "./ManageStaff.css"
export default function ReadOnlyCustomer({ index, customerlist, handleEditClick,handleDeleteClick }) {
    const state = useContext(Cart2);
    const [serviceboughtlist,setServiceBoughtList]=state.containerserviceAPI.containerservice;
    const totalservicebuycustomer = serviceboughtlist.filter((sbl)=>
    sbl.email ===customerlist.email
    );
    const [alluser]= state.userstaffAPI.alluser;
    const filteruser = alluser.filter((al)=>
        al._id==customerlist._id
    );    
    const takedetailsesstion=()=>{
        let totalsessioncus =[];
        for(let i=0; i<totalservicebuycustomer.length; i++){
            const takedetailcesssion = totalservicebuycustomer[i].totalsession;
            totalsessioncus.push(takedetailcesssion);
        }
        return totalsessioncus;
    }  
    let totalsession=takedetailsesstion().reduce((total, value)=> total+parseInt(value),0);
    
    const totalspend = () => {
        let ab = 0;
        filteruser.forEach(element => {
          element.servicebought.forEach(item => {
            ab += item.price;
          });
        });
        return ab;
    
      }
    return(
     
            
            <tr>    
                <td>{index+1}</td>
                <td>{customerlist.email}</td>
                <td>{customerlist.name}</td>
                <td>{customerlist.phonenumber}</td>
                <td>{totalservicebuycustomer.length}</td>
                <td>{totalspend()-customerlist.debt} $</td>
                <td>{totalsession}</td>
                <td>{customerlist.debt}</td>
                <td></td>
                <td>
                    <button className="editstaffbut" type="button" onClick={(event)=> handleEditClick(event, customerlist)}
                    > Sửa</button>
                    <button className="deletestaffbut" type="button" onClick={()=> handleDeleteClick(customerlist)}
                    > Xóa</button>
                </td>
            </tr>
          
            
                
       
    )
}
