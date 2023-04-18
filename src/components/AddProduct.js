import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  let userIdVal = localStorage.user;
  userIdVal = JSON.parse(userIdVal);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    catagory: "",
    company: "",
    userId: userIdVal.email,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.price ||
      !product.catagory ||
      !product.company
    ) {
      console.log("this is working think about something different");
      setError(true);
      return false;
    } else {
      //   console.log(product, "this is fucking working");
      if (product.name && product.price) {
        let result = await fetch("http://localhost:5000/addproduct", {
          method: "post",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
        console.log(result);
        navigate("/");
      } else {
        console.log("Please name and price");
      }
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };
  return (
    <>
      <article>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          {error && !product.name && (
            <span className="form-error-message">Please Enter Name</span>
          )}
          <div className="form-control">
            <label htmlFor="price">price : </label>
            <input
              type="price"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          {error && !product.price && (
            <span className="form-error-message">Please Enter price</span>
          )}
          <div className="form-control">
            <label htmlFor="catagory">Catagory:</label>
            <input
              type="catagory"
              id="catagory"
              name="catagory"
              value={product.catagory}
              onChange={handleChange}
            />
          </div>
          {error && !product.catagory && (
            <span className="form-error-message">Please Enter catagory</span>
          )}
          <div className="form-control">
            <label htmlFor="company">Company :</label>
            <input
              type="company"
              id="company"
              name="company"
              value={product.company}
              onChange={handleChange}
            />
          </div>
          {error && !product.company && (
            <span className="form-error-message">Please Enter company</span>
          )}
          <div style={{ display: "block" }}>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </article>
    </>
  );
};

export default AddProduct;
