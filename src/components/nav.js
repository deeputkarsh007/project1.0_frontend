import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Products</Link>
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
