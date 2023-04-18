import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PageviewIcon from "@mui/icons-material/Pageview";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();
  const [querry, setQuerry] = useState("");
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/getproducts");
    result = await result.json();
    let activeUserId = localStorage.getItem("user");
    activeUserId = JSON.parse(activeUserId);
    activeUserId = activeUserId.email;
    result = result.filter((product) => {
      if (product.userId === activeUserId) {
        return product;
      }
    });
    setProducts(result);
  };

  const deleteproduct = async (id) => {
    await fetch(`http://localhost:5000/deleteproduct/${id}`, {
      method: "delete",
    });
    getProducts();
  };
  const updateProduct = (id) => {
    Navigate(`/product/${id}`);
  };

  const searchHandler = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      let activeUserId = localStorage.getItem("user");
      activeUserId = JSON.parse(activeUserId);
      activeUserId = activeUserId.email;
      result = result.filter((product) => {
        if (product.userId === activeUserId) {
          return product;
        }
      });
      if (result) {
        setProducts(result);
        // console.log(products);
      } else {
        console.log("no value found");
      }
    } else {
      getProducts();
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="search product"
        className="searchTerm"
        onChange={searchHandler}
        id="input_text"
      ></input>
      {products.length > 0 ? (
        <div className="product-container">
          <ol style={{ "--length": `${products.length}` }}>
            {products.map((item, index) => (
              <li style={{ "--i": `${index + 1}` }} key={item._id}>
                <div className="content">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <p>{item.catagory}</p>
                  <p>{item.company}</p>
                </div>
                <div className="buttonContainer">
                  <Button
                    className="updatebutton"
                    variant="outlined"
                    onClick={() => updateProduct(item._id)}
                    startIcon={<FileUploadIcon />}
                  >
                    Update
                  </Button>
                  <Button
                    className="deletebutton"
                    variant="outlined"
                    onClick={() => deleteproduct(item._id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </div>
                {/* <Link
              className="update?Button"
              startIcon={<DeleteIcon />}
              to={`/product/${item._id}`}
            >
              Update
            </Link> */}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <h1>No result Found</h1>
      )}
    </>
  );
};

export default Home;
