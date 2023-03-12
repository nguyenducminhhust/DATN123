import React, { useState, useContext, useEffect } from "react";
import { Cart2 } from "../../GlobalState";
import "./ManageStaff.css"
export default function EditStaff({index,staffdata,onChangeInput,handleChangeInputRole,handleChangeInputRole2,handleCancelClick}) {
    return(
        // <div>
            <tr>
              <td>{index+1}</td>
            <td>
            <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={staffdata.email}
            onChange={onChangeInput}
          />
            </td>
            <td>
            <input
            type="text"
            name="name"
            required
            placeholder="Name"
            value={staffdata.name}
            onChange={onChangeInput}
          />
            </td>
            
            <td>
            <input
            type="number"
            name="phonenumber"
            required
            // autoComplete="on"
            placeholder="PhoneNumber"
            value={staffdata.phonenumber}
            onChange={onChangeInput}
          />
            </td>
            <td>
            <select
            id="role"
            name="role"
            onChange={handleChangeInputRole}
            required
            className="replaced"
            value = {staffdata.role}
          ><option value="">Please select role</option>
          {/* <option value="0">0. Customer</option> */}
          <option value="1">1. Manager</option>
          <option value="2">2. Staff</option>
        </select>
            </td>
            <td>
            <select
            id="kindofstaff"
            name="kindofstaff"
            onChange={handleChangeInputRole2}
            className="replaced2"
            value={staffdata.kindofstaff}
            required
          >
            <option value="default" >Please select Kind of Staff</option>
            {/* <option value="00. Customer</option> */}
            <option value="Kĩ Thuật Viên">1. Kĩ Thuật Viên</option>
            <option value="Bác Sĩ">2. Bác Sĩ</option>
          </select>
            </td>
            <td>
            <select
            id="service"
            name="service"
            onChange={handleChangeInputRole2}
            className="replaced3"
            required
            value={staffdata.service}
          >
            <option value="default">Please select Service</option>
            <option value="Chăm Sóc Da">1. Chăm Sóc Da</option>
            <option value="Thăm Khám">2. Thăm Khám</option>
            <option value="Trị Mụn">3. Trị Mụn</option>
            <option value="Triệt Lông">4. Triệt Lông</option>
          </select>
            </td>
            <td>
            <input
            type="text"
            name="salary"
            required
            placeholder="Salary"
            value={staffdata.salary}
            onChange={onChangeInput}
          />
            </td>
            <td>
                <button className="savestaffbut" type="submit"> Lưu </button>
                <button className="cancelstaffbut" type="button" onClick={handleCancelClick}> Hủy</button>
            </td>
            {/* <td>
                <input type="text"
                    placeholder="Enter email"
                    className="emailstaff"
                >
                </input>
            </td> */}
                
                
            </tr>
        // </div> 
    )
}
