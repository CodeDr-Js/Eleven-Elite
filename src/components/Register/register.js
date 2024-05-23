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
import Button from "../loader-btn/loader-btn";
import { dir } from "../search_dir/search_dir";
import { DataContext } from "../APIs/Api";


/**Full name 

Username 

 Email 

Referral code

Password */
const Register = () => {
  const navigate = useNavigate();
  const {setActiveToken, activeToken} = useContext(DataContext);
  const [activeButton, setActiveButton] = useState("signup");
  const [token, setToken] = useCookies(["auth-token"]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  console.log(activeToken);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

  const [values, setValues] = useState({
    first_name: "",
    email: "",
    username: "",
    invited: "",
    password: "",
  });
  console.log(values);

  const [login, setLogin] = useState({
    username: values.username,
    password: values.password,
  });

  console.log(login);
  

  //Checking for token/Activ
  useEffect(() => {
    const token1 = token["auth-token"];
    if (token1) {
   //   console.log("Your token is", token1);
      navigate("/");
      setActiveToken(token1)
    } else {
      
    }
  }, []);

  //console.log(values);
  

  const handleRequest = (response) => {
   // console.log(response);
  };

  //Using the dir and gettin user invited code
 const invitedUser = dir("invited");
 useEffect(() => {
   if (invitedUser) {
     setValues((prev) => ({
       ...prev,
       invited: invitedUser,
     }));
   }
 }, []);


  const [showLoader, setShowLoader] = useState(false);

  //Handling the form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);

    //formData is an api in javaScript that allows us to create and manipulate html form data as key-value pairs
    // const formData = new FormData();
    // formData.append("first_name", values.first_name);
    // formData.append("email", values.email);
    // formData.append("username", values.username);
    // formData.append("invited", values.invited);
    // formData.append("password", values.password);

    API.registerUser(values)
      .then((result) => {
        setShowLoader(false);
        //console.log(result);
        // if(result.statusCode === 400) {
        //   console.log("yes 400");
        // }
        if (result.success) {
          //handleRequest(result);
          API.loginUser({username: values.username, password: values.password})
          .then((result) => {
            if(result.success){
              setToken("auth-token", result.token);
              setActiveToken(result.token)
              navigate("/");
            } 
          })
          .catch((err)=> console.log(err));
          setSuccess(result.message);
     //     console.log(result.message);
     //     console.log(success);
         
          //window.location.href = "/"
          // setTimeout(() => {

          // }, 2000);
        } else {
       //   console.log("user", result);
          setError(result.message);
        }
      })
      .catch((err) => console.log(err));
  };

  //Error timeout
  setTimeout(() => {
    if (error) {
      setError("");
    }
  }, 3000);


  return (
    <div className="container mt-2">
      {/* <Link to="/">
        <img
          src={Arrow}
          alt="arrow-back"
          className="nav-arrow ms-2"
          style={{ width: "25px" }}
        />
      </Link> */}

      <div className="d-flex justify-content-center mt-4">
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
        <div className=" m-2 rounded-4 p-4 w-100 form-div g-sub-color">
          <div className="g-sub-color mb-4">
            <LoginNav
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          </div>
          {activeButton === "signup" ? 
          <form onSubmit={handleSubmit} className="g-sub-color">
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
              placeholder="Enter your Fullname"
              required
              name="first_name"
              onChange={(e) =>
                setValues({
                  ...values,
                  first_name: e.target.value,
                })
              }
            />

            <i
              id="key"
              className="fa fa-envelope fa-fw fa-lg opacity-50 position-absolute"
            ></i>
            <input
              className="form-control w-100 mb-3 form-password g-sub-color"
              type="email"
              placeholder="Enter your Email"
              required
              name="email"
              onChange={(e) =>
                setValues({
                  ...values,
                  email: e.target.value,
                })
              }
            />
            <i
              id="key"
              className="fa fa-user fa-fw fa-lg opacity-50 position-absolute"
            ></i>
            <input
              className="form-control w-100 mb-3 form-password g-sub-color"
              type="text"
              placeholder="Enter your Username"
              name="username"
              required
              onChange={(e) =>
                setValues({
                  ...values,
                  username: e.target.value,
                })
              }
            />
            <i
              id="key"
              className="fa fa-link fa-fw fa-lg opacity-50 position-absolute"
            ></i>
            <input
              className="form-control w-100 mb-3 form-password g-sub-color"
              type="text"
              placeholder="Referral Code (Optional)"
              value={values.invited}
              name="invited"
              readOnly
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
                setValues({
                  ...values,
                  password: e.target.value,
                })
              }
            />
             <i onClick={togglePasswordVisibility} id="toggle2" className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"} style={{cursor:"pointer"}}></i>

            <Button
              text="Create account"
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
          : navigate('/login')}
        </div>
      </div>
      {/* 
      <form>
        <input type="text" />
        <button>Sumit</button>
      </form> */}
    </div>
  );
};

export default Register;
