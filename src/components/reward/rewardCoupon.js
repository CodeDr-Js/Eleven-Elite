import React, { useContext, useState } from 'react';
import "./reward.css";
import { useCookies } from 'react-cookie';
import { API } from '../api-service/api-service';
import { useNavigate } from 'react-router-dom';
import Reward from './reward';
import { DataContext } from '../APIs/Api';





const RewardCoupon = ({
    isOpen_gift,
    setIsOpen_gift,
  }) => {
    const {setActivities_g} = useContext(DataContext);
    const navigate = useNavigate();
    const [token, setToken, removeToken] = useCookies(["auth-token"]);
    const [values, setValues] = useState({
      gift_code: "",

    });

    
    
    const [isLoadingPin, setIsLoadingPin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null);
  
  //  console.log(values);
    
    if(!token["auth-token"]){
        removeToken("auth-token");
        navigate("/login")
    }
    const handleCloseModal = () => {
        setSuccess(null)
        setIsLoadingPin(true);
        API.redeem_gift(values, token["auth-token"])
        .then((result) => {
            setIsLoadingPin(false);
            // setSuccess(3);
            console.log(result);
            if(result.success){
                setSuccess(result.amount);
                setActivities_g((prev) => ({
                  ...prev,
                  wallet: {
                    bal_info: {
                      bal: result.activities.wallet.bal_info.bal
                    }
        
                  }
                  
        
                }))
               
            } else {
                alert(result.message)
            }
        })
        .catch((err) => console.log(err))

    }
  
    const handleCloseModal1 = (e) => {
      setIsOpen_gift(false);
      setSuccess(null)
      //  if (e.target.classList.contains("modal-overlay-error")) {
      //    setIsOpen(false);
      //  }
      // const newBetBtn = document.getElementById(betBtn);
      // if (Number(values.amount) >= 10) {
      //   newBetBtn.classList.remove("disabled");
      // }
    };

    
  
    // const handleCloseModule2 = () => {
    //   setIsOpen1(false)
    //   setIsOpen(false);
      
    // }

   
    //console.log(success);
    return (
    <>
        {success ? (<Reward bonus={success} success={success} setLoading={setSuccess}/>) : ""}

      <div className="pin-div-1 ">
        <div className='d-flex w-100 bg-transparent '>
        <div className='w-100 bg-transparent '></div>

        <i
          id=""
          onClick={handleCloseModal1}
          className="fa fa-close fa-fw fa-lg opacity-50 ps-5 bg-transparent ms-auto"
        ></i>
        </div>
        <p className="bet-color text-center">Gift code</p>

        <div className='d-flex pb-1'>
        <input
          className="form-control w-100 form-password-1 g-sub-color"
          type="text" 
          //type="password"
          placeholder="Enter your gift code"
          name="gift_code"
          required
          onChange={(e) =>
            setValues({ ...values, gift_code: e.target.value })
          }
        />

        </div>
  
        {/* <small>Minimum 4 digits!</small> */}
        {isLoadingPin ? (
          <button className="btn btn-primary w-100 mt-2 shadow-lg disabled opacity-50 text-warning p-2">
            Loading...
          </button>
        ) : (
          <button
            onClick={handleCloseModal}
            className={values.gift_code === "" && values.gift_code=== "" ? "btn btn-primary w-100 mt-2 shadow-lg disabled opacity-50 p-2": "btn btn-primary w-100 mt-2 shadow-lg p-2" }
          >
            Continue
          </button>
        )}
  
        {/* {isOpen1 ? (
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
        )} */}
        
      </div>
    </>
    );
  };

export default RewardCoupon