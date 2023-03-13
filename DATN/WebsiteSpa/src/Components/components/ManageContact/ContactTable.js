import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import "./ContactTable.css";
import ReactPaginate from "react-paginate";

export default function ContactTable() {
    const state = useContext(Service);
    const [contact, setContact]=state.contactAPI.contact;
    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = contact.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(contact.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % contact.length;
      
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    return(
        <>
        <Header/>
        <div className="maincontacttable">
        <h2> Thông tin liên hệ từ khách hàng</h2>
        <div className="contacttable">
<table>
  <thead>
    <tr>
      <th>STT</th>
      <th>Họ và Tên</th>
      <th>Địa chỉ Email</th>
      <th>Số điện thoại</th>
      <th>Chủ đề</th>
      <th>Nội dung</th>
    </tr>
  </thead>
  <tbody>
    {contact.map((ct, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{ct.name}</td>
          <td>{ct.email}</td>
          <td>{ct.phonenumber}</td>
          <td>{ct.title}</td>
          <td>{ct.content}</td>
        </tr>
      );
    })}
  </tbody>
</table>
</div>
<div className="paginatecontacttable">
              <ReactPaginate
          previousLabel="Trước"
          nextLabel="Sau"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
       </div>
</div>

</>
    )
}