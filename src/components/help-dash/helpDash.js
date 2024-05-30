import React, { useState } from "react";
import "./help.css";
import { useNavigate } from "react-router-dom";
import support1 from "../../assets/svg/support1.svg";
import support2 from "../../assets/svg/support2.svg";
import support3 from "../../assets/svg/support3.svg";
import telegram1 from "../../assets/svg/telegram (1).svg";
import telegram from "../../assets/svg/telegram.svg";
import whatsapp from "../../assets/svg/whatsapp.svg";
import whatsapp1 from "../../assets/svg/whatsapp (2).svg";

const HelpDash = ({isHelp, setIsHelp }) => {
  const navigate = useNavigate();

  //const [token,setToken, removeToken] = useCookies(["auth-token"]);

  const close = () => {
    // window.history.back();
    setIsHelp(false)
  };

  //Toggle Modal

  return (
    <div className="error-div-help main-color container">
      <div className="bg-transparent d-flex">
      <div className="bg-transparent"></div>
      <i onClick={close} className="fa fa-close ms-auto bg-danger"></i>
      </div>
      <p className="bg-transparent fw-bold">Live Support</p>
      <div className=" rounded-2 main-color1 pt-3 ps-3">
        <div className="bg-transparent d-flex ">
          <div className="bg-transparent">
            <img
              className="bg-transparent"
              src={support1}
              alt="support1"
              style={{ width: "30px" }}
            />
          </div>
          <p className="bg-transparent ps-3 pad">Support 1</p>
        </div>
        <div className="bg-transparent d-flex ">
          <div className="bg-transparent">
            <img
              className="bg-transparent"
              src={support2}
              alt="support1"
              style={{ width: "30px" }}
            />
          </div>
          <p className="bg-transparent ps-3 pad">Support 2</p>
        </div>
        <div className="bg-transparent d-flex ">
          <div className="bg-transparent">
            <img
              className="bg-transparent"
              src={support3}
              alt="support1"
              style={{ width: "30px" }}
            />
          </div>
          <p className="bg-transparent ps-3 pad">Support 3</p>
        </div>

   
      </div>

      <div className="bg-transparent mt-5 ">
        <p className="bg-transparent fw-bold">Follow us</p>
        <div className="main-color1 p-3 d-flex rounded-2 ">
          <div className="bg-transparent pe-4">
          <img
              className="bg-transparent"
              src={telegram1}
              alt="telegram"
              style={{ width: "50px" }}
            />
          </div>
          <div className="bg-transparent">
          <img
              className="bg-transparent"
              src={whatsapp1}
              alt="telegram"
              style={{ width: "50px" }}
            />
          </div>
          
        </div>
      </div>

      <div className="bg-transparent">
        <p className="bg-transparent fw-bold mt-5">Contact us</p>
        <div className="main-color1 p-3 d-flex rounded-2">
          <div className="bg-transparent pe-4">
          <img
              className="bg-transparent"
              src={telegram}
              alt="telegram"
              style={{ width: "50px" }}
            />
          </div>
          <div className="bg-transparent">
          <img
              className=" rounded-circle"
              src={whatsapp1}
              alt="telegram"
              style={{ width: "52px" }}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HelpDash;