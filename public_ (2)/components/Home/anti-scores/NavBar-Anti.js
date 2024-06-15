import React from "react";
import NavBar_Logo from "../../NavBar/NavBar_Logo";
import Market from "../../../assets/images/0-statistics-of-inspection-results-48.png";
import "./index.css";
import IncentiveFund from "../../../assets/images/campus-3-16.png";
import "./index.css";
import ProtectivePlan from "../../../assets/images/eye-47.png";
import "./index.css";
import "../../largeScreen/largeHeader.css";

const NavBar_Anti = () => {
  return (
    <div className="fixed-top container">
      <NavBar_Logo />
      <div className="d-flex g-main bg-transparent">
        <div className="market-main-div bg-transparent">
          <div className="btn btn-primary market-div">
            <a href="" className="g-main-sp d-flex bg-primary">
              <div className="me-1 bg-primary">
                <img
                  className="bg-primary market-icon"
                  src={Market}
                  alt="market-logo"
                />
              </div>
              <div className=" g-main-sp bg-primary fw-bold">Market</div>
            </a>
          </div>
        </div>

        <div className="market-main-div g-main-sp bg-transparent ">
          <div className="btn g-sub-color market-div">
            <a href="" className="d-flex g-sub-color g-main-sp">
              <div className="me-1 g-sub-color">
                <img
                  className="g-sub-color market-icon"
                  src={IncentiveFund}
                  alt="IncentiveFund-logo"
                />
              </div>
              <div className="g-sub-color incensive-fund g-main-sp">
                Incentive  Fund
              </div>
            </a>
          </div>
        </div>

        <div className="market-main-div bg-transparent">
          <div className="btn g-sub-color market-div">
            <a href="" className=" g-main-sp d-flex g-sub-color">
              <div className="me-1 g-sub-color">
                <img
                  className="g-sub-color market-icon"
                  src={ProtectivePlan}
                  alt="ProtectivePlan-logo"
                />
              </div>
              <div className=" g-main-sp g-sub-color incensive-fund">
                Protection Plan
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar_Anti;
