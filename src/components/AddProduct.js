import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Configuration, OpenAIApi } from "openai";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyTwoTone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import gif from "../usables/machine.gif";

const AddProduct = () => {
  let userIdVal = localStorage.user;
  userIdVal = JSON.parse(userIdVal);
  const [showCaption, setShowCaption] = useState("");
  const [caption, setCaption] = useState({
    name: "",
    platform: "",
    mood: "",
    length: "",
    description: "",
    caption: "",
    userId: userIdVal.email,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleGenerate = async (e) => {
    e.preventDefault();
    console.log(caption);
    if (
      !caption.name ||
      !caption.platform ||
      !caption.description ||
      !caption.length ||
      !caption.mood
    ) {
      setError(true);
      return false;
    } else {
      fetchCaption();
      console.log(caption);
    }
  };
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    })
  );
  const fetchCaption = async () => {
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a ${caption.length} caption for ${caption.platform} post mention that ${caption.description}. Write the caption in ${caption.mood} mood and not include the hashtags`,
          },
        ],
      })
      .then((res) => {
        let ans = res.data.choices[0].message.content;
        console.log(ans);
        setCaption({ ...caption, caption: ans });
        // console.log(showCaption, "Hello this is working as funcpkk");
      });
  };
  const saveCaption = async (e) => {
    e.preventDefault();

    console.log(caption, "this is fucking working");
    // if (product.name && product.price) {
    let result = await fetch("http://localhost:5000/addproduct", {
      method: "post",
      body: JSON.stringify(caption),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCaption({ ...caption, [name]: value });
  };
  const options = [
    "Normal",
    "Happy",
    "Sarcastic",
    "Romantic",
    "Professional",
    "Felling Low",
    "Angry",
    "Emotional",
    "Musical",
    "Poetic",
    "Inspirational",
    "Creative",
  ];
  const socialMedias = [
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Twitter",
    "VK",
    "Tumblr",
    "Reddit",
  ];
  const removeCaption = () => {
    setCaption({
      platform: "",
      mood: "",
      length: "",
      caption: "",
      description: "",
    });
  };
  return (
    <div className="formPage">
      <article>
        <div className="gif">
          <img className="gif_image" src={gif} alt="image" />
        </div>
        <form className="form" onSubmit={handleGenerate}>
          <div className="form_content">
            <div className="form-control">
              <label htmlFor="name">Name your Post: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={caption.name}
                onChange={changeHandler}
              />
            </div>
            {error && !caption.name && (
              <span className="form-error-message">Please Enter Name</span>
            )}
            <div className="form-control">
              <label htmlFor="price">Platform : </label>
              <select
                type="platform"
                id="platform"
                name="platform"
                value={caption.platform}
                onChange={changeHandler}
              >
                <option>Select</option>
                {socialMedias.map((socialMedia, index) => {
                  return <option key={index}>{socialMedia}</option>;
                })}
              </select>
            </div>
            {error && !caption.platform && (
              <span className="form-error-message">
                Please Enter Name of the Platform
              </span>
            )}
            <div className="form-control">
              <label htmlFor="price">Mood : </label>
              <select
                type="mood"
                id="mood"
                name="mood"
                value={caption.mood}
                onChange={changeHandler}
              >
                <option>Select</option>
                {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
            </div>
            {error && !caption.mood && (
              <span className="form-error-message">
                Please Enter Mood of the caption
              </span>
            )}
            <div className="form-contro">
              <label htmlFor="catagory">Length:</label>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="length"
                    value="Short"
                    checked={caption.length === "Short"}
                    onChange={changeHandler}
                  />
                  Short
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="length"
                    value="Medium"
                    checked={caption.length === "Medium"}
                    onChange={changeHandler}
                  />
                  Medium
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="length"
                    value="Long"
                    checked={caption.length === "Long"}
                    onChange={changeHandler}
                  />
                  Long
                </label>
              </div>
            </div>
            {error && !caption.length && (
              <span className="form-error-message">
                Please Enter Length of the caption
              </span>
            )}

            <div className="form-control description">
              <label htmlFor="catagory">Description:</label>
              <textarea
                type="description"
                id="description"
                name="description"
                value={caption.description}
                onChange={changeHandler}
              />
            </div>
            {error && !caption.description && (
              <span className="form-error-message">Please Enter catagory</span>
            )}
            <div style={{ display: "block" }}>
              <button type="submit">Generate Caption</button>
            </div>
          </div>
        </form>
      </article>
      {caption.caption && (
        <div className="caption-result">
          {`${caption.caption}`}
          <div className="buttonContainer">
            <Button
              className="updatebutton"
              variant="outlined"
              onClick={saveCaption}
              startIcon={<FileUploadIcon />}
            >
              Save
            </Button>
            <Button
              className="updatebutton"
              variant="outlined"
              onClick={() => navigator.clipboard.writeText(caption.caption)}
              startIcon={<FileCopyTwoToneIcon />}
            >
              Copy
            </Button>
            <Button
              className="deletebutton"
              variant="outlined"
              onClick={() => removeCaption()}
              startIcon={<DeleteIcon />}
            >
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
