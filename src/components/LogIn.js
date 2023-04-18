import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (person.email && person.password) {
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify(person),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (!result.result) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
      } else {
        console.log(result.result);
        navigate("/login");
      }
    } else {
      console.log("Please enter all the values");
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  return (
    <>
      <article>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              value={person.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={person.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </article>
    </>
  );
};

export default LogIn;
