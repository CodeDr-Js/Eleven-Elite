import React, { useState } from 'react';
import "./change_pin.css";
import { API } from '../api-service/api-service';
import { useCookies } from 'react-cookie';
    


const ChangePin = ({
    isOpen_pin,
    setIsOpen_pin,
  }) => {
    const [token] = useCookies(["auth-token"])
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [values, setValues] = useState({
      old_pin: "",
      new_pin: ""
    });
    const [isLoadingPin, setIsLoadingPin] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
  
    console.log(values);
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const handleCloseModal = () => {
        setIsLoadingPin(true);
        API.changePin(values, token["auth-token"])
        .then((result) => {
            setIsLoadingPin(false);
            if(result.success){
                alert(result.message)
                
            } else {
                alert(result.message)
            }
       //     console.log(result);
        })
        .catch((err) => console.log(err))
    }
  
    const handleCloseModal1 = (e) => {
      setIsOpen_pin(false);
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

    return (
      <div className="pin-div ">
        <div className='d-flex w-100 bg-transparent '>
        <div className='w-100 bg-transparent '></div>

        <i
          id=""
          onClick={handleCloseModal1}
          className="fa fa-close fa-fw fa-lg opacity-50 ps-5 bg-transparent ms-auto"
        ></i>
        </div>
        <p className="bet-color text-center">Change pin</p>
        <div className='bg-transparent d-flex'>

        <i
          id="key"
          className="fa fa-key fa-fw fa-lg opacity-50 position-absolute"
        ></i>
        <input
          className="form-control w-100 form-password g-sub-color mb-2"
          type={passwordVisible ? "text" : "password"}
          //type="password"
          placeholder="Enter your old pin"
          name="old_pin"
          required
          onChange={(e) =>
            setValues({ ...values, old_pin: e.target.value })
          }
        />
        <i
          onClick={togglePasswordVisibility}
          id="togglePass"
          className={passwordVisible ? "fas fa-eye-slash bg-transparent" : "fas fa-eye bg-transparent"}
          style={{ cursor: "pointer" }}
        ></i>
        </div>


        <div className='d-flex'>
        <i
          id="key"
          className="fa fa-key fa-fw fa-lg opacity-50 position-absolute"
        ></i>
        <input
          className="form-control w-100 form-password g-sub-color"
          type={passwordVisible ? "text" : "password"}
          //type="password"
          placeholder="Enter your new pin"
          name="new_pin"
          required
          onChange={(e) =>
            setValues({ ...values, new_pin: e.target.value })
          }
        />
        <i
          onClick={togglePasswordVisibility}
          id="togglePass"
          className={passwordVisible ? "fas fa-eye-slash bg-transparent" : "fas fa-eye bg-transparent"}
          style={{ cursor: "pointer" }}
        ></i>

        </div>
  
        {/* <small>Minimum 4 digits!</small> */}
        {isLoadingPin ? (
          <button className="btn btn-primary w-100 mt-2 shadow-lg disabled opacity-50 text-warning p-3">
            Loading...
          </button>
        ) : (
          <button
            onClick={handleCloseModal}
            className={values.new_pin === "" || values.old_pin === "" ? "btn btn-primary w-100 mt-2 shadow-lg disabled opacity-50 p-3": "btn btn-primary w-100 mt-2 shadow-lg p-3" }
          >
            Change pin
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
    );
  };

export default ChangePin