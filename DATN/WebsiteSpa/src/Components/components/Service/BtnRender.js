import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Service } from "../../GlobalState";
import axios from "axios";
function BtnRender({ service, deleteProduct }) {
  const state = useContext(Service);
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
            onClick={() => deleteProduct(service._id, service.images.public_id)}
          >
            Xóa
          </Link>
          <Link id="btn_view" to={`/edit_service/${service._id}`}>
            Sửa
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_view" to={`/detail/${service._id}`}>
            Xem
          </Link>
        </>
      )}
    </div>
  );
}
//;initservice(service)
export default BtnRender;
