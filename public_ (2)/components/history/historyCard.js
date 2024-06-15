import React, { useContext, useEffect, useState } from "react";
import "../color/color.css";
import "./index.css";
import { API } from "../api-service/api-service";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../APIs/Api";
import { CalculateStartDiff } from "../qickfun/qickfun";
import Button from "../loader-btn/loader-cancel";
import SpinnerCancel from "../spinner/SpinnerCancel";
import Spinner from "../spinner/Spinner";
import NoData from "../noData/noData";






const HistoryCard = ({loading, openBet, setOpenBet, setSettled, setActivities}) => {
  // const navigate = useNavigate();
  const {setActivities_g} = useContext(DataContext)
  const [errorCancel, setErrorCancel] = useState();
  // const global_refresh = async () => {
  //   try {
      
  //     se
  //   } catch (error) {
      
  //   }
      
    
  // }

  // const [activities, setActivities] = useState([]);
  // const [openBet, setOpenBet] = useState([]);
  // const [user, setUser] = useState([]);
  
  //const [isloading, setisLoading] = useState(false);
  // const [activities, setActivities] = useState([]);
  // const [settled, setSettled] = useState([]);
  // const [openBet, setOpenBet] = useState([]);
  const [token] = useCookies(["auth-token"]);
  //const [showLoader, setShowLoader] = useState(false);


  function convertTimestampToRealTime(timestamp) {
    // Convert the timestamp to milliseconds
    var timestampInMillis = timestamp * 1000;

    // Create a new Date object using the timestamp
    var date = new Date(timestampInMillis);

    // Extract the various components of the date
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Months are zero-based
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Format the date and time components
    var formattedTime =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day +
      " " +
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;

    return formattedTime;
  }

  const leagueShortName = (name) => {
    if (name.length > 7) {
      return name.toString().substr(0, 7) + "...";
    } else {
      return name;
    }
  };
  const leagueShortName2 = (name) => {
    if (name.length > 23) {
      return name.toString().substr(0, 23) + "...";
    } else {
      return name;
    }
  };


  // function getUserData() {
  //   const token1 = token["auth-token"];
  //   if (token1) {
  //     console.log("token", token1);
  //     API.retrieveData(token1)
  //       .then((result) => {
  //         console.log(result);
  //         setLoading(false);
  //         if (result.success) {
  //           setActivities(result.activities);
  //           setOpenBet(result.activities.bet.openbet);
  //           setUser(result.user);
  //         } else if (!result.success) {
  //           removeToken("auth-token");
  //           navigate("/login");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     setActivities([]);
  //     setUser([]);
  //     navigate("/login");
  //   }
  // }

  // useEffect(() => {
  //   getUserData();
  // }, []);

  const handleCancel = async (startDate, ticket_id, matchCard) => {
       
        const matchCardDiv = document.getElementById(matchCard)
        const button = matchCardDiv.querySelector("button");
        const spinner = matchCardDiv.querySelector(".sweet-loading");

        //console.log(button, spinner);

        const confirmation = window.confirm("Are you sure you want to Cancel?");
        //setShowLoader(true);
        if (confirmation) {
          spinner.classList.remove("d-none");
          button.classList.add("d-none");

          API.cancelTicket({startDate, ticket_id}, token["auth-token"])
          .then((result) => {
          spinner.classList.add("d-none");
          button.classList.remove("d-none");
          console.log(result);
          if(result.success) {
          console.log("Cancelled");
          console.log(result);
          setActivities(result.activities);
          setActivities_g(result.activities);
          setSettled(result.activities.bet.settled);
          setOpenBet(result.activities.bet.openbet);

          // const mainCardDiv = document.getElementById(ticket_id);
          // mainCardDiv.classList.add("d-none");
      } else {
        setErrorCancel(result.message)
      }
    }) . catch ((err) => setErrorCancel(err));
        }
      

    
  }


  let e = [];
  Object.entries(openBet).forEach(([date, tickets]) => {
    //console.log(date); // Print the date
    Object.entries(tickets).forEach(([id, ticketData]) => {
      //console.log(id); // Print the ID
      if (ticketData.ticket_head.status === "Open") {
        ticketData.games.forEach((item) => {
          e.push([item, ticketData.ticket_head, id, date]);
          // console.log(item);
       
        });
      }
      //console.log(ticketData); // Print the ticket data
    });
  });

  const historycard = e.map(([item, ticket_head, id, date], index) => {

    //console.log(ticket_head);
    const gameStartTime = item.market.timestamp * 1000;
    let gameTime = CalculateStartDiff(gameStartTime);

    let endId = "ends-" + index;
    let matchCard = "match-" + index;
    let mainCard = id;
      const timeout = (endId, matchCard) => {
        let x = setInterval(() => {
          const end = document.getElementById(endId);
          if (end) {
            gameTime = CalculateStartDiff(gameStartTime);
            if (!gameTime.expired) {
              const matchCardDiv = document.getElementById(matchCard);
              matchCardDiv.classList.remove("d-none");
              
              const hour = gameTime.counter.hours;
              const days = gameTime.counter.days;
              const minutes = gameTime.counter.minutes;
              const seconds = gameTime.counter.seconds;
              end.innerText = `Ends in ${hour}${minutes}${seconds}`;
            } else {
              clearInterval(x);
              //const matchCardDiv = document.getElementById(matchCard);
              //matchCardDiv.style.display = "none";
              //matchCardDiv.style.display = 'none';
              //matchCardDiv.remove();
              //console.log(gameTime, "expired");
            }
            //console.log(end);
          }
        }, 1000);
      };


    
    const hisCard =  <div id={mainCard} className="history-card-div main-color rounded-4 shadow-lg">
      
        <div className="main-color d-flex">
          <div className="main-color me-2">
            <img
              src={item.market.league.flag}
              alt="flag"
              style={{ width: "18px" }}
            />
          </div>
          <p className="main-color fs-5 opacity-50">
            {leagueShortName2(item.market.league.name)}
          </p>
        </div>

        <div className="main-color d-flex">
          <p className="main-color me-auto opacity-75 ">
            {leagueShortName(item.market.teams.home)} - {leagueShortName(item.market.teams.away)}
          </p>
          <small className="main-color pt-1 opacity-50 ">
          {convertTimestampToRealTime(item.market.timestamp)}
          </small>
        </div>
        <div className="main-color">
          <p className="main-color pt-2 fw-bold ">Correct Score</p>

          <div
            className=" u-color d-flex rounded-3 ps-2 pe-2 pt-2 anti-card-div"
            style={{ height: "30px" }}
          >
            <p className="u-color">Anti</p>
            <p className="u-color">{item.market.pick}</p>
            <p className="u-color fw-bold anti-percent">{item.market.odd}%</p>
          </div>

          <div className="main-color pt-3 d-flex ">
            <div className="main-color d-flex stake-div">
              <p className="main-color opacity-75">Stake</p>
              <div className="main-color d-flex">
                <img />
                <p className="main-color opacity-75">
                  $ {ticket_head.stake_amount}
                </p>
              </div>
            </div>

            <div className="main-color ms-auto fw-bold">
              $ {ticket_head.potentail_winning}
            </div>
          </div>

          <div className="main-color opacity-50">
            Ticket ID: {id}
          </div>
          <div className="main-color">
            <div className="main-color d-flex">
              <div id={matchCard} className="d-none"> 
                <div className="main-color d-flex flex-column align-items-center cancel-main-div ">
                  <p id={endId}  className="main-color opacity-50 fw-bold pb-1 pt-3 text-danger">
                    Ends in:
                  </p>
                  
                  <button onClick={()=>handleCancel(date, id, matchCard)} className="btn btn-secondary cancel-btn w-100 fw-bold mb-4">Cancel</button> 
                  <SpinnerCancel/> 
               

                  {/* <Button onClick={()=>handleCancel(date, id)} text="Cancel Ticket" loading={showLoader} disabled={showLoader} />    */}
                </div>
              </div>
              <p className="main-color text-warning fw-bold opacity-75 ms-auto pt-2">
                Running
              </p>
            </div>
          </div>
        </div>
      </div>

    timeout(endId, matchCard);
    return hisCard;
  });

  setTimeout(() => {
    if (errorCancel) {
      setErrorCancel("");
    }
  }, 3000);

  return <>
   {loading?<Spinner/>: historycard}
   {/* <NoData/> */}
   {!e[0]? <NoData/>:""}
   {errorCancel ? (
              <p className="alert rounded-3 w-75 error-cancel alert-danger text-uppercase f-italic">
                {errorCancel && errorCancel}
              </p>
            ) : (
              ""
            )}
  
  </>;
};

export default HistoryCard;
