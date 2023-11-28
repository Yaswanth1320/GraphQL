import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../Context/auth";
import "../Styles/Home.css";
import black from "../Images/black.png";
import cyan from "../Images/cyan.png";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../Graphql/Queries";

function Home() {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  function logout() {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  const { loading, data, error } = useQuery(GET_USERS);

  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data)
  }

  let userlist
  if(!data || loading){
    userlist = <p>Loading..</p>
  }else if(data.getUsers.length === 0){
    userlist = <p>No user found</p>
  }else if(data.getUsers.length > 0){
      userlist = data.getUsers.map((user) =>(
        <div key={user.id} className="user">
          <h5>{user.username}</h5>
        </div>
      ))
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
          <div className="user-list">
            <p>Online</p>
            {userlist}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
