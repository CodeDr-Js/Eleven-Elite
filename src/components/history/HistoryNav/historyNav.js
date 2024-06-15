import React, { useState, useEffect } from "react";
import "./ButtonStyles.css"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";
import "../../color/color.css";

function HistoryNav({ activeButton, setActiveButton }) {
  // const navigate = useNavigate();
  // const [activeButton, setActiveButton] = useState("login"); // State to track active button

  // const handleSubmit1 = (e) => {
  //   e.preventDefault();
  //   navigate("/login");
  //   setActiveButton(1);
  // };
  // const handleSubmit2 = (e) => {
  //   e.preventDefault();
  //   setActiveButton(2);

  // };

  // const [activeButton, setActiveButton] = useState(null); // State to track active button

  // useEffect(() => {
  //   if (activeButton === "login") {
  //     navigate("/login");
  //   } else if (activeButton === "signup") {
  //     navigate("/register");
  //   }
  // }, [activeButton]);

  // const handleButtonClick = (button, e) => {
  //   e.preventDefault();
  //   setActiveButton(button); // Update active button state
  // };

  return (
    // <div>
    //   <button
    //     type="button"
    //     className={activeButton === "login" ? "active" : ""}
    //     onClick={(e) => handleButtonClick("login", e)}
    //   >
    //     Login
    //   </button>
    //   <button
    //     type="button"
    //     className={activeButton === "signup" ? "active" : ""}
    //     onClick={(e) => handleButtonClick("signup", e)}
    //   >
    //     Signup
    //   </button>
    // </div>
    <div className="main-color mt-2 d-flex">
      <div className="main-color w-50 text-center">
        <button
          className={
            activeButton === "unsettled"
              ? "active button fw-bold fs-5 w-g"
              : "main-color button text-decoration-none text-light fs-5 opacity-50"
          }
          onClick={() => setActiveButton("unsettled")}
        >
          Unsettled
        </button>
      </div>
      <div className="line"></div>
      <div className="main-color w-50 text-center">
        <button
          onClick={() => setActiveButton("settled")}
          className={
            activeButton === "settled"
              ? "active button fw-bold  fs-5 w-g"
              : "main-color button opacity-50 text-decoration-none ms-4 text-light fs-5"
          }
        >
          Settled
        </button>
      </div>
    </div>
  );
}

export default HistoryNav;

// document.getElementById("loginBtn").addEventListener("click", function () {
//   this.classList.add("active");
//   document.getElementById("signupBtn").classList.remove("active");
// });

// document.getElementById("signupBtn").addEventListener("click", function () {
//   this.classList.add("active");
//   document.getElementById("loginBtn").classList.remove("active");
// });
