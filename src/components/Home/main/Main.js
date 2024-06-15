import React, { useContext, useState } from "react";
import "./index.css";
import IconCon from "./IconCon";
import Deposit from "../../../assets/home-icons/deposit.svg";
import Withdraw from "../../../assets/home-icons/withdraw.svg";
import About from "../../../assets/svg/about.svg";
import Help from "../../../assets/svg/help.svg";
import Logout from "../../../assets/home-icons/loggout.svg";
import Rewards from "../../../assets/home-icons/rewards.svg";
import Telegram from "../../../assets/home-icons/telegram.svg";
import History from "../../../assets/home-icons/bet history.svg";
import Guide from "../../../assets/svg/guide.svg";
import Soccer from "../../../assets/home-icons/soccer.svg";
import { API } from "../../api-service/api-service";
import Cookies  from "js-cookie";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../APIs/Api";
import RewardCoupon from "../../reward/rewardCoupon";
import Loader from "../../loader/loader";
import fire from "../../../assets/svg/fire.svg";
import HelpDash from "../../help-dash/helpDash";

const Main = () => {
  const navigate = useNavigate();
  const token = Cookies.get("auth-token");
  const { setActiveToken, setHasRunRetrieve, setActivities_g, user_g, setUser_g } = useContext(DataContext);
  const [isOpen_gift, setIsOpen_gift] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = () => {
    const confirmation = window.confirm("Are you sure you want to Logout?");
    //setShowLoader(true);
    if (confirmation) {
      setLoading(true);
      API.logout(token).then((result) => {
        //console.log(result);
        setLoading(false);
        if (result.success) {
          Cookies.remove("auth-token");
          setActiveToken("");
          setActivities_g([]);
          setUser_g([]);
          setHasRunRetrieve(false);
          navigate("/login");
        } else {
          // removeToken("auth-token");
          // setActiveToken("");
          // navigate("/login");
        }
      });
    }
  };
  return (
    <>
      <div className="main container">
        {loading ? <Loader /> : ""}
        <div className="rounded-4 main-div d-flex w-100">
          <IconCon image={Deposit} text="Deposit" link="/deposit" />
          <IconCon image={Withdraw} text="Withdraw" link="/withdraw" />
          <IconCon image={About} text="About" link="/about" />
          <IconCon image={Help} text="Help" onClick={() => setIsHelp(true)}  />
          <IconCon
            image={Guide}
            text="Gift"
            onClick={() => setIsOpen_gift(true)}
          />
        </div>

        <div className="rounded-4 main-div-2 d-flex w-100">
          <IconCon image={Soccer} text="Soccer" link="/anti-score" />
          <IconCon image={History} text="History" link="/history" />
          <IconCon image={Rewards} text="Rewards" link="/invite" />
          <IconCon image={Telegram} text="Telegram" link="https://t.me/+9DiOHiI7Yr8yODk0" />
          <IconCon image={Logout} text="Logout" onClick={handleLogoutClick} />
        </div>
      </div>
      {isOpen_gift ? (
        <div className="modal-overlay-profile">
          <RewardCoupon
            isOpen_gift={isOpen_gift}
            setIsOpen_gift={setIsOpen_gift}
          />
        </div>
      ) : (
        ""
      )}

      {isHelp && <div className="modal-overlay-profile"> <HelpDash isHelp={isHelp}
            setIsHelp={setIsHelp} /></div> }

      
    </>
  );
};

export default Main;
