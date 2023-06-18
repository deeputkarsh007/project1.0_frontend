import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import "../CSS/nav.css";
const Nav = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signup");
  };
  const auth = localStorage.getItem("user");
  return (
    <>
      {auth ? (
        <div className="navbar">
          <ul className="nav-ul">
            <ul className="logo">
              <li>
                <SmartToyRoundedIcon />
              </li>
              <li>
                <h1>CAPWIZARD</h1>
              </li>
            </ul>
            <li>
              <Link to="/">Saved Captions</Link>
            </li>
            <li>
              <Link to="/generate">Generate Caption</Link>
            </li>
            <li>
              <Link to="/generateHashtags">Generate Hashtags</Link>
            </li>
            {/* <li>
              <Link to="/update">Update Product</Link>
            </li> */}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/signup" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar">
          <ul className="nav-ul">
            <ul className="logo">
              <li>
                <SmartToyRoundedIcon />
              </li>
              <li>
                <h1>CAPWIZARD</h1>
              </li>
            </ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
