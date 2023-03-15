import React, { useState, useContext, useEffect, Fragment } from "react";
import { Service } from "../../GlobalState";
import Header from "../headers/Header";
import "./PrivateInformation.css"
export default function PrivateInformation() {
    const state = useContext(Service);
    const [user,setUser]=state.userAPI.user;
    return( <>
        <Header/>
        <div className="privateinformation">
            
            <div className="tableprivateinformation">
            <table>
                <thead>
                    <tr>
                        <th>Họ Và Tên</th>
                        <th>Địa Chỉ Email</th>
                        <th>Số Điện Thoại</th>
                        <th>Tiền chưa thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {user.name}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            {user.phonenumber}
                        </td>
                        <td>
                            {user.debt}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>

            </>
    )

}