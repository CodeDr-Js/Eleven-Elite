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
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../APIs/Api";
import RewardCoupon from "../../reward/rewardCoupon";
import Loader from "../../loader/loader";
import fire from "../../../assets/svg/fire.svg"

const Main = () => {
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["auth-token"]);
  const { setActiveToken } = useContext(DataContext);
  const [isOpen_gift, setIsOpen_gift] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = () => {
    const confirmation = window.confirm("Are you sure you want to Logout?");
    //setShowLoader(true);
    if (confirmation) {
      setLoading(true);
      API.logout(token["auth-token"]).then((result) => {
        //console.log(result);
        setLoading(false);
        if (result.success) {
          removeToken("auth-token");
          setActiveToken("");
          navigate("/login");
        } else {
          removeToken("auth-token");
          setActiveToken("");
          navigate("/login");
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
          <IconCon image={Help} text="Help" link="/help" />
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
          <IconCon image={Telegram} text="Telegram" link="https://t.me/+KLqcImLckXAxMmZk" />
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

      
    </>
  );
};

export default Main;
