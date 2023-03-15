import React, { useState, useContext, useEffect} from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import "./ContainerService.css";
import DetailsCS from "./DetailsCS";
import ReactPaginate from "react-paginate";

export default function ContainerService() {
  const state = useContext(Service);
  const [token] = state.token;
  const [userdataprocess, setUserDataProcess] = state.userAPI.userdataprocess;
  const [callback, setCallBack]= state.userAPI.callback;
  // phân trang
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = userdataprocess.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(userdataprocess.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userdataprocess.length;
    setItemOffset(newOffset);
  };
  // lây dữ liệu người dùng
  useEffect(() => {
    if (token) {
      const getContainerService = async () => {
        
        const res = await axios.get("/user/infor", {
          headers: { Authorization: token },
        });
        setUserDataProcess(res.data.servicebought);
        }
        getContainerService();
    }
  }, [ token,setUserDataProcess]); 
  
  return (
    <>
    
      <Header />
      <div className="maininfocontainerservice">
      <div className="servicenamecontainer">
        <h1 className="servicenamecontainer1"> Trang dịch vụ </h1>
        <hr />
      </div>
     

      <div className="dpus">
        {currentItems.map((userdata, index) => {
          return (   
                <DetailsCS 
                key={index}
                userdata={userdata}
                />
          )
          })}                                                
              </div> 
              <div className="paginatecontainer">
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
  );
}


