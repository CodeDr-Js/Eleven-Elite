import React, { useState } from 'react'
import "./index.css"
//import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import error2 from "../../../assets/icons/failed.png";



const ErrorCard = ({error, handleCloseModal}) => {
const navigate = useNavigate(); 
 



  //const [token,setToken, removeToken] = useCookies(["auth-token"]);
  

  
  const goBack = () => {
    navigate("/deposit");
  };

  //Toggle Modal

  return (
    <div className="error-div-1 container">
       <div  className=" bg-transparent d-flex justify-content-center mb-1">
        <img className=" bg-transparent" src={error2} alt="success icon" style={{width: "35px"}}/>
      </div>
      <div className="bet-color text-center text-danger fw-bold">{error}</div>
      <div className="bet-color d-flex  mt-4">
        <button
          onClick={handleCloseModal}
          className="btn btn-success w-25 error-button bet-color me-auto "
        >
          Ok
        </button>
        <button
          onClick={goBack}
          className="btn btn-success error-button bet-color"
        >
          Deposit
        </button>
      </div>
    </div>
  );
}

export default ErrorCard