import React from "react";
import "./index.css";
import "../color/color.css";
import "../fontawesome/css/all.css";
import Logo from "../../assets/images/Logo.png"
import coins from "../../assets/icons/coins.png";
import { useNavigate } from "react-router-dom";

const WithdrawSuccess = ({
  setIsOpen3,
  amountWithdrawn,
  withdrawnSuccessMsg,
}) => {
const navigate = useNavigate()
  const handleCloseModal = () => {
    setIsOpen3(false);
  };

  const goBack = () => {
    navigate('/')
  }

//   d-flex flex-column align-items-center
  return (
    <div className="withdraw-success-div bet-color-g container ">
      <div className="bg-transparent">
        <div className="d-flex bg-transparent">
            <div className="bg-transparent"></div>
            <i
        onClick={handleCloseModal}
          id="close"
          className="fa fa-times fa-fw fa-lg ms-auto bg-transparent "
        ></i>
            
        </div>
        
        <div className="bg-transparent d-flex flex-column align-items-center">
          <h3 className="bg-transparent text-center w-100 pt-4">Congratulations!</h3>
          <div className="bg-transparent">
            <img src={coins} alt="coins" className="bg-transparent shadow-lg" style={{width:"110px"}}/>
          </div>
          <h2 className="bg-transparent amount-w fw-bold">{amountWithdrawn} USDT</h2>
          <p className="bg-transparent text-center">{withdrawnSuccessMsg}</p>
          
        </div>
        {/* <i
          id="close1"
          className="fa fa-money-bill-wave fa-fw fa-2x ms-auto bg-transparent "
        ></i> */}
        <button onClick={handleCloseModal} className="btn btn-warning w-100 p-3 text-primary fw-bold opacity-75 mt-3 shadow-lg">
        <i
          id="clo"
          className="fa fa-money-bill-wave fa-fw fa-lg text-primary bg-transparent "
        ></i> <span className="bg-transparent text-primary ">Continue to withdraw</span>
        </button>
        <button onClick={goBack} className="btn btn-primary mt-4 w-100  fw-bold opacity-50 p-3 shadow-lg">Back Home</button>

        <div className="bg-transparent d-flex flex-column align-items-center mt-2">
          <div className="bg-transparent">
            <img  className="bg-transparent" src={Logo} alt="Logo" style={{width:"70px"}}/>
          </div>
          <div className="bg-transparent d-flex flex-column align-items-center">
            <h5 className="bg-transparent">Eleven Elite Football</h5>
            <small className="bg-transparent ">"EEF TO THE WORD"</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawSuccess;
