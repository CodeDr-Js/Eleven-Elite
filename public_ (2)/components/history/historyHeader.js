import React, { useState } from 'react'
import Logo from "../../assets/images/Logo.png";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "./index.css";
import { Link } from "react-router-dom";
import HistoryNav from './HistoryNav/historyNav';
import HistoryCard from './historyCard';
import HistoryCardSettled from './historyCard-settled';
import dollar from "../../assets/icons/dollar.png"
import tether from "../../assets/icons/tether.png"
import usdt from "../../assets/icons/usdt.png"
import usd from "../../assets/icons/usd.png"
import usd1 from "../../assets/icons/usd1.png"
import { DataContext } from '../APIs/Api';
import { useContext } from 'react';






const HistoryHeader = ({loading, settled, openBet, setOpenBet, setSettled, activities, setActivities, setActivities_g }) => {
  setTimeout(() => {
    
  }, 2000);
  const {activities_g} = useContext(DataContext);
  const goBack = () => {
    window.history.back();
  };
 
  //console.log(activities_g.wallet.bal_info.bal);
  const [activeButton, setActiveButton] = useState("unsettled");
  return (
    <>
      <div className="fixed-top container">
        <div className="container ms-1 d-flex pt-3  ">
          <div onClick={goBack} className='wg-card'>
         
              <img src={Arrow} alt="arrow-back" className="nav-arrow" />
  
          </div>
          <div className=" d-flex justify-content-center ms-5 ps-5 wg-card ">
            <h2 className="text-center fs-2 ms-3">History</h2>
          </div>
          <div className="ms-auto wg-card d-flex" >
            <div>
            <img src={dollar} alt="Logo" className="" style={{ width: "33px" }} />
            </div>

            {!Array.isArray(activities_g) ? (<p className='ps-2 pt-1 fw-bold '>$  {activities_g.wallet.bal_info.bal.toFixed(2)}</p>) : "" }
          {/* <p className='ps-2 pt-1 fw-bold '>$ 30000</p> */}

          </div>
        </div>
        <div>
          <HistoryNav
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
      </div>
      
      <div className='history-card-main-div'>
        {activeButton === "unsettled" ? <HistoryCard loading={loading} openBet={openBet} setOpenBet={setOpenBet} setSettled={setSettled} setActivities={setActivities} activities={activities} setActivities_g={setActivities_g}/>  : ""}
        {activeButton === "settled" ? <HistoryCardSettled loading={loading} settled={settled} activities={activities} setActivities_g={setActivities_g}/> : ""}
      </div>
    </>
  );
};

export default HistoryHeader