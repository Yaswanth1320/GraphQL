import React from "react";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import cyan from "../Images/cyan.png";
import bg from "../Images/bg.jpg";
import black from "../Images/black.png";
import "../Styles/Register.css";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN_USER } from "../Graphql/Queries";
import { useAuthDispatch } from "../Context/auth";
import { SpinnerDotted } from 'spinners-react';
import Swal from 'sweetalert2'

function Register() {
  const navigate = useNavigate();
  const [variables, setVariables] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAuthDispatch();

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError(err) {
      Swal.fire({
        title: 'Invalid User',
        text: 'Invalid email or password',
        icon: 'error',
        confirmButtonText: 'close'
      })
    },
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });
      navigate("/");
      window.location.reload();
    },
  });

  const submitForm = e => {
    e.preventDefault();
    loginUser({ variables });
  };

  return (
    <>
    {loading && <div className="spinner"><SpinnerDotted /></div>}
    <div className="body-content">
      <img src={black} alt="black" className="black" />
      <img src={cyan} alt="cyan" className="cyan" />
      <div className="signup">
        <div className="signup-image">
          <img src={bg} alt="inner" />
        </div>
        <div className="signup-form">
          <h1>Login</h1>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") submitForm(e);
            }}
          >
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
              <p>
                If your don't have an account?
                <Link to="/register">register</Link>
              </p>
            </div>
            <button type="submit" onClick={submitForm} className="signup-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
          <p>
            <Link to="/">Forget password ?</Link>
          </p>
        </div>
      </div>
    </div>
  </>
  );
}

export default Register;
