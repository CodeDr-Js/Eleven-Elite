import React, { useState } from "react";
import "../fontawesome/css/all.css";
import "./index.css";
import "../color/color.css";
import ErrorCard from "./errorCard";
import SuccessCard from "./successCard";

const Pin = ({
  handleCloseModal,
  isLoadingPin,
  error,
  pin,
  isOpen1,
  setIsOpen1,
  success,
  setIsOpen,
}) => {
  //console.log(pin, isOpen1, success, error);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [values, setValues] = useState({
    transaction_pin: "",
  });

  console.log(values);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCloseModal1 = (e) => {
    setIsOpen1(false);
    //  if (e.target.classList.contains("modal-overlay-error")) {
    //    setIsOpen(false);
    //  }
    // const newBetBtn = document.getElementById(betBtn);
    // if (Number(values.amount) >= 10) {
    //   newBetBtn.classList.remove("disabled");
    // }
  };

  const handleCloseModule2 = () => {
    setIsOpen1(false)
    setIsOpen(false);
    
  }
  return (
    <div className="pin-div-1">
      <p className="bet-color text-center">Set your withdrawal pin</p>

      <i
        id="key"
        className="fa fa-key fa-fw fa-lg opacity-50 position-absolute"
      ></i>
      <input
        className="form-control w-100 form-password g-sub-color"
        type={passwordVisible ? "text" : "password"}
        //type="password"
        placeholder="Enter your pin"
        name="transaction_pin"
        required
        onChange={(e) =>
          setValues({ ...values, transaction_pin: e.target.value })
        }
      />
      <i
        onClick={togglePasswordVisibility}
        id="toggle"
        className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}
        style={{ cursor: "pointer" }}
      ></i>

      {/* <small>Minimum 4 digits!</small> */}
      {isLoadingPin ? (
        <button className="btn btn-primary w-100 mt-2 shadow-lg disabled opacity-50 text-warning">
          Loading...
        </button>
      ) : (
        <button
          onClick={() =>
            handleCloseModal({ transaction_pin: values.transaction_pin })
          }
          className={values.transaction_pin === "" ? "btn btn-primary w-100 mt-2 shadow-lg disabled opacity-50": "btn btn-primary w-100 mt-2 shadow-lg" }
        >
          Set Pin
        </button>
      )}

      {isOpen1 ? (
        <div>
          {error ? (
            <div className="modal-overlay-error">
              <ErrorCard
                handleCloseModal1={handleCloseModal1}
                error={error}
                isOpen1={isOpen1}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {isOpen1 ? (
        <div>
          {success ? (
        <div className="modal-overlay-success">
          <SuccessCard
            success={success}
            pin={pin}
          handleCloseModule2={handleCloseModule2 }
          />
        </div>
      ) : (
        ""
      )}
        </div>
      ) : (
        ""
      )}
      
    </div>
  );
};

export default Pin;
