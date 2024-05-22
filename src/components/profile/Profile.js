import React, { useContext, useEffect, useState } from "react";
import ArrowNav from "../arrowNav/ArrowNav";
import "../color/color.css";
import "../fontawesome/css/all.css";
import "./index.css";
import dollar from "../../assets/icons/dollar.png";
import tether from "../../assets/icons/tether.png";
import usdt from "../../assets/icons/usdt.png";
import usd from "../../assets/icons/usd.png";
import usd1 from "../../assets/icons/usd1.png";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { checkToken } from "../checkToken/chechToken";
import trans from "../../assets/svg/send 1.svg";
import BetHis from "../../assets/svg/life-buoy (2).svg";
import promotion from "../../assets/svg/trello.svg";
import market from "../../assets/svg/home 1.svg";
import changePass from "../../assets/svg/lock (1).svg";
import changePin from "../../assets/svg/shield.svg";
import help from "../../assets/svg/help-circle (1).svg";
import frown from "../../assets/svg/frown.svg";
import redeemGift from "../../assets/svg/gift (5) 1.svg";
import notification from "../../assets/svg/bell (1).svg";
import { DataContext } from "../APIs/Api";
import { API } from "../api-service/api-service";
import { host, hostname , origin} from "../search_dir/search_dir";
import Loader from "../loader/loader";
import ChangePassword from "../changePins/changePassword";
import ChangePin from "../changePins/changePin";
import RewardCoupon from "../reward/rewardCoupon";
import Footer from "../Home/anti-scores/footer";

//console.log(origin);

const hostName = `${origin}/register/?invited=`;

const Profile = () => {
  const {
    data,
    allData,
    activeToken,
    activities_g,
    setActivities_g,
    setActiveToken,
    activities,
    result,
    user_g,
  } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen_pin, setIsOpen_pin] = useState(false);
  const [isOpen_gift, setIsOpen_gift] = useState(false);
  const [activeButton, setActiveButton] = useState("profile")

  //console.log("Activities global is:", activities_g, "resull is:", result, "user is:", user_g );
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["auth-token"]);

  useEffect(() => {
    setLoadings(true);
    if (!Array.isArray(activities_g)) {
      setLoadings(false);
    }
  }, [activities_g]);

  useEffect(() => {
    const token1 = token["auth-token"];
    if (token1) {
      //console.log("Your token is", token1);
      setActiveToken(token1);
    } else {
      navigate("/login");
      setActiveToken("");
    }
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    API.logout(token["auth-token"]).then((result) => {
      setIsLoading(false);
      console.log(result);
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
  };

  const [message, setMessage] = useState();

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Wallet address successfully copied to clipboard");
      })
      .catch((err) => {
        setMessage("Failed to copy text");
        console.error("Failed to copy text: ", err);
      });
  };

  const handleLink = (link) => {
    navigate(link);
  };

  const leagueShortName = (name) => {
    if (name.length > 30) {
      return name.toString().substr(0, 30) + "...";
    } else {
      return name;
    }
  };

  setTimeout(() => {
    if (message) {
      setMessage("");
    }
  }, 3000);
  return (
    <>
    {activeButton === "profile"?(<div className="mb-5 pb-2">
      <div className="fixed-top">
        <ArrowNav name="Profile" />
      </div>
      {loadings ? <Loader /> : ""}

      <div className="container mt-5 pt-2 ">
        <div className="d-flex ">
          <div className=" mt-1 ">
            <img
              src="https://s.sporty.net/common/avatar/12.png"
              alt="logo-profile"
              className="rounded-circle bg-primary mt-2"
              style={{ width: "60px", height: "60px" }}
            />
          </div>

          <small className="ms-auto pt-3">Hi {user_g.username}</small>
        </div>

        <div className="mt-3  ">
          {message ? (
            <p className="alert alert-success text-uppercase f-italic">
              {message}
            </p>
          ) : (
            ""
          )}
          <div
            className="d-flex main-color rounded-5 mt-2 shadow-lg opacity-50"
            style={{ height: "44px" }}
          >
            {!Array.isArray(activities_g) ? (
              <p className="bg-transparent acct-info-text pt-3 ps-2">
                {hostName}
                {activities_g.referral.url}
              </p>
            ) : (
              ""
            )}
            <p className="ps-3 pt-2 bg-transparent"></p>

            <i
              onClick={() => handleCopy(hostName + activities_g.referral.url)}
              id="envelope"
              className="fa fa-copy fa-fw fa-lg opacity-50 ms-auto me-3 mt-4"
            ></i>
          </div>
          <div className="copy-notice-div ps-3 pt-2">
            <small className="copy-notice">
              Click the copy icon to invite a friend
            </small>
          </div>
        </div>

        <div
          className="d-flex main-color rounded-3 mt-4 shadow-lg p-3 "
          style={{ height: "55px" }}
        >
          <p className="bg-transparent fw-bold ">WALLET BAL:</p>
          <div className="bg-transparent d-flex ms-auto">
            <div className="bg-transparent">
              <img
                src={tether}
                alt="Tether"
                className="bg-transparent me-2 "
                style={{ width: "30px" }}
              />
            </div>
            {!Array.isArray(activities_g) ? (
              <p className="bg-transparent fw-bold">
                $ {activities_g.wallet.bal_info.bal.toFixed(2)}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="mt-4 d-flex">
          <Link
            to="/deposit"
            className="w-50 me-1 deposit-btn text-decoration-none text-center"
          >
            DEPOSIT
          </Link>
          <Link
            to="/withdraw"
            className="w-50 ms-1 withdraw-btn text-decoration-none text-center"
          >
            WITHDRAW
          </Link>
        </div>

        <div className=" mt-4  ">
          <p className="bg-transparent">Bet Statistics</p>
          <div
            className="d-flex main-color rounded-3 shadow-lg pt-1  "
            style={{ height: "55px" }}
          >
            <div className="bg-transparent w-100 d-flex justify-content-around">
              <div className="bg-transparent d-flex flex-column align-items-center">
                <small className="bg-transparent opacity-50">Total won</small>

                {!Array.isArray(activities_g) ? (
                  <p className="bg-transparent">
                    {activities_g.bet.winning_record.total.won.length}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="bg-transparent">
                <i
                  id="envelop"
                  className="fa fa-chevron-right bg-transparent fa-fw fa-lg icon-color mt-4"
                ></i>
                <i
                  id="envelop1"
                  className="fa fa-chevron-right icon-color  bg-transparent fa-fw  fa-lg mt-4"
                ></i>
              </div>

              <div className="bg-transparent d-flex flex-column align-items-center">
                <small className="bg-transparent opacity-50">Total lost</small>
                {!Array.isArray(activities_g) ? (
                  <p className="bg-transparent">
                    {activities_g.bet.winning_record.total.loss.length}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="bg-transparent">
                <i
                  id="envelop"
                  className="fa fa-chevron-right bg-transparent icon-color fa-fw fa-lg mt-4"
                ></i>
                <i
                  id="envelop1"
                  className="fa fa-chevron-right fa-fw bg-transparent  icon-color fa-lg mt-4"
                ></i>
              </div>

              <div className="bg-transparent d-flex flex-column align-items-center">
                <small className="bg-transparent opacity-50">Profit</small>
                {!Array.isArray(activities_g) ? (
                  <p className="bg-transparent">
                    $ {activities_g.bet.winning_record.profit.won.toFixed(2)}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p>Account Info</p>
          <div className="main-color rounded-4 pt-3 ps-3 pe-3 pb-3">
            <div className="bg-transparent d-flex acct-info-div">
              <p className="bg-transparent w-50">Full Name</p>
              <p className="bg-transparent w-50 acct-info-text wrap-text">
                {user_g.fullname}
              </p>
            </div>
            <div className="bg-transparent d-flex acct-info-div pt-2">
              <p className="bg-transparent w-50">Username</p>
              <p className="bg-transparent w-50 acct-info-text wrap-text">
                {user_g.username}
              </p>
            </div>
            <div className="bg-transparent d-flex acct-info-div pt-2">
              <p className="bg-transparent w-50">Email</p>
              <p className="bg-transparent w-50 acct-info-text wrap-text">
                {user_g.email}
              </p>
            </div>
            <div className="bg-transparent d-flex acct-info-div pt-2">
              <p className="bg-transparent w-50">Country</p>
              {!Array.isArray(activities_g) ? (
                <p className="bg-transparent w-50 acct-info-text">
                  {activities_g.geolocation["Country Name"]}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="main-color rounded-4 mt-5 p-3">
          <div
            className="bg-transparent d-flex"
            onClick={() => handleLink("/transaction")}
          >
            <div className="bg-transparent">
              <img
                src={trans}
                alt="trans"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Transactions</p>
            <Link to="/transaction" className="bg-transparent ms-auto">
              <i
                id=""
                className="fa fa-chevron-right bg-transparent fa-fw fa-sm  "
              ></i>
            </Link>
          </div>

          <div
            className="bg-transparent d-flex"
            onClick={() => handleLink("/history")}
          >
            <div className="bg-transparent">
              <img
                src={BetHis}
                alt="BetHis"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Bet History</p>
            <Link to="/history" className="bg-transparent ms-auto">
              <i
                id=""
                className="fa fa-chevron-right bg-transparent fa-fw fa-sm  "
              ></i>
            </Link>
          </div>

          <div
            className="bg-transparent d-flex"
            onClick={() => handleLink("/promotion")}
          >
            <div className="bg-transparent">
              <img
                src={promotion}
                alt="promotion"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Promotions</p>
            <Link to="/promotion" className="bg-transparent ms-auto">
              <i
                id=""
                className="fa fa-chevron-right bg-transparent fa-fw fa-sm  "
              ></i>
            </Link>
          </div>

          <div
            className="bg-transparent d-flex"
            onClick={() => handleLink("/anti-score")}
          >
            <div className="bg-transparent">
              <img
                src={market}
                alt="market"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Market</p>
            <Link to="/anti-score" className="bg-transparent ms-auto">
              <i
                id=""
                className="fa fa-chevron-right bg-transparent fa-fw fa-sm  "
              ></i>
            </Link>
          </div>

          <div
            className="bg-transparent d-flex"
            onClick={() => setIsOpen(true)}
          >
            <div className="bg-transparent">
              <img
                src={changePass}
                alt="changePass"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Change Password</p>
            <Link
              onClick={() => setIsOpen(true)}
              className="bg-transparent ms-auto"
            >
              <i
                id=""
                className="fa fa-chevron-right bg-transparent fa-fw fa-sm  "
              ></i>
            </Link>
          </div>

          <div
            className="bg-transparent d-flex"
            onClick={() => setIsOpen_pin(true)}
          >
            <div className="bg-transparent">
              <img
                src={changePin}
                alt="changePin"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Change Pin</p>
            <Link
              onClick={() => setIsOpen_pin(true)}
              className="bg-transparent ms-auto"
            >
              <i
                id=""
                className="fa fa-chevron-right bg-transparent fa-fw fa-sm  "
              ></i>
            </Link>
          </div>

          <div
            className="bg-transparent d-flex"
            onClick={() => setIsOpen_gift(true)}
          >
            <div className="bg-transparent">
              <img
                src={redeemGift}
                alt="redeemGift"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Redeem Gits</p>
            <Link
              onClick={() => setIsOpen_gift(true)}
              className="bg-transparent ms-auto"
            >
              <i
                id=""
                className="fa fa-chevron-right bg-transparent fa-fw fa-sm  "
              ></i>
            </Link>
          </div>

          <div
            className="bg-transparent d-flex"
            onClick={() => handleLink("/notification")}
          >
            <div className="bg-transparent">
              <img
                src={notification}
                alt="notification"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Notifications</p>
            <div className="bg-transparent ms-auto ps-5">
              <i
                id=""
                className="far fa-bell  fa-fw fa-sm ps-5 bg-transparent "
              ></i>
              {!Array.isArray(activities_g) ? (
                <p className="bg-danger rounded-circle bell-num">
                  {activities_g.notification
                    ? activities_g.notification.unseen.length
                    : "0"}
                </p>
              ) : (
                <p className="bg-danger rounded-circle bell-num">0</p>
              )}

              {/* <p className="bg-transparent bell-num">0</p> */}
            </div>
            <Link to="/notification" className="bg-transparent ms-auto">
              <i
                id=""
                className="fa fa-chevron-right bg-transparent  fa-fw fa-sm  "
              ></i>
            </Link>
          </div>

          <div
            className="bg-transparent d-flex"
            onClick={() => handleLink("/pending")}
          >
            <div className="bg-transparent">
              <img
                src={frown}
                alt="help"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Pending friends</p>
            <Link to="/pending" className="bg-transparent ms-auto">
              <i
                id=""
                className="fa fa-chevron-right  fa-fw fa-sm  bg-transparent "
              ></i>
            </Link>
          </div>
          <div
            className="bg-transparent d-flex"
            onClick={() => handleLink("/help")}
          >
            <div className="bg-transparent">
              <img
                src={help}
                alt="help"
                className="bg-transparent pe-2 pb-1"
                style={{ width: "" }}
              />
            </div>
            <p className="bg-transparent">Help</p>
            <Link to="/help" className="bg-transparent ms-auto">
              <i
                id=""
                className="fa fa-chevron-right  fa-fw fa-sm  bg-transparent "
              ></i>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <button className="btn btn-danger w-100 mt-4 mb-4 p-2 fw-bold text-warning ">
            Loading...
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 mt-4 mb-4 p-2 fw-bold "
          >
            LOGOUT
          </button>
        )}
      </div>

      {isOpen ? (
        <div className="modal-overlay-profile">
          <ChangePassword isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      ) : (
        ""
      )}

      {isOpen_pin ? (
        <div className="modal-overlay-profile">
          <ChangePin isOpen_pin={isOpen_pin} setIsOpen_pin={setIsOpen_pin} />
        </div>
      ) : (
        ""
      )}

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
      
      <Footer activeButton={activeButton} setActiveButton={setActiveButton} />
    </div>): navigate(`/${activeButton}`)}
    </>
    
  );
};

export default Profile;
