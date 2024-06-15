import React, { useContext, useEffect, useState } from "react";
import Arrow from "../../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "../../NavBar/index.css";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../APIs/Api";
import dollar from "../../../assets/icons/dollar.png"
import tether from "../../../assets/icons/tether.png"
import usdt from "../../../assets/icons/usdt.png"
import usd from "../../../assets/icons/usd.png"
import usd1 from "../../../assets/icons/usd1.png"
const OddNav = () => {

  const {activities_g} = useContext(DataContext);
  
  const goBack = () => {
    window.history.back();
  };
  
  // const fetchOdd = async () => {
  //   try {
  //     // Fetch data for the current ID using Axios
  //     const options = {
  //       method: "GET",
  //       url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //       params: { fixture: id.toString() },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
  //         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //       },
  //     };

  //     const response = await axios.request(options);

  //     // Extract data from the response
  //     const data = response.data;
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //fetchOdd();

  return (
    <div className="fixed-top container ps-3 d-flex odd-nav-div pt-2 ">
      <div onClick={goBack} >
          <img src={Arrow} alt="arrow-back" className="nav-arrow-2" />
      </div>

      <div className="ms-auto wg-card d-flex" >
            <div>
            <img src={dollar} alt="Logo" className="" style={{ width: "33px" }} />
            </div>

            {!Array.isArray(activities_g) ? (<p className='ps-2 pt-1 fw-bold '>$  {activities_g.wallet.bal_info.bal.toFixed(2)}</p>) : "" }
           {/* <p className='ps-2 pt-1 fw-bold '>$ 30000</p> */}
          </div>
    </div>
  );
};

export default OddNav;
