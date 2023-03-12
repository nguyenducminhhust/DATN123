import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cart2 } from "../../GlobalState";
import axios from "axios";
function BtnRender({ product, deleteProduct }) {
  const state = useContext(Cart2);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
 // const initservice = state.userAPI.initservice;
  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          {/* <Link id="btn_buy" to="#!" onClick={() => {addCart(product)}}>
            Buy
          </Link> */}
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}
//;initservice(product)
export default BtnRender;
