import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../Context/auth";
import "../Styles/Home.css";
import black from '../Images/black.png'
import cyan from '../Images/cyan.png'

function Home() {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  function logout() {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  return (
    <div className="main">
      <img src={black} alt="black" className="black" />
      <img src={cyan} alt="cyan" className="cyan" />
      <div className="chat">
      <div className="navbar">
        <div className="logo"><i className="fa-brands fa-connectdevelop fa-spin"></i><span> VConnect</span></div>
        <div className="links">
          {!user ? (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <button className="logout-btn" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
