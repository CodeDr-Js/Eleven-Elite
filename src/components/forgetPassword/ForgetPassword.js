import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "../fontawesome/css/all.css";
import Button from "../loader-btn/loader-btn";
//import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import axios from "axios";
import { API } from "../api-service/api-service";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
  });

  const token = Cookies.get("auth-token");
  //Checking for token/Activ
  useEffect(() => {
    if (token) {
//      console.log("Your token is", token1);
      navigate("/");
    } else {
    }
  }, [token]);

 // console.log(values);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  axios.defaults.withCredentials = true;

  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowLoader(true);
  //  console.log("sending.....");

    API.forgetPassword(values)
      .then((result) => {
        setShowLoader(false);
        if (result.success) {
    //      console.log(result);
          setSuccess(result.message);
          //navigate("/");
        } else {
          setError(result.message);
        }
      })
      .catch((err) => setError(err));
  };

  setTimeout(() => {
    if (success) {
      setSuccess("");
    } else if (error) {
      setError("");
    }
  }, 6000);

  return (
    <div className="container mt-2">
      <Link to="/">
        <img
          src={Arrow}
          alt="arrow-back"
          className="nav-arrow ms-2"
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
        <form
          onSubmit={handleSubmit}
          className=" m-2 rounded-4 p-4 w-100 form-div g-sub-color"
        >
          {error ? (
            <p className="alert alert-danger">
              {error}
            </p>
          ) : (
            ""
          )}
          {success ? (
            <p className="alert alert-success text-uppercase f-italic">
              {success}
            </p>
          ) : (
            ""
          )}
          <i
            id="envelope"
            className="fa fa-envelope fa-fw fa-lg opacity-50 position-absolute"
          ></i>

          <input
            className="form-control w-100 form-username g-sub-color mb-3 "
            type="text"
            placeholder="Enter your Email"
            name="email"
            required
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <Button
            text="Reset Password"
            loading={showLoader}
            disabled={showLoader}
          />
          <div className="d-flex g-sub-color">
            <p className="form-have-account g-sub-color me-auto opacity-50">
              Don't you have an account?
            </p>
            <Link
              className="sign-up g-sub-color text-decoration-none"
              to="/login"
            >
              Login
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

export default ForgetPassword;
