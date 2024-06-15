import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import success2 from "../../../assets/icons/success-2.svg";

const SuccessCard = ({ success }) => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="error-div-1  container">
      <div  className=" bg-transparent d-flex justify-content-center mb-1">
        <img className=" bg-transparent" src={success2} alt="success icon" style={{width: "35px"}}/>
      </div>
      <div className="bet-color text-center text-success fw-bold">
        {success}
      </div>
      <div className="bet-color d-flex  mt-4">
        <button
          onClick={goBack}
          className="btn btn-success error-button bet-color me-auto "
        >
          Continue
        </button>
        <Link to="/history" className="btn btn-success error-button bet-color">
          History
        </Link>
      </div>
    </div>
  );
};

export default SuccessCard;
