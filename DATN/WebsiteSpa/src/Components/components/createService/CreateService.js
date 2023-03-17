import React, { useState, useContext, useEffect } from "react";
import "./createService.css";
import axios from "axios";
import { Service } from "../../GlobalState";
import Loading from "../utils/loading/Loading";
import Header from "../headers/Header";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
const initialState = {
  service_id: "",
  title: "",
  price: [],
  durationtime: null,
  description: "",
  content: "",
  category: "",
  _id: "",
};

export default function CreateService() {
  const state = useContext(Service);
  const [service, setService] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const history = useNavigate();
  const param = useParams();
  const [services] = state.servicesAPI.services;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.servicesAPI.callback;
  const [inputprice, setInputprice] = useState([{ session: "", price: "" }]);
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = services.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(services.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % services.length;
    
    setItemOffset(newOffset);
  };
  // Lấy dữ liệu dịch vụ, trả về trạng thái tạo hay sửa
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      services.forEach((service) => {
        if (service._id === param.id) {
          setService(service);
          setInputprice(service.price)
          setImages(service.images);
        }
      });
    } else {
      setOnEdit(false);
      setService(initialState);
      setImages(false);
    }
  }, [param.id, services]);
  const handleInputPriceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputprice];
    list[index][name] = value;
    setInputprice(list);
    service.price = inputprice;
  };
  console.log(service);
  // xử lý sự kiện nhấp chuột của nút Xóa
  const handlePriceRemoveClick = index => {
    const list = [...inputprice];
    list.splice(index, 1);
    setInputprice(list);
  };

  // xử lý sự kiện nhấp chuột của nút Thêm
  const handlePriceAddClick = () => {
    setInputprice([...inputprice, { session: 0, price: 0 }]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Bạn không phải là quản trị viên");
      const file = e.target.files[0];

      if (!file) return alert("Tệp không tồn tại.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/webp" &&
        file.type !== "image/jpg"
      )
        // 1mb
        return alert("Định dạng tệp không chính xác.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err);
    }
  };
  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("Bạn không phải là quản trị viên");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      service.price = inputprice;
      if (!isAdmin) return alert("Bạn không phải là quản trị viên");
      if (!images) return alert("Không tải lên hình ảnh");
      if (onEdit) {
        await axios.put(
          `/api/services/${service._id}`,
          { ...service, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/services",
          { ...service, images }, 
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history("/services");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
 
  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <>
      <Header />
      <div className="overrallcreateservice">
      <div className="create_service">
        <div className="upload">
          <input type="file" className="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="service_id">Mã Dịch Vụ</label>
            <input
              type="text"
              name="service_id"
              id="service_id"
              required
              defaultValue={service.service_id}
              onChange={handleChangeInput}
              disabled={onEdit}
            />
          </div>
          <div className="row">
            <label htmlFor="title">Chủ Đề</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              defaultValue={service.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">

            {inputprice.map((x, i) => {
              return (
                <div className="box">
                  <label> Giá Theo Số Buổi</label>
                  <input
                    type="number"
                    name="session"
                    placeholder="Số buổi"
                    value={x.session}
                    onChange={e => handleInputPriceChange(e, i)}
                  />
                  <input
                    type="number"
                    className="ml10"
                    name="price"
                    placeholder="Giá theo số buổi"
                    value={x.price}
                    onChange={e => handleInputPriceChange(e, i)}
                  />
                  <div className="btn-box">
                    {inputprice.length !== 1 && <button
                      className="mr10"
                      onClick={() => handlePriceRemoveClick(i)}>Xóa</button>}
                    {inputprice.length - 1 === i && <button onClick={handlePriceAddClick}>Thêm</button>}
                  </div>
                </div>
              );
            })}

          </div>
          <div className="row">
            <label htmlFor="durationtime">Thời gian dự kiến - phút </label>
            {/* chia hết cho 30 */}
            <input
              type="number"
              name="durationtime"
              id="durationtime"
              required
              defaultValue={service.durationtime}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="description">Mô Tả</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              defaultValue={service.description}
              onChange={handleChangeInput}
              rows="5"
            />
          </div>

          <div className="row">
            <label htmlFor="content">Nội Dung</label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              defaultValue={service.content}
              rows="7"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="categories">Danh Mục: </label>
            <select
              name="category"
              defaultValue={service.category}
              onChange={handleChangeInput}
            >
              <option defaultValue="">Chọn Danh Mục</option>
              {categories.map((category) => (
                <option defaultValue={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">{onEdit ? "Cập Nhật" : "Tạo"}</button>
        </form>
      </div>
      <div className="tableservice">
        <h4> Bảng dịch vụ</h4>
      <table >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã dịch vụ</th>
                        <th>Tên dịch vụ</th>
                        <th>Thời gian dự kiến</th>
                        <th>Danh mục</th>
                        
                    </tr>
                </thead>
                <tbody>
                {currentItems.map((ct, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{ct.service_id}</td>
          <td>{ct.title}</td>
          <td>{ct.durationtime}</td>
          <td>{ct.category}</td>
        </tr>
      );
    })}
                </tbody>
            </table>
            <div className="paginatemanagestaff">
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
      </div>

    </>
  );
}
