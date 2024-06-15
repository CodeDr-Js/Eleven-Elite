import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const SuccessCard = ({ success }) => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="error-div pt-5 container">
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
