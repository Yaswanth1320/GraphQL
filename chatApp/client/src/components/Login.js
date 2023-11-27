import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import cyan from '../Images/cyan.png'
import bg from "../Images/bg.jpg"
import black from '../Images/black.png'
import '../Styles/Register.css'
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../Graphql/Queries";

function Register() {

  const navigate = useNavigate();
  const [variables, setVariables] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, res) {
      navigate("/login");
    },
    onError(err) {
      console.log(err);
    },
  });

  function submitForm() {
    registerUser({ variables });
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
          </div>
          <button onClick={submitForm} className="signup-btn">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <p>Forget password ?</p>
        </div>
      </div>
    </div>
  );
}

export default Register;

