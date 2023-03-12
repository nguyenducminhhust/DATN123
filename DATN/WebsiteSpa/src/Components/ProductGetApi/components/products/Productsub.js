import React, { useContext, useState, useEffect } from "react";
import { Cart2 } from "../../GlobalState";
import ReactPaginate from "react-paginate";
import ProductItem from "./ProductItem";
import "./Productsub.css";
export default function Productsub({category,products,isAdmin,deleteProduct,handleCheck}) {
    const filterproduct= products.filter((pds)=>
    pds.category ==category.name
    );
    console.log(products);
    const itemsPerPage=3;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = filterproduct.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filterproduct.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filterproduct.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };    
    return(
        <div className="categorycontainer">
        <div className="borderlinecategory">
            <div className="categorytitle"> Liệu Trình {category.name}</div>
            </div>
        <div className="containerservice">
        {currentItems.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                isAdmin={isAdmin}
                deleteProduct={deleteProduct}
                handleCheck={handleCheck}
              />
            );
          })}
      </div>
      <div className="containerpaginate">
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
    )

}
