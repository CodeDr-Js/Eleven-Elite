import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";


const SuccessCard = ({ success, isOpen1, handleCloseModule2, pin }) => {
  console.log(pin, isOpen1, success);
  const navigate = useNavigate();
  const goBack = () => {
    // window.history.back();
    navigate("/");
  };

  
  return (
    <div className="error-div pt-5 container">
      <div className="bet-color text-center text-success fw-bold">
        {success} {pin}
      </div>
      <div className="bet-color d-flex  mt-4">
        <button
          onClick={handleCloseModule2}
          className="btn btn-success error-button bet-color me-auto "
        >
          Withdraw
        </button>
        <button
          onClick={goBack}
          className="btn btn-success error-button bet-color"
        >
          Cancel
        </button>
        {/* <Link to="/history" className="btn btn-success error-button bet-color">
          History
        </Link> */}
      </div>
    </div>
  );
};

export default SuccessCard;
