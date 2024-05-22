import React, { useContext, useEffect, useState } from "react";
import "../color/color.css";
import "./index.css";
import { API } from "../api-service/api-service";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import SettledNav from "./settledNav";
import { DataContext } from "../APIs/Api";
import Spinner from "../spinner/Spinner";
import NoData from "../noData/noData";




const Cancelled = ({loading, settled}) => {
  // const navigate = useNavigate();
  // const {} = useContext(DataContext)
  // const [token, setToken, removeToken] = useCookies(["auth-token"]);
  // const [activities, setActivities] = useState([]);
  // const [settled, setSettled] = useState([]);
  // const [user, setUser] = useState([]);
  // const [loading, setLoading] = useState(true);

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
  //           setSettled(result.activities.bet.settled);
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

  //console.log(settled);

 
  let e = [];
  Object.entries(settled).forEach(([date, tickets]) => {
    console.log(date); // Print the date
    Object.entries(tickets).forEach(([id, ticketData]) => {
      console.log(id, ticketData); // Print the ID
      if (ticketData.ticket_head.outcome === "canc") {
        ticketData.games.forEach((item) => {
            e.push([item, ticketData.ticket_head]);
            // console.log(item);
          });
      }
      
      //console.log(ticketData); // Print the ticket data
    });
  });

  const historycard = e.map(([item, ticket_head]) => {
    console.log(item);
    return (
      <div key={item.id} className="history-card-div main-color rounded-4 shadow-lg">
      <div className="main-color d-flex">
        <div className="main-color me-2">
        <img
              src={item.market.league.flag}
              alt="flag"
              style={{ width: "18px" }}
            />
        </div>
        <p className="main-color fs-5 opacity-50">{leagueShortName2(item.market.league.name)}</p>
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
              <p className="main-color opacity-75">$ {ticket_head.stake_amount}</p>
            </div>
          </div>

          <div className="main-color ms-auto fw-bold">$ {ticket_head.potentail_winning}</div>
        </div>

        <div className="main-color opacity-50">
          Ticket ID: {item.id}
        </div>
        <div className="main-color">
          <div className="main-color d-flex">
            {item.market.result? <p className="main-color text-primary  fw-bold pt-2">
              Final score: {item.market.result.home} : {item.market.result.away}
            </p> : "" }
            {/* {!item.market.result? <p className="main-color text-warning  fw-bold pt-2">
              POSTPOND
            </p> : "" } */}
            
            {ticket_head.outcome === "won"? ( <p className="main-color text-success fw-bold fs-2 ms-auto pt-2">
              Win
            </p>):""}
            {ticket_head.outcome === "lose"? ( <p className="main-color text-danger fw-bold fs-2 ms-auto pt-2">
              Lose
            </p>):""}
            {ticket_head.outcome === "canc"? ( <p className="main-color text-secondary fw-bold fs-3 opacity-50 ms-auto pt-2">
              Cancelled
            </p>):""}
            {ticket_head.outcome === "post"? ( <p className="main-color text-warning fw-bold fs-3 opacity-50 ms-auto pt-2">
              Postpond
            </p>):""}
           
          </div>
        </div>
      </div>
    </div>
    );
  });



  return (
    <>
  
      { historycard}
      {!e[0]? <NoData/>:""}
      
    </>
  );
};

export default Cancelled;
