import React, { useState, useContext, useEffect } from "react";
import { Service } from "../../GlobalState";
import "./ManageStaff.css"
export default function EditStaff({index,staffdata,onChangeInput,handleChangeInput,handleChangeInput2,handleCancelClick}) {
  const state = useContext(Service);
  const [categories] = state.categoriesAPI.categories;
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
            placeholder="PhoneNumber"
            value={staffdata.phonenumber}
            onChange={onChangeInput}
          />
            </td>
            <td>
            <select
            id="role"
            name="role"
            onChange={handleChangeInput}
            required
            className="replaced"
            value = {staffdata.role}
          ><option value="">Chọn phân quyền</option>
          <option value="1">1. Quản lý</option>
          <option value="2">2. Nhân viên</option>
        </select>
            </td>
            <td>
            <select
            id="kindofstaff"
            name="kindofstaff"
            onChange={handleChangeInput2}
            className="replaced2"
            value={staffdata.kindofstaff}
            required
          >
            <option value="default" >Chọn loại nhân viên</option>
            <option value="Kĩ Thuật Viên">1. Kĩ Thuật Viên</option>
            <option value="Bác Sĩ">2. Bác Sĩ</option>
          </select>
            </td>
            <td>
            <select
            id="service"
            name="service"
            onChange={handleChangeInput2}
            className="replaced3"
            required
            value={staffdata.service}
          >
            <option value="default">Chọn dịch vụ làm</option>
            {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
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
            </tr>
    )
}
