import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-100">
      <div className="logo">
        <img src="img/Logo.png" alt="" height="50" width="50" className="img" />
        <p className="para">UUNSE</p>
      </div>
      <form id="loginForm">
        <i id="envelope" className="fa fa-envelope fa-fw"></i>
        <Link className="login-1" to="/login">
          Login
        </Link>
        <Link className="sign-up-1" to="/register">
          Sign Up
        </Link>
        <input
          className="input-1"
          type="text"
          id="loginUsername"
          placeholder="Enter your E-mail"
          required
        />

        <i id="key" className="fa fa-key fa-fw"></i>
        <input
          className="input-2"
          type="password"
          id="loginPassword"
          placeholder="Enter your password"
          name="loginPassword"
          required
        />
        <Link className="password" to="/forget-password">
          Forgot your password?
        </Link>

        <button className="login" type="button">
          Login
        </button>
        <p className="account">Don't you have an account?</p>
        <Link className="sign-up" to="/register">
          Sign Up
        </Link>

        <button className="google">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
