import React, { useState } from 'react';
import "./index.css";
import Home from "../../../assets/footer-icons/home (1) 1.png";
import Transactions from "../../../assets/footer-icons/payment.png";
import Friends from "../../../assets/footer-icons/users 1.png";
import Profile from "../../../assets/footer-icons/frown 1.svg";
import { Link } from 'react-router-dom';
import Home1 from "../index";
import Profile1 from "../../profile/Profile";
import Transaction from '../../transaction/Transaction';
import Pending from '../../pending/pending';



const Footer = ({activeButton, setActiveButton}) => {

  return (
    <>
    {/* {activeButton === "home"? (<Home1/>): ""}
    {activeButton === "transaction"? (<Transaction/>): ""}
    {activeButton === "profile"? (<Profile1/>): ""}
    {activeButton === "friends"? (<Pending/>): ""} */}
    <div className="fixed-bottom container pb-2 font-footer default_color">
      <div className="d-flex justify-content-around">
      {activeButton === ""? (
        <div onClick={() => setActiveButton("")} className=" ms-3 d-flex flex-column align-items-center">
        <div>
            <img
              src={Home}
              className=""
              style={{ width: "23px" }}
            />
        </div>
        <div className=" font-footer">Home</div>
      </div>
      ) : (
        
        <div onClick={() => setActiveButton("")} className=" ms-3 d-flex flex-column align-items-center">
          <div>
              <img
                src={Home}
                className="opacity-25"
                style={{ width: "23px" }}
              />
          </div>
          <div className="opacity-50 font-footer">Home</div>
        </div>
       
      )}
      {activeButton === "transaction"? (
        <div onClick={() => setActiveButton("transaction")} className=" ms-3 d-flex flex-column align-items-center">
        <div>
          
            <img
              src={Transactions}
              className=""
              style={{ width: "23px" }}
            />
        
        </div>
        <div className=" font-footer">Transaction</div>
      </div>
      ) : (
        
        <div onClick={() => setActiveButton("transaction")} className="ms-3 d-flex flex-column align-items-center">
          <div >
            
          
              <img
                src={Transactions}
                className="opacity-25"
                style={{ width: "23px" }}
              />
           
          </div>
          <div className="opacity-50 font-footer">Transaction</div>
        </div>
      
      )}
      {activeButton === "promotion"? (
        <div onClick={() => setActiveButton("pending")} className=" ms-3 d-flex flex-column align-items-center">
        <div>
         
            <img
              src={Friends}
              className=""
              style={{ width: "23px" }}
            />
        
        </div>
        <div className=" font-footer">Friends</div>
      </div>
      ) : (
       
        <div onClick={() => setActiveButton("promotion")} className="ms-3 d-flex flex-column align-items-center">
          <div>
            
              <img
                src={Friends}
                className="opacity-25"
                style={{ width: "23px" }}
              />
           
          </div>
          <div className="opacity-50 font-footer">Friends</div>
        </div>
        
      )}
      {activeButton === "profile"? (
        <div onClick={() => setActiveButton("profile")} className=" ms-3 d-flex flex-column align-items-center">
        <div>
          
            <img
              src={Profile}
              className=""
              style={{ width: "23px" }}
            />
          
        </div>
        <div className=" font-footer">Profile</div>
      </div>
      ) : (
      
        <div onClick={() => setActiveButton("profile")} className="ms-3 d-flex flex-column align-items-center">
          <div>

              <img
                src={Profile}
                className="opacity-25"
                style={{ width: "23px" }}
              />
            
          </div>
          <div className="opacity-50 font-footer">Profile</div>
        </div>
    
      )}
        

        
      </div>
    </div>
    </>
  );
}

export default Footer