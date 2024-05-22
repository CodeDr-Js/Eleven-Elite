import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "./index.css";
// import { Link } from "react-router-dom";
// import HistoryNav from "./HistoryNav/historyNav";
// import HistoryCard from "./historyCard";
// import HistoryCardSettled from "./historyCard-settled";
// import dollar from "../../assets/icons/dollar.png";
// import tether from "../../assets/icons/tether.png";
// import usdt from "../../assets/icons/usdt.png";
// import usd from "../../assets/icons/usd.png";
// import usd1 from "../../assets/icons/usd1.png";
// import { DataContext } from "../APIs/Api";
// import { useContext } from "react";

const ArrowNav = ({ name }) => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="container">
      <div className="ms-1 d-flex pt-3  ">
        <div onClick={goBack} className="wg-card">
          <img src={Arrow} alt="arrow-back" className="nav-arrow" />
        </div>
        <div className=" d-flex justify-content-center ms-5 ps-5 wg-card ">
          <h2 className="text-center fs-2 ms-3">{name}</h2>
        </div>

        {/* <div className="ms-auto wg-card d-flex"> */}
        {/* <div>
            <img
              src={dollar}
              alt="Logo"
              className=""
              style={{ width: "33px" }}
            />
          </div> */}

        {/* {!Array.isArray(activities_g) ? (
            <p className="ps-2 pt-1 fw-bold ">
              $ {activities_g.wallet.bal_info.bal.toFixed(2)}
            </p>
          ) : (
            ""
          )} */}
        {/* <p className='ps-2 pt-1 fw-bold '>$ 30000</p> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ArrowNav;
