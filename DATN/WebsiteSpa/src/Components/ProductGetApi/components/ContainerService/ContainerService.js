import React, { useState, useContext, useEffect} from "react";
import { Cart2 } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import styled from "styled-components";
import "./ContainerService.css";
import DetailsCS from "./DetailsCS";
import ReactPaginate from "react-paginate";

export default function ContainerService() {
  const state = useContext(Cart2);
  const [token] = state.token;
  const [containerservices, setContainerServices] = state.containerserviceAPI.containerservice;
  const [userdataprocess, setUserDataProcess] = state.userAPI.userdataprocess;// mảngtimebought
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = userdataprocess.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(userdataprocess.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userdataprocess.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
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
                containerservices= {containerservices}
                userdataprocess={userdataprocess}

                />
          )
          })}                                                
              </div> 
              <div className="paginatecontainer">
              <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
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



