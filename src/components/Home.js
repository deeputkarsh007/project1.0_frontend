import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PageviewIcon from "@mui/icons-material/Pageview";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [captions, setCaptions] = useState([]);
  const Navigate = useNavigate();
  const [querry, setQuerry] = useState("");
  useEffect(() => {
    getcaption();
  }, []);

  const getcaption = async () => {
    let result = await fetch("http://localhost:5000/getcaptions");
    result = await result.json();
    let activeUserId = localStorage.getItem("user");
    activeUserId = JSON.parse(activeUserId);
    activeUserId = activeUserId.email;
    result = result.filter((product) => {
      if (product.userId === activeUserId) {
        return product;
      }
    });
    setCaptions(result);
  };

  const deleteproduct = async (id) => {
    await fetch(`http://localhost:5000/deletecaption/${id}`, {
      method: "delete",
    });
    getcaption();
  };
  const updateProduct = (id) => {
    Navigate(`/product/${id}`);
  };

  function myFunction(caption) {
    navigator.clipboard.writeText(caption);
  }

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
        setCaptions(result);
        // console.log(captions);
      } else {
        console.log("no value found");
      }
    } else {
      getcaption();
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
      {captions.length > 0 ? (
        <div className="product-container">
          <ol style={{ "--length": `${captions.length}` }}>
            {captions.map((item, index) => (
              <li style={{ "--i": `${index + 1}` }} key={item._id}>
                <div className="content">
                  <h3>{item.name}</h3>
                  <p>{item.platform}</p>
                  <p>{item.mood}</p>
                  <p>{item.length}</p>
                  <p id="myInput">{item.caption}</p>
                </div>
                <div className="buttonContainer">
                  <Button
                    className="updatebutton"
                    variant="outlined"
                    onClick={() => navigator.clipboard.writeText(item.caption)}
                    startIcon={<FileCopyTwoToneIcon />}
                  >
                    Copy
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
