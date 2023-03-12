import React, { useState, useContext, useEffect } from "react";
import "./createProduct.css";
import axios from "axios";
import { Cart2 } from "../../GlobalState";
import Loading from "../utils/loading/Loading";
import Header from "../headers/Header";
import { useNavigate, useParams } from "react-router-dom";
const initialState = {
  product_id: "",
  title: "",
  price: [],
  stock: 0,
  description: "",
  content: "",
  category: "",
  _id: "",
};

export default function CreateProduct() {
  const state = useContext(Cart2);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useNavigate();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;
  const [inputprice, setInputprice] = useState([{ session: "", price: "" }]);

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);
  const handleInputPriceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputprice];
    list[index][name] = value;
    setInputprice(list);
    product.price = inputprice;
  };
  console.log(product);
  // handle click event of the Remove button
  const handlePriceRemoveClick = index => {
    const list = [...inputprice];
    list.splice(index, 1);
    setInputprice(list);
  };

  // handle click event of the Add button
  const handlePriceAddClick = () => {
    setInputprice([...inputprice, { session: 0, price: 0 }]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

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
        return alert("File format is incorrect.");

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
  // console.log(images)
  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
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
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      product.price = inputprice;
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");
      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images }, 
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history("/products");
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
      <div className="create_product">
        <div className="upload">
          <input type="file" class="file" id="file_up" onChange={handleUpload} />
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
            <label htmlFor="product_id">Product ID</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              defaultValue={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
            />
          </div>
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              defaultValue={product.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="App">

            {inputprice.map((x, i) => {
              return (
                <div className="box">
                  <label> Number Session</label>
                  <input
                    type="number"
                    name="session"
                    placeholder="Number Session"
                    value={x.session}
                    onChange={e => handleInputPriceChange(e, i)}
                  />
                  <input
                    type="number"
                    className="ml10"
                    name="price"
                    placeholder="Price"
                    value={x.price}
                    onChange={e => handleInputPriceChange(e, i)}
                  />
                  <div className="btn-box">
                    {inputprice.length !== 1 && <button
                      className="mr10"
                      onClick={() => handlePriceRemoveClick(i)}>Remove</button>}
                    {inputprice.length - 1 === i && <button onClick={handlePriceAddClick}>Add</button>}
                  </div>
                </div>
              );
            })}

          </div>
          {/* <div className="row">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              name="stock"
              id="stock"
              required
              defaultValue={product.stock}
              onChange={handleChangeInput}
            />
          </div> */}

          <div className="row">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              defaultValue={product.description}
              onChange={handleChangeInput}
              rows="5"
            />
          </div>

          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              defaultValue={product.content}
              rows="7"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="categories">Categories: </label>
            <select
              name="category"
              defaultValue={product.category}
              onChange={handleChangeInput}
            >
              <option defaultValue="">Please select a category</option>
              {categories.map((category) => (
                <option defaultValue={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>
      </div>
    </>
  );
}
