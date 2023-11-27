import React from "react";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import cyan from '../Images/cyan.png'
import bg from "../Images/bg.jpg"
import black from '../Images/black.png'
import '../Styles/Register.css'
import { useNavigate,Link } from "react-router-dom";
import { LOGIN_USER } from "../Graphql/Queries";

function Register() {

  const navigate = useNavigate();
  const [variables, setVariables] = useState({
    email: "",
    password: "",
  });
  const [loginUser,{loading}] = useLazyQuery(LOGIN_USER,{
    onError(err) {
      console.log(err);
    },
    onCompleted(data){
      localStorage.setItem('token', data.login.token)
      navigate('/')
    }
  });

  function submitForm() {
    loginUser({variables})
  }

  return (
    <div className="body-content">
      <img src={black} alt="black" className="black" />
      <img src={cyan} alt="cyan" className="cyan" />
      <div className="signup">
        <div className="signup-image">
          <img src={bg} alt="inner" />
        </div>
        <div className="signup-form">
            <h1>Login</h1>
          <div className="details">
            <div className="same">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                value={variables.email}
                onChange={(e) =>
                  setVariables({ ...variables, email: e.target.value })
                }
                className="email"
                placeholder="Email address"
              />
            </div>
            <div className="same">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                value={variables.password}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
                className="pass"
                placeholder="Password"
              />
            </div>
            <p>If your don't have an account?<Link to='/register'>register</Link></p>
          </div>
          <button onClick={submitForm} className="signup-btn">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <p><Link to='/'>Forget password ?</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;

