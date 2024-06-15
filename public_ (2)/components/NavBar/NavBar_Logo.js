import React, { useContext } from 'react';
import Logo from "../../assets/images/Logo.png";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "./index.css";
import { Link } from 'react-router-dom';
import dollar from "../../assets/icons/dollar.png"
import tether from "../../assets/icons/tether.png"
import usdt from "../../assets/icons/usdt.png"
import usd from "../../assets/icons/usd.png"
import usd1 from "../../assets/icons/usd1.png"
import { DataContext } from '../APIs/Api';







const NavBar_Logo = () => {
  const {activities_g} = useContext(DataContext);

  const goBack = () => {
    window.history.back()
    
  };

  


  return (
    <div onClick={goBack} className="container-sm ms-1 d-flex mt-2 ">
      <div>
       
          <img src={Arrow} alt="arrow-back" className="nav-arrow" />
       
      </div>
      {/* <a className="ms-auto" href="/">
        <img src={Logo} alt="Logo" className="" style={{ width: "40px" }} />
      </a> */}
      <div className="ms-auto wg-card d-flex" >
            <div>
            <img src={dollar} alt="Logo" className="" style={{ width: "33px" }} />
            </div>

            {!Array.isArray(activities_g) ? (<p className='ps-2 pt-1 fw-bold '>$  {activities_g.wallet.bal_info.bal.toFixed(2)}</p>) : "" }
          {/* <p className='ps-2 pt-1 fw-bold '>$ 30000</p> */}

          </div>
   
    </div>
  );
}

export default NavBar_Logo


 
