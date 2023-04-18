import "./App.css";
import Nav from "./components/nav";
import Footer from "./components/footer";
import SignUp from "./components/signUp";
import LogIn from "./components/LogIn";
import Update from "./components/Update";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import PrivateComponent from "./components/PrivateComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/add" element={<AddProduct />}></Route>
            <Route path="/product/:id" element={<Update />}></Route>
            <Route path="/profile" element={<h1>profile</h1>}></Route>
            <Route path="/logout" element={<h1>logout</h1>}></Route>
          </Route>
          <Route path="/signup" element={<SignUp />}>
            Sign Up
          </Route>
          <Route path="/login" element={<LogIn />}>
            Log In
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
