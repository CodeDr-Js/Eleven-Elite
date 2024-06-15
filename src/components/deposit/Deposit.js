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
//import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { API } from "../api-service/api-service";
import QRCodeGenerator from "../qr-code/qrCode";
import "../fontawesome/css/all.css";


const Deposit = () => {
  const { setActiveToken, activities_g, setActivities_g, result, setResult,getUserData, hasRunRetrieve } =
    useContext(DataContext);
   // console.log(activities_g);
  const navigate = useNavigate();
  const token = Cookies.get("auth-token");
  const [message, setMessage] = useState();
  const [reloadTriggered, setReloadTriggered] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  //console.log(activities_g);
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Wallet address successfully copied to clipboard");
      })
      .catch((err) => {
        setMessage("Failed to copy text");
        console.error("Failed to copy text: ", err);
      });
  };

  
  useEffect(()=> {
    if(!hasRunRetrieve){
      getUserData()
    }
  }, [])


 
  

  const checkPayaddress = () => {
  
    // const token1 = token["auth-token"];
    //console.log(typeof activities_g.wallet.pay_address);
    // setTimeout(() => {
    //  console.log(activities_g);
      if (!Array.isArray(activities_g) && !activities_g.wallet.pay_address) {
        setIsOpen(false);
      //  console.log("loading... Not object");
        //setReloadTriggered(true);
        API.retrieveData(token)
          .then((result) => {
        //    console.log(result);
            setIsOpen(true)
            if (result.success || result.message === "success") {
              setResult(result);
              setActivities_g(result.activities);
            } else if (!result.success) {
          //    console.log("removing token");
              // removeToken("auth-token");
              Cookies.remove("auth-remove")
            }
          })
          .catch((err) => console.log(err));
      } else {
       // console.log("Pay address is found in useContext result");
      }
    // }, 1000);
  };

  useEffect(() => {
    checkPayaddress();
  }, []);

  const checkToken = () => {
    if (token) {
     // console.log("token", token1);
      setActiveToken(token);
    } else {
      setActiveToken("");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);

  setTimeout(() => {
    if (message) {
      setMessage("");
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
        <h3 className="text-center w-100">Deposit</h3>
      </div>

      <div className="mt-4">
        <div className="">
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

          <div className="mt-4">
            <p className="fw-bold">Your USDT deposit address</p>
            <p className="text-justify opacity-50">
              This address accepts only TRC20 network, transferring here any
              other coin will result to fund loss. Copy token address here:
            </p>
          </div>

          {message ? (
            <p className="alert alert-success text-uppercase f-italic">
              {message}
            </p>
          ) : (
            ""
          )}
          <div
            className="d-flex main-color rounded-3 shadow-lg"
            style={{ height: "55px" }}
          >
            {!Array.isArray(activities_g) && isOpen ? (
               <p className="ps-3 pt-3 main-color">
               {activities_g.wallet.pay_address  
}
              </p>
            ) : ( <p className="ps-3 pt-3 main-color text-warning">
            Loading...
           </p>)}
            
            <i
              onClick={() => handleCopy(activities_g.wallet.pay_address 
              )}
              id="envelope"
              className="fa fa-copy fa-fw fa-lg opacity-50 ms-auto me-3 mt-4"
            ></i>
          </div>

          <div className="d-flex justify-content-center w-100 mt-3">
            <QRCodeGenerator
              text={!Array.isArray(activities_g) ? activities_g.wallet.pay_address  : ""}
            />
          </div>

          <div
            className="d-flex main-color rounded-3 shadow-lg mt-3"
            style={{ height: "55px" }}
          >
            <div className="main-color">
              <img />
            </div>
            <i
              id="envelope1"
              className="fa fa-exclamation-triangle fa-fw fa-lg opacity-50 text-warning main-color"
            ></i>
            <p className="main-color pt-3 w-100 text-center text-warning">
              The minimum deposit amount is 10 USDT.
            </p>
          </div>

          <div className="mt-4">
            <div className="opacity-50 pe-2 text-justify fst-italic bg-transparent">
            <span className="text-warning ">NOTE:</span> 
            <ol>
              <li className="pb-2 pt-1"> <small> Please do not deposit any assets other than TRC20-USDT to the above address, as the assets will be irretrievable. The minimum recharge amount is 10 USDT, and recharges below the minimum amount will not be credited and cannot be refunded.</small></li>
              <li className="pb-2 "><small>Your recharge address will change frequently after a success transaction and cannot be reused for deposits. In case of any changes, we will notify you through website announcements or emails. Please ensure the security of your computer and browser to prevent information tampering and leakage.</small></li>
              <li> <small>After you deposit to the above address, it requires confirmation from the entire network nodes. The funds will be credited after 1 network confirmation, and you can withdraw them after 1 network confirmation tips</small></li>
            </ol>
          
            </div>
            {/* <p className="opacity-50">
              Maximum deposit amount is not limited. EEF doesn't have any fee
              for USDT deposits. USDT deposits may take some time related to the
              network hash rate.
            </p> */}
          </div>
        </div>
      </div>
      
      
                
    </div>
  );
};

export default Deposit;
