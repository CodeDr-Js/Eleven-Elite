import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import usdt from "../../../assets/icons/usdt.png";
import tether from "../../../assets/icons/tether.png";
import dollar from "../../../assets/icons/dollar.png";
import usd from "../../../assets/icons/usd.png";
import { useCookies } from "react-cookie";
import Button from "../../loader-btn/loader-btn2";
import "../../largeScreen/large.css";
import ErrorCard from "../anti-scores/errorCard";
import SuccessCard from "../anti-scores/successCard";
import { API } from "../../api-service/api-service";
import { DataContext } from "../../APIs/Api";

const BetSecure = ({
  correctScore,
  oddPer,
  profit,
  leagueName,
  homeName,
  awayName,
  homeLogo,
  awayLogo,
  leagueFlag,
  startDate,
  id,
  onClick
}) => {
  const navigate = useNavigate();
  const {
    data,
    allData,
    activeToken,
    setActivities_g,
    setActiveToken,
    activities,
    user,
  } = useContext(DataContext);
  const [token, setToken, removeToken] = useCookies(["auth-token"]);

  //handling logout token
  const handleLogout = async () => {
    try {
      API.logout(token["auth-token"]).then((result) => {
       // console.log(result);
        if (result.success) {
          removeToken("auth-token");
        } else {
          removeToken("auth-token");
        }
      });
    } catch (error) {
     // console.log(error);
    }
  };

  const [showLoader, setShowLoader] = useState(false);

  //Checking for token/Activ
  useEffect(() => {
    const token1 = token["auth-token"];
    if (!token1) {
    //  console.log("Your token is", token1);
      navigate("/login");
      setActiveToken("");
    } else {
      setActiveToken(token1);
    }
  }, []);

  const [values, setValues] = useState({
    amount: "",
  });

  // const calPercentage = () => {
  //   const increase = Number(values.amount) * (Number(oddPer) / 100);

  //   const newAmount = Number(values.amount) + increase;
  //   return newAmount.toFixed(2);
  // };

  //  const newPer = calPercentage();
  //  console.log(newPer);

  //{market:{name:correctscore, pick:3:3, odd: 0.65}, id:1067930, stake_amount:100}
  const dbValues = {
    market: {
      name: "Exact Score",
      pick: correctScore,
      odd: oddPer,
      potential_winning: percentageAdd(values.amount, oddPer),
      league: { name: leagueName, flag: leagueFlag },
      teams: { home: homeName, away: awayName },
      img_url: { home: homeLogo, away: awayLogo },
      startDate,
    },
    id,
    stake_amount: values.amount,
  };

 // console.log(dbValues);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const betBtn = "betBtn";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);

    const newBetBtn = document.getElementById(betBtn);
    if (newBetBtn) {
      newBetBtn.classList.add("disabled");
    }

    //handling logout token
    setShowLoader(true);
    if (error) {
      setError(null);
    }

    if (success) {
      setSuccess(null);
    }

    API.paynow(dbValues, token["auth-token"])
      .then((result) => {
   //     console.log(result);
        setShowLoader(false);
        if (result.success) {
          setActivities_g(result.activities);
          setSuccess(result.message);
          //setValues((values.amount = ""));
        } else if (result.detail) {
          removeToken("auth-token");
          navigate("/login");
          //setValues(values.amount = "")
        } else {
          setError(result.message);
        }
      })
      .catch((err) => setError(err));

    // API.retrieveData(token["auth-token"])
    // .then((result) => {
    //   console.log(result);

    //   if (result.success) {
    //     API.paynow(dbValues, token["auth-token"])
    //       .then((result) => {
    //         console.log(result);
    //         setShowLoader(false);
    //         if (result.success) {
    //           setSuccess(result.message);
    //           //setValues((values.amount = ""));
    //         } else if(result.status === 400) {
    //           removeToken("auth-token");
    //           navigate("/login");
    //           //setValues(values.amount = "")
    //         } else {
    //           setError(result.message);
    //         }
    //       })
    //       .catch((err) => setError(err));
    //   } else if (!result.success) {
    //     // removeToken("auth-token");
    //     // navigate("/login");
    //   }
    // })
    // .catch((err) => console.log(err));
  };

 // console.log(dbValues);
  //console.log(id);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Limit the number of digits to 5
    if (value.length <= 6 || value === "") {
      setValues({ ...values, [name]: value });
    } else {
      // If the input length exceeds 5 characters, prevent further input
      event.preventDefault();
      // (e) => setValues({ ...values, amount: e.target.value });
    }
  };

  //   const filteredIdGame = data.filter((item) => Number(id) === item.fixture.id);
  //   const filteredIdOdd = allData.filter(
  //     (item) => Number(id) === item.fixture.id
  //   );

  const leagueShortName2 = (name) => {
    if (name.length > 10) {
      return name.toString().substr(0, 10) + "...";
    } else {
      return name;
    }
  };

  function percentageAdd(amount, percent) {
    const increase = Number(amount) * (Number(percent) / 100);

    const newAmount = Number(amount) + increase;
    return newAmount.toFixed(2);
  }

  const amountLength = (amount) => {
    const parts = amount.toString().split(".");
    const integerPart = parts[0];

    let truncatedNumber;

    if (integerPart.length > 4) {
      truncatedNumber = integerPart.substring(0, 4) + "..";
    } else {
      truncatedNumber = integerPart;
    }

    const final = truncatedNumber + "." + parts[1];
    return final;
  };

  const handleCloseModal = (e) => {
    setIsOpen(false);
    //  if (e.target.classList.contains("modal-overlay-error")) {
    //    setIsOpen(false);
    //  }
    const newBetBtn = document.getElementById(betBtn);
    if (Number(values.amount) >= 10) {
      newBetBtn.classList.remove("disabled");
    }
  };

  return (
    <div className="bet-div-1 container">
      <div className="bg-transparent">
        
        <div className="text-center fs-3 bg-transparent d-flex ">
          {" "}
          <p className="bg-transparent w-100 ps-2"> Selected Game </p>
          <i className="fa fa-close bg-transparent ms-auto opacity-50" onClick={onClick}></i>
        </div>
        <div className="bet-color bet-div-2">
          <div className="bg-transparent">
            <div className="bg-transparent opacity-50 ">{leagueName}</div>
          </div>

          <div className="bg-transparent d-flex bet-team-div mt-3 ">
            <div className="bg-transparent width-1 d-flex flex-column align-items-center">
              <div className="bg-transparent bet-logo-div  ">
                <img
                  src={homeLogo}
                  alt="logo"
                  className="rounded-circle"
                  style={{ width: "26px" }}
                />
              </div>
              <p className="bg-transparent opacity-50 bet-font text-center">
                {leagueShortName2(homeName)}
              </p>
            </div>
            {/* <div className="bet-color">
                <div className="bet-color bet-logo-div  ">
                  <img
                    src={value.teams.home.logo}
                    alt="logo"
                    className="rounded-circle"
                    style={{ width: "26px" }}
                  />
                </div>
                <div className="bet-color opacity-50 bet-font">
                  {leagueShortName2(value.teams.home.name)}
                </div>
              </div> */}

            <div className="bg-transparent opacity-50 fs-5 mt-2">VS</div>

            <div className="bg-transparent width-1 d-flex flex-column align-items-center">
              <div className="bg-transparent bet-logo-div  ">
                <img
                  src={awayLogo}
                  alt="logo"
                  className="rounded-circle"
                  style={{ width: "26px" }}
                />
              </div>
              <p className="bg-transparent opacity-50 bet-font">{leagueShortName2(awayName)}</p>
            </div>
          </div>

          <div className="bg-primary rounded-4 w-75 text-center fs-4 btn btn-primary bet-cs-div d-flex justify-content-center">
            <p className="bg-primary bet-font-1">
              Correct Score <img /> {correctScore}{" "}
            </p>
          </div>
        </div>

        <div className="bet-color bet-amount-div">
          <div className="bg-transparent d-flex ">
            <div className="bg-transparent">
              <div className="bg-transparent ms-4">
                <p className="bg-transparent opacity-50 bet-font">Amount</p>
              </div>
              <div className="bg-transparent">
                <div className="bg-transparent bet-input-div mt-3 ">
                  <div className="bg-transparent">
                    {/* <img
                        className="amount-icon amount-icon-1 bg-white mt-2"
                        src={usdt}
                        alt="usdt"
                        style={{ width: "20px" }}
                      /> */}
                    <img
                      className="amount-icon amount-icon-2 ms-1 mt-2"
                      src={dollar}
                      alt="usd"
                      style={{ width: "29px" }}
                    />
                  </div>
                  <input
                    className="btn btn-light bet-input fw-bold fs-5"
                    type="Number"
                    id="amount"
                    name="amount"
                    maxLength="6"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* <div className="bet-color bet-x-div fs-5">
                <div className="bet-color opacity-50">X</div>
              </div> */}
            <div className="d-flex bg-transparent bet-pg-div ">
              <div className="bg-transparent ms-2">
                <div className="bg-transparent bet-font">Profit</div>
                <div className="bg-transparent bet-per">{profit + "%"}</div>
              </div>

              <div className="bg-transparent ms-4">
                <div className="bg-transparent bet-font">Gain</div>
                <div className="bg-transparent bet-per">
                  {amountLength(percentageAdd(values.amount, profit))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-transparent">
            {" "}
            <p className="bg-transparent bet-font-2 text-end opacity-50">
              {" "}
              {/* (processing fee: 5%) */}
            </p>{" "}
          </div>
        </div>

        <div className="d-flex justify-content-center bg-transparent">
          <div className="bg-transparent">
            <img />
          </div>
          <div className="bg-transparent text-danger mt-3 ">Minimum amount: 10</div>
          <div>
            <img />
          </div>
        </div>

        <div className="bg-transparent">
          {/* <button
              onClick={handleSubmit}
              className={
                Number(values.amount) >= 10
                  ? "btn btn-primary w-100 p-2 fs-4 opacity-75 mt-3"
                  : "btn btn-primary w-100 p-2 fs-4 opacity-25 mt-3 disabled"
              }
            >
              Confirm
            </button> */}
          <Button
            onSubmit={handleSubmit}
            text="Confirm"
            loading={showLoader}
            disabled={showLoader}
            value={values.amount}
            betBtn={betBtn}
          />
        </div>
        {isOpen ? (
          <div>
            {error ? (
              <div className="modal-overlay-error">
                <ErrorCard
                  handleCloseModal={handleCloseModal}
                  error={error}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  betBtn={betBtn}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {success ? (
          <div className="modal-overlay-success">
            <SuccessCard success={success} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BetSecure;
