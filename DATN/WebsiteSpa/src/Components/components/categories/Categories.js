import React, { useState, useContext } from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import "./categories.css";
export default function Categories() {
  const state = useContext(Service);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  // Tạo danh mục
  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  // sửa danh mục
  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };
  // xóa danh mục
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });

      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <Header />
      <div className="categories">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Danh Mục Dịch vụ</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">{onEdit ? "Cập Nhật" : "Tạo"}</button>
        </form>

        <div className="col">
          {categories.map((category) => (
            <div className="row_1" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Sửa
                </button>
                <button onClick={() => deleteCategory(category._id)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
