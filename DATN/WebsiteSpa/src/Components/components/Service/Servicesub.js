import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
import ReactPaginate from "react-paginate";
import ServiceItem from "./ServiceItem";
import "./Servicesub.css";
export default function Servicesub({category,services,isAdmin,deleteService,handleCheck}) {
  // lọc dịch vụ theo danh mục  
  const filterservice= services.filter((pds)=>
    pds.category ==category.name
    );
    // phân trang
    const itemsPerPage=3;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filterservice.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filterservice.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filterservice.length;
      setItemOffset(newOffset);
    };    
    return(
        <div className="categorycontainer">
        <div className="borderlinecategory">
            <div className="categorytitle"> Liệu Trình {category.name}</div>
            </div>
        <div className="containerservice">
        {currentItems.map((service, index) => {
            return (
              <ServiceItem
                key={index}
                service={service}
                isAdmin={isAdmin}
                deleteService={deleteService}
                handleCheck={handleCheck}
              />
            );
          })}
      </div>
      <div className="containerpaginate">
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
    )

}
