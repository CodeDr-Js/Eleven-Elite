import React, { useState, useEffect } from "react";
import "./ButtonStylesP.css"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";
import "../../color/color.css";

function SettleNav({ activeButton, setActiveButton }) {
  return (
    <div className="mt-2 ps-4 pe-4 d-flex justify-content-between">
      <div className="text-center wg">
        <button
          className={
            activeButton === "level-1"
              ? "active1 wg-button fw-bold"
              : "u-color rounded-5 wg-button text-decoration-none text-light opacity-50 wg-text wg-btn"
          }
          onClick={() => setActiveButton("level-1")}
        >
          Level 1
        </button>
      </div>
      <div className="text-center wg">
        <button
          className={
            activeButton === "level-2"
              ? "active1 wg-button fw-bold"
              : "u-color rounded-5 wg-button text-decoration-none text-light opacity-50 wg-text wg-btn"
          }
          onClick={() => setActiveButton("level-2")}
        >
          Level 2
        </button>
      </div>
      <div className="text-center wg">
        <button
          className={
            activeButton === "level-3"
              ? "active1 wg-button fw-bold"
              : "u-color rounded-5 wg-button text-decoration-none text-light opacity-50 wg-text wg-btn"
          }
          onClick={() => setActiveButton("level-3")}
        >
          Level 3
        </button>
      </div>
     

      
    </div>
  );
}

export default SettleNav;
