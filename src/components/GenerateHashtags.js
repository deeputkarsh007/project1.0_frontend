import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Configuration, OpenAIApi } from "openai";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyTwoTone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import gif from "../usables/machine.gif";
import "../CSS/form.css";

const GenerateHashTags = () => {
  let userIdVal = localStorage.user;
  userIdVal = JSON.parse(userIdVal);
  const [showCaption, setShowCaption] = useState("");
  const [hashtags, setHashtags] = useState({
    quantity: "",
    hashtags: "",
    description: "",
  });
  const [error, setError] = useState(false);
  const handleGenerate = async (e) => {
    e.preventDefault();
    console.log(hashtags);
    if (!hashtags.quantity || !hashtags.description) {
      setError(true);
      return false;
    } else {
      fetchHashtags();
      console.log(hashtags);
    }
  };
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    })
  );
  const fetchHashtags = async () => {
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Give me ${hashtags.quantity} for post regarding ${hashtags.description},please do not number it `,
          },
        ],
      })
      .then((res) => {
        let ans = res.data.choices[0].message.content;
        console.log(ans);
        setHashtags({ ...hashtags, hashtags: ans });
        // console.log(showCaption, "Hello this is working as funcpkk");
      });
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHashtags({ ...hashtags, [name]: value });
  };
  const quantity = ["5 Hashtags", "10 Hashtags", "20 Hashtags", "30 Hashtags"];
  const removeHashtags = () => {
    setHashtags({
      quantity: "",
      hashtags: "",
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
            <div className="logo">
              <h1>CAPWIZARD</h1>
            </div>
            <div className="form-control">
              <label htmlFor="price">Quantity : </label>
              <select
                type="quantity"
                id="quantity"
                name="quantity"
                value={hashtags.quantity}
                onChange={changeHandler}
              >
                <option>Select Quantity</option>
                {quantity.map((quantity, index) => {
                  return <option key={index}>{quantity}</option>;
                })}
              </select>
            </div>
            {error && !hashtags.quantity && (
              <span className="form-error-message">
                Please choose number of hashtags
              </span>
            )}
            <div className="form-control description">
              <label htmlFor="catagory">Description : </label>
              <textarea
                type="description"
                id="description"
                name="description"
                value={hashtags.description}
                onChange={changeHandler}
              />
            </div>
            {error && !hashtags.description && (
              <span className="form-error-message">
                Please describe your post
              </span>
            )}
            <div className="button-container">
              <button type="submit">Generate Hashtags</button>
            </div>
          </div>
        </form>
      </article>
      {hashtags.hashtags && (
        <div className="caption-result">
          {`${hashtags.hashtags}`}
          <div className="buttonContainer">
            <Button
              className="updatebutton"
              variant="outlined"
              onClick={() => navigator.clipboard.writeText(hashtags.hashtags)}
              startIcon={<FileCopyTwoToneIcon />}
            >
              Copy
            </Button>
            <Button
              className="deletebutton"
              variant="outlined"
              onClick={() => removeHashtags()}
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

export default GenerateHashTags;
