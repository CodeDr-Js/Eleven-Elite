import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "../fontawesome/css/all.css";
const ComfirmPassword = () => {
  return (
    <div className="container mt-2">
      <Link to="/">
        <img
          src={Arrow}
          alt="arrow-back"
          className="nav-arrow"
          style={{ width: "25px" }}
        />
      </Link>

      <div className="d-flex justify-content-center mt-5">
        <div className="d-flex flex-column align-items-center">
          <img
            src={Logo}
            alt="Logo"
            className="justify-content-center"
            style={{ width: "90px" }}
          />
          <p className="text-center logo-">Eleven Elites Football</p>
        </div>
      </div>
      <div className="d-flex">
        <form className=" m-2 rounded-4 p-4 w-100 form-div g-sub-color">
          <i
            id="envelope"
            className="fa fa-unlock-alt fa-fw fa-lg opacity-50 position-absolute"
          ></i>

          <input
            className="form-control w-100 form-username g-sub-color mb-3 "
            type="text"
            placeholder="Enter a new Password"
          />

          <button className="btn form-login-btn w-100 mt-4 mb-3" type="button">
            Comfirm Password
          </button>
          <div className="d-flex g-sub-color">
            <p className="form-have-account g-sub-color me-auto opacity-50">
              Don't you have an account?
            </p>
            <Link
              className="sign-up g-sub-color text-decoration-none"
              to="/login"
            >
              login
            </Link>
          </div>

          {/* 
            To be added later
          <button className="">Sign in</button> */}
        </form>
      </div>
    </div>
  );
};

export default ComfirmPassword;
