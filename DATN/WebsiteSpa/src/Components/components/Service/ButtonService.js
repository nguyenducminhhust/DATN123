import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Service } from "../../GlobalState";
import axios from "axios";
function ButtonService({ service, deleteService }) {
  const state = useContext(Service);
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteService(service._id, service.images.public_id)}
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
export default ButtonService;
