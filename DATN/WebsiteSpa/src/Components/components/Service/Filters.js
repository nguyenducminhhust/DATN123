import React, { useContext, useState } from "react";
import { Service } from "../../GlobalState";
import "./Filter.css"
export default function Filters() { 
  const state = useContext(Service);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.servicesAPI.category;
  const [sort, setSort] = state.servicesAPI.sort;
  const [search, setSearch] = state.servicesAPI.search;
  const [valuebutton,setValueButton] = useState("");
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };
  const handleInput = (e) => {
    const {name,value}= e.target;
    setValueButton(value.toLowerCase());
    
  };
  const handleSearch = (e) => {
    setSearch(valuebutton);
  };
console.log(valuebutton);
  return (
    <div className="filter_menu">
      <div className="filterservice">
        <h3>Tìm Kiếm Dịch Vụ: </h3>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">Tất Cả Dịch Vụ</option>
          {categories.map((category) => (
            <option value={"category=" + category.name} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
            <div className="searchservice">
      <input
        type="text"
        placeholder="Nhập Thông Tin Tìm Kiếm Tại Đây!"
        className="searchinput"
        // value={valuebutton}
        onChange={(e) => handleInput(e)}
      />
      <button className="buttonsearch" type="button" onClick={handleSearch}> Tìm Kiếm</button>
          </div>
    </div>
  );
}
