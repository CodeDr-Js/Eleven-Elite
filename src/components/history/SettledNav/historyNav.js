import React, { useState, useEffect } from "react";
import "./ButtonStyles2.css"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";
import "../../color/color.css";

function SettleNav({ activeButton, setActiveButton }) {
  return (
    <div className="mt-2 ps-4 pe-4 d-flex justify-content-between">
      <div className="text-center wg">
        <button
          className={
            activeButton === "all"
              ? "active1 wg-button fw-bold"
              : "u-color rounded-5 wg-button text-decoration-none text-light opacity-50 wg-text wg-btn"
          }
          onClick={() => setActiveButton("all")}
        >
          All
        </button>
      </div>
      <div className="text-center wg">
        <button
          className={
            activeButton === "win"
              ? "active1 wg-button fw-bold"
              : "u-color rounded-5 wg-button text-decoration-none text-light opacity-50 wg-text wg-btn"
          }
          onClick={() => setActiveButton("win")}
        >
          win
        </button>
      </div>
      <div className="text-center wg">
        <button
          className={
            activeButton === "lose"
              ? "active1 wg-button fw-bold"
              : "u-color rounded-5 wg-button text-decoration-none text-light opacity-50 wg-text wg-btn"
          }
          onClick={() => setActiveButton("lose")}
        >
          Lose
        </button>
      </div>
      <div className="text-center wg">
        <button
          className={
            activeButton === "cancelled"
              ? "active1 wg-button fw-bold"
              : "u-color rounded-5 wg-button text-decoration-none text-light opacity-50 wg-text wg-btn"
          }
          onClick={() => setActiveButton("cancelled")}
        >
          Cancelled
        </button>
      </div>

      
    </div>
  );
}

export default SettleNav;
