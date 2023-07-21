// navbar.jsx

import "./navbar.scss";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/Home">
        <div className="wastebin">
          <button onClick={() =>{}}>
            <p>WasteBin</p> 
          </button>
        </div>
      </Link>

      <Link to="/History">
        <div className="history">
          <button onClick={() =>{}}>
            <p>History</p>
          </button>
        </div>
      </Link>

      {/* <Link to="/Employee">
        <div className="Employee">
          <button onClick={() =>{}}>
            <p>Employee</p>
          </button>
        </div>
      </Link> */}

      <Link to="/">
      <div className="logout">
        <button onClick={() =>{}}>
          <i className="fa fa-sign-out"></i>
        </button>
      </div>
      </Link>
    </div>
  );
};

export default Navbar;
