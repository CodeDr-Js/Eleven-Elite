import React, { useState, useEffect } from "react";
import "./ButtonStyles.css"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";

function LoginNav({ activeButton, setActiveButton }) {
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
    <div className="g-sub-color">
      <Link
        className={
          activeButton === "login"
            ? "active button fw-bold"
            : "g-sub-color button text-decoration-none text-light fs-5 opacity-50"
        }
        onClick={() => setActiveButton("login")}
      >
        Login
      </Link>
      <Link
        onClick={() => setActiveButton("signup")}
        className={
          activeButton === "signup"
            ? "active button fw-bold ms-4"
            : "g-sub-color button opacity-50 text-decoration-none ms-4 text-light fs-5"
        }
      >
        Signup
      </Link>
    </div>
  );
}

export default LoginNav;

// document.getElementById("loginBtn").addEventListener("click", function () {
//   this.classList.add("active");
//   document.getElementById("signupBtn").classList.remove("active");
// });

// document.getElementById("signupBtn").addEventListener("click", function () {
//   this.classList.add("active");
//   document.getElementById("loginBtn").classList.remove("active");
// });
