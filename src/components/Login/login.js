import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import LoginNav from "../loginNav/loginNav";
import "../fontawesome/css/all.css";
import axios from "axios";
import { API } from "../api-service/api-service";
import { useCookies } from "react-cookie";
import { DataContext } from "../APIs/Api";
import Button from "../loader-btn/loader-btn";
import Register from "../Register/register";


const Login = () => {
  const {setActiveToken, activeToken } = useContext(DataContext);
  const [activeButton, setActiveButton] = useState('login');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  console.log("Token is: ",activeToken);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  //  const { data, allData, activeToken, activities, user } =
  //    useContext(DataContext);

  //  //Checking for token/Active
  //  useEffect(() => {
  //    if (activeToken) {
  //      console.log("Your token is", activeToken);
  //      navigate("/");
  //    } else {
  //    }
  //  }, []);

  const [token, setToken] = useCookies(["auth-token"]);
   useEffect(() => {
     const token1 = token["auth-token"];
     if (token1) {
//       console.log("Your token is", token1);
       navigate("/");
       setActiveToken(token1)
     } else {
      
      setActiveToken("")
     }
   }, []);

 // console.log(values);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowLoader(true);
   // console.log("sending.....");
    const removeErr = document.getElementById("errorr");
    API.loginUser(values)
      .then((result) => {
        setShowLoader(false);
        if (result.success) {
          setToken("auth-token", result.token);
          setActiveToken(result.token)
          navigate("/");
        } else {
          setError(result.message);
        }
      })
      .catch((err) => setError(err));
  };

  //  <h1 className="text-center">LOGIN HERE</h1>;
  //  {
  //    error ? (
  //      <p className="alert alert-danger text-uppercase f-italic">
  //        {" "}
  //        {error && error}
  //      </p>
  //    ) : (
  //      ""
  //    );
  //  }
  //  {
  //    (" ");
  //  }

  setTimeout(() => {
    if (error) {
      setError("");
    }
  }, 3000);

  return (
    <div className="container mt-2">
    
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
        <div className=" m-2 rounded-4 p-4 w-100 form-div g-sub-color position-relative">
          <div className="g-sub-color mb-4">
            <LoginNav
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          </div>

          {activeButton === "login" ? 
          <form className="g-sub-color" onSubmit={handleSubmit}>
            {/* {activeButton === 'login'?   */}
            {error ? (
              <p className="alert alert-danger">
                {error && error}
              </p>
            ) : (
              ""
            )}
            <i
              id="envelope"
              className="fa fa-user-circle fa-fw fa-lg opacity-50 position-absolute"
            ></i>

            <input
              className="form-control w-100 form-username g-sub-color mb-3 "
              type="text"
              placeholder="Enter your username"
              name="username"
              required
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />

            <i
              id="key"
              className="fa fa-key fa-fw fa-lg opacity-50 position-absolute"
            ></i>
            <input
              className="form-control w-100 form-password g-sub-color"
              type={passwordVisible ? 'text' : 'password'}
              //type="password"
              placeholder="Enter your password"
              name="password"
              required
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <i onClick={togglePasswordVisibility} id="toggle2" className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"} style={{cursor:"pointer"}}></i>

            <div className="g-sub-color mt-1">
              <Link
                className="text-decoration-none text-primary form-forget g-sub-color"
                to="/forget-password"
              >
                Forgot your password?
              </Link>
            </div>

            {/* <button className="">Login</button> */}
            <Button text="Login" loading={showLoader} disabled={showLoader} />
            <div className="d-flex g-sub-color">
              <p className="form-have-account g-sub-color me-auto opacity-50">
                Don't you have an account?
              </p>
              <Link
                className="sign-up g-sub-color text-decoration-none"
                to="/register"
              >
                Sign Up
              </Link>
            </div>

            {/* 
            To be added later
          <button className="">Sign in</button> */}
          </form>
          : navigate('/register') }
        </div>
      </div>
    </div>
  );
};

export default Login;
