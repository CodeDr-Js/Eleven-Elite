import React, { useContext, useEffect, useState } from "react";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "./index.css";
import "../color/color.css";
import { Link, useNavigate } from "react-router-dom";
import dollar from "../../assets/icons/dollar.png";
import tether from "../../assets/icons/tether.png";
import usdt from "../../assets/icons/usdt.png";
import usd from "../../assets/icons/usd.png";
import usd1 from "../../assets/icons/usd1.png";
import { DataContext } from "../APIs/Api";
import { useCookies } from "react-cookie";
import Pin from "../withdrawal pin/pin";
import { API } from "../api-service/api-service";
import WithdrawSuccess from "./withdrawSuccess";


const Withdrawal = () => {
  const navigate = useNavigate();
  const { setActiveToken, activities_g, setActivities_g } =
    useContext(DataContext);
  const [token, setToken, removeToken] = useCookies(["auth-token"]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [values, setValues] = useState({
    amount: "",
    address: "",
    transaction_pin: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPin, setIsLoadingPin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(null);
  const [pin, setPin] = useState();
  const [errorWithdraw, setErrorWithdraw] = useState();
  const [amountWithdrawn, setAmountWithdraw] = useState();
  const [withdrawnSuccessMsg, setWithdrawSuccessMsg] = useState();

  // const [amount, setAmount] = useState('');
  const checkToken = () => {
    const token1 = token["auth-token"];

    if (token1) {
      console.log("token", token1);
      setActiveToken(token1);
    } else {
      setActiveToken("");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleAllClick = () => {
    setValues((prev) => ({
      ...prev,
      amount : !Array.isArray(activities_g) ? activities_g.wallet.bal_info.bal.toFixed(2):""
    }))
    // setValues(!Array.isArray(activities_g) ? activities_g.wallet.bal_info.bal.toFixed(2):""); // Set the amount to total available amount
  };

  const [isOpen1, setIsOpen1] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  console.log(values);

  // const checkWithdrawalAmount = () => {
  //   const withdraw_id = document.getElementById("withdraw_id");
  //   if(values.amount !>= 10) {}
  // }

  const handleSubmitWitdrawal = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorWithdraw('');
    setAmountWithdraw("");

    API.withdraw(values, token["auth-token"])
    .then((result) => {
      console.log(result);
      setIsLoading(false);
      if(result.success) {
        setIsOpen3(true);
        setAmountWithdraw(result.amount)
        setWithdrawSuccessMsg(result.message)
        setActivities_g((prev) => ({
          ...prev,
          wallet: {
            bal_info: {
              bal: result.activities.wallet.bal_info.bal
            }

          }
          

        }))
      } else if (result.detail || result.detail === "Invalid token.") {
        removeToken("auth-token");
        setActiveToken('')
        navigate("/login")

      } else {
        setErrorWithdraw(result.message)
      }
    })
  
  };

  const handleActivities = () => {
    setTimeout(() => {
      if (!activities_g.profile) {
        setIsOpen(true);
      }
    }, 7000);
  };

  useEffect(() => {
    handleActivities();
  }, []);

  const handleCloseModal = (value) => {
    setSuccess("");
    setError("");

    setIsLoadingPin(true);
    console.log(value);
    API.setPin(value, token["auth-token"])
      .then((result) => {
        console.log(result);
        setIsLoadingPin(false);

        if (result.success) {
          
          setPin(result.activities.profile.transaction_pin);
          setSuccess("Transaction pin set. Your transaction pin: ");
          setIsOpen1(true);
          setTimeout(() => {
            setActivities_g((prev)=>{
              return (
                {...prev,
                  profile: result.activities.profile  
                }
                
              )
            })
            
          }, 10000);
          console.log(activities_g);
          //setIsOpen(false);
        } else {
          setError(result.detail);
          setError(result.message);
          setIsOpen1(true);
          // setIsLoadingPin(false);
          setIsOpen(true);
        }
      })
      .catch((err) => console.log(err));

    // setTimeout(() => {

    // }, 5000);

    //  if (e.target.classList.contains("modal-overlay-error")) {
    //    setIsOpen(false);
    //  }
    // const newBetBtn = document.getElementById(betBtn);
    // if (Number(values.amount) >= 10) {
    //   newBetBtn.classList.remove("disabled");
    // }
  };



  setTimeout(() => {
    if (errorWithdraw) {
      setErrorWithdraw("");
    }
  }, 3000);

  const goBack = () => {
    window.history.back();
  }
  return (
    <div className="container">
      <div className="d-flex pt-3">
        <div onClick={goBack}>
        
            <img src={Arrow} alt="arrow-back" className="nav-arrow" />
         
        </div>
        <h3 className="text-center w-100">Withdraw</h3>
      </div>

      <div className="mt-4">
        <div className="d-flex">
          <div
            className="d-flex w-50 main-color rounded-3 shadow-lg me-2"
            style={{ height: "55px" }}
          >
            <div className="main-color pt-3 ps-3">
              <img src={usdt} alt="usdt logo" style={{ width: "27px" }} />
            </div>
            <p className="main-color ps-3 pt-3 fw-bold">USDT</p>
          </div>

          <div
            className="d-flex main-color w-50 ms-2 rounded-3 shadow-lg"
            style={{ height: "55px" }}
          >
            <p className="ps-3 pt-3 fw-bold main-color">TRC20</p>
            <i
              id="envelope2"
              className="fa fa-circle fa-fw opacity-50 text-warning ms-auto me-3 main-color"
            ></i>
          </div>
        </div>

        <div className="mt-5">
          <p className="fw-bold opacity-75">Your wallet address</p>
          <input
            className="form-control pb-5 form-username main-color p-3 opacity-75"
            type="text"
            placeholder="Enter your wallet address"
            name="address"
            onChange={(e) =>
              setValues({ ...values, address: e.target.value })
            }
          />
        </div>

        <div className="mt-4">
          <p className="fw-bold opacity-75">Amount</p>
          <div className="d-flex">
            <input
              className="form-control form-username main-color p-3 opacity-75"
              type="number"
              placeholder="Enter Amount"
              value={values.amount}
              name="amount"
              onChange={(e) => setValues({ ...values, amount: e.target.value })}
            />
            <button onClick={handleAllClick} className="position-absolute bg-primary p-2 rounded-3 fw-bold all-btn">
              ALL
            </button>
          </div>
          <div className="mt-3 d-flex">
            <p className="opacity-50 fw-bold pe-2">Balance</p>
            <div className="d-flex">
              <div>
                <img src={usdt} style={{ width: "20px" }} />
              </div>

              {!Array.isArray(activities_g) ? (
                <p className="ps-1 opacity-50 fw-bold amount1">
                  $ {activities_g.wallet.bal_info.bal.toFixed(2)}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="main-color mt-2 mb-2">
            <i
              id="key"
              className="fa fa-key fa-fw fa-lg opacity-50 position-absolute"
            ></i>
            <input
              className="form-control w-100 form-password g-sub-color position-relatives"
              type={passwordVisible ? "text" : "password"}
              //type="password"
              placeholder="Enter your pin"
              name="transaction_pin"
              required
              onChange={(e) => setValues({ ...values, transaction_pin: e.target.value })}
            />
            <i
              onClick={togglePasswordVisibility}
              id="toggle1"
              className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye "}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          <div className="d-flex">
            <i className="fa fa-exclamation-triangle fa-fw fa-lg opacity-50 text-warning pt-3"></i>
            <p className="text-warning ms-2 pt-1">
              The minimum withdrawal amount is 10 USDT
            </p>
          </div>
          
          {errorWithdraw ? (
              <p className="alert alert-danger">
                {errorWithdraw}
              </p>
            ) : (
              ""
            )}
          {isLoading ? (
            <button className="btn btn-primary w-100 p-3 fw-bold disabled opacity-50 text-warning">
              Loading...
            </button>
          ) : (
            <button
              id="withdraw_id"
              onClick={handleSubmitWitdrawal}
              className={
                Number(values.amount) >= 10 && values.address.length > 10 && values.transaction_pin !== ""
                  ? "btn btn-primary w-100 p-3 fw-bold "
                  : "btn btn-primary w-100 p-3 fw-bold disabled opacity-50 "
              }
            >
              Withdraw
            </button>
          )}
          {/* <button className="btn btn-primary w-100 p-3 fw-bold ">{isLoading?"Loading..."Withdraw}</button> */}
          <p className="opacity-50">Transaction fee: 3%</p>
        </div>
      </div>

      {!activities_g.profile ? (
        <div>
          {isOpen ? (
            <div>
              <div className="modal-overlay">
                <Pin
                  handleCloseModal={handleCloseModal}
                  isLoadingPin={isLoadingPin}
                  error={error}
                  success={success}
                  isOpen1={isOpen1}
                  pin={pin}
                  setIsOpen1={setIsOpen1}
                  setIsOpen={setIsOpen}
                  // betBtn={betBtn}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {isOpen3 ? (<div className="modal-overlay">
        <WithdrawSuccess
        amountWithdrawn={amountWithdrawn}
        setIsOpen3={setIsOpen3}
        withdrawnSuccessMsg={withdrawnSuccessMsg}
        />
      </div>) : ""}

      {/* {isOpen ? (
            <div>
               
                <div className="modal-overlay">
                <Pin
                  handleCloseModal={handleCloseModal}
                  // error={error}
                  // isOpen={isOpen}
                  // setIsOpen={setIsOpen}
                  // betBtn={betBtn}
                />
              </div>
    
            </div>
          ) : (
            ""
          )} */}

      {/* {isOpen ? (
            <div>
              {error ? (
                <div className="modal-overlay-error">
                  <ErrorCard
                    handleCloseModal={handleCloseModal}
                    error={error}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    betBtn={betBtn}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )} */}
    </div>
  );
};

export default Withdrawal;
