import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../Context/auth";
import "../Styles/Home.css";
import black from "../Images/black.png";
import cyan from "../Images/cyan.png";
import Users from "./Users";
import Messages from "./Messages";
import Swal from 'sweetalert2'

function Home() {
  const [selectedUser,setSelectedUser] = useState(null)
  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  function logout() {
    dispatch({ type: "LOGOUT" });
    Swal.fire({
      title: 'Success!',
      text: 'You have been Logged Out',
      icon: 'success',
      confirmButtonText: 'close'
    })
    navigate("/login");
  }

  return (
    <div className="main">
      <img src={black} alt="black" className="black" />
      <img src={cyan} alt="cyan" className="cyan" />
      <div className="chat">
        <div className="navbar">
          <div className="logo">
            <i className="fa-brands fa-connectdevelop fa-spin"></i>
            <span> VConnect</span>
          </div>
          <div className="links">
            {!user ? (
              <div className="link">
                <Link to="/register">
                  <i className="fa-solid fa-registered"></i> Register
                </Link>
                <Link to="/login">
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </Link>
              </div>
            ) : (
              <button className="logout-btn" onClick={logout}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            )}
          </div>
        </div>

        <div className="users">
          <h3>Inbox</h3>
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search Messages" />
          </div>
            <Users setSelectedUser={setSelectedUser}/>
        </div>

        <Messages/>
      </div>
    </div>
  );
}

export default Home;
