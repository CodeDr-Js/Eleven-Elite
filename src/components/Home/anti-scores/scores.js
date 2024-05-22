import React, { useEffect, useState, useContext } from "react";
import "./index.css";
import axios from "axios";
import { DataContext } from "../../APIs/Api";

const ScoreAnti = () => {
  const { data } = useContext(DataContext);

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
    const leagueName = name.toString().substr(0, 20);
    return leagueName;
  };

 // console.log(data);

  const newGames = data[0] ? data.map((game) => {
    const gameStatus = game.fixture.status.short;
    const gameStartTime = game.fixture.timestamp * 1000;

    const userTime = Date.now();

    // console.log(userTime, gameStartTime);
    //CHECK USERTIME AND GAMESTARTTIME
    if (gameStatus === "FT") {
      return (
        <div key={game.fixture.id} className="score-div">
          <div className="d-flex small-div">
            <small className="me-auto ">
              {convertTimestampToRealTime(game.fixture.timestamp)}
            </small>
            <small>
              {leagueShortName(game.league.name)} {game.league.country}
            </small>
          </div>
          <div className=" d-flex">
            <div className="me-auto score-div-2">
              <div className="fw-bold d-flex mb-2">
                <span>
                  <img
                    className="me-2 rounded-circle"
                    src={game.teams.home.logo}
                    alt="Logo"
                    style={{ width: "15px" }}
                  />
                </span>
                <div>{game.teams.home.name}</div>
              </div>

              <div className="fw-bold d-flex">
                <span>
                  <img
                    className="me-2 rounded-circle"
                    src={game.teams.away.logo}
                    alt="Logo"
                    style={{ width: "15px" }}
                  />
                </span>
                <div>{game.teams.away.name}</div>
              </div>
            </div>
            <div className="rounded-circle volume-div ms-3 shadow ">
              <div>
                <div className="">Volume</div>
                <div>4708K</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-center  opacity-50">Ends in 04:48:16</div>
            <div className="d-flex justify-content-center">
              <div className="rounded-4 against-div pt-2 pb-2 bg-primary w-75 ps-3 pe-3 "></div>
            </div>

            <div className="d-flex against-div-2 ">
              <div className="against-color ">
                {" "}
                <span className="opacity-50 against">Against</span>
              </div>
              <div className="fw-bold ps-3 pe-3 score ">
                {" "}
                Score {game.score.fulltime.home}:{game.score.fulltime.away}{" "}
              </div>
              <div className="odd pe-3">21.24%</div>
            </div>
          </div>
        </div>
      );
    }
  }):"";

  return <div className="score-div-main">{newGames}</div>;
};

export default ScoreAnti;

// Use Effect

// const [games, setGames] = useState([]);
// useEffect(() => {
//   async function getGames() {
//     const options = {
//       method: "GET",

//       url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
//       params: { date: "2024-04-09" },
//       headers: {
//         "X-RapidAPI-Key":
//           "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
//         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       // const gameScore = response.data.response.map((games) => {
//       //   return console.log(games);
//       // });
//       // gameScore();

//       // console.log(response.data.response);

//       setGames(response.data.response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   getGames();
// }, []);

// console.log(games);

//Second

// setGames(() => {
//   return {
//     gameStored,
//   };
// });
// console.log(games);

// games.map((v) => {
//   console.log(v);
// });
// if (localStorage["game"]) {
//   const datas = JSON.parse(localStorage.getItem("game"));
//   console.log(datas);
//   //setGames(datas);
//   console.log(games);
// }

// const datas = JSON.parse(localStorage.getItem("game"));
// console.log(datas);
//setGames(datas);

// if (localStorage.getItem("game") !== null) {
//   const datas = JSON.parse(localStorage.getItem("game"));
//   setGames(datas);
// } else {
//   async function getGames() {
//     const options = {
//       method: "GET",
//       url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
//       params: { date: "2024-04-09" },
//       headers: {
//         "X-RapidAPI-Key":
//           "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
//         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       // const gameScore = response.data.response.map((games) => {
//       //   return console.log(games);
//       // });
//       // gameScore();

//       // console.log(response.data.response);

//       localStorage.setItem("game", JSON.stringify(response.data.response));
//       const datas = JSON.parse(localStorage.getItem("game"));
//       // setGames(datas);

//       //setGames(response.data.response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   getGames();
// }

//console.log(games);
