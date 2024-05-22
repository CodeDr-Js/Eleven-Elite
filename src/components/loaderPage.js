import React from "react";
import "./LogoLoader.css"; // Import CSS for styling (if needed)
import Logo from "../assets/images/Logo.png";
import ball from "../assets/images/ball.png";
function LogoLoader() {
  return (
    <div className="loader-container">
      {/* Replace 'logo.svg' with the path to your company logo */}
      <img src={Logo} alt="Company Logo" className="logo" />
      <div className="logo-text">
        <h5>EEF</h5>
        <span>
          <small>Eleven Elites Football</small>
        </span>
      </div>
      <img className="loader" src={ball}/>
    </div>
  );
}

export default LogoLoader;
