import React, {
  useEffect,
  createContext,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import "./index.css";
import axios from "axios";
import { DataContext } from "../../APIs/Api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CalculateStartDiff } from "../../qickfun/qickfun";
import NoData from "../../noData/noData";
import Loader from "../../loader/loader";

const ScoreAnti = () => {
  const navigate = useNavigate();
  const {
    activities_g,
    data,
    allData,
    activeToken,
    setActiveToken,
    activities,
    user,
    checkData,
    setCheckDate,
    loadingNew,
    setLoadingNew,
  } = useContext(DataContext);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20; // Number of items to display initially and per scroll
  const observer = useRef();

  const token = Cookies.get("auth-token");
  //console.log(activities_g);

  //Checking for token/Activ
  useEffect(() => {
    if (!token) {
      console.log("Your token is", token);
      navigate("/login");
      setActiveToken("");
    } else {
      setActiveToken(token);
    }
  }, [token]);

  //console.log(allData);
  //console.log(checkData);

  // const lastItemRef = useRef(null);

  // const goBack = () => {
  //    window.history.back(); // Go back to the previous page and section

  //    // Scroll to the last item
  //    if (lastItemRef.current) {
  //      lastItemRef.current.scrollIntoView({ behavior: "smooth" });
  //    }
  // };

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
    if (name.length > 20) {
      return name.toString().substr(0, 20) + "...";
    } else {
      return name;
    }
  };

  // const filteredGames = allData.map((e) => {
  //   const id = e.fixture.id
  //   const filteredData = data.filter((value) => value.fixture.id.includes());
  //   console.log(filteredData);
  // });

  const filterIds = new Set(allData.map((item) => item.fixture.id));
  //console.log(filterIds);

  // Filtering data100 based on whether their ID exists in data20
  const filteredData = data[0]
    ? data.filter((item) => filterIds.has(item.fixture.id))
    : "";
  //console.log(filteredData);

  useEffect(() => {
    setLoading(true);
    setDisplayedData(filteredData.slice(0, limit));
    setLoading(false);
  }, []);
  console.log(displayedData);
  
  const loadMoreData = () => {
    const newIndex = displayedData.length + limit;
    if (newIndex >= filteredData.length) {
      setDisplayedData(filteredData);
      setHasMore(false);
    } else {
      setDisplayedData((prevData) => [
        ...prevData,
        ...filteredData.slice(prevData.length, newIndex),
      ]);
    }
  };

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const e = [];
  // const newGames = filteredData[0]? filteredData.map((game, index) => {
  const newGames = displayedData[0]
    ? displayedData.map((game, index) => {
        //console.log(game);
        //console.log(game);
        const gameStatus = game.fixture.status.short;
        //console.log(gameStatus);
        const gameStartTime = game.fixture.timestamp * 1000;
        let gameTime = CalculateStartDiff(gameStartTime);

        //console.log(gameTime);

        const userTime = Date.now();

        // const timeout = setTimeout(() => {

        // }, 1000);

        // console.log(userTime, gameStartTime);
        //CHECK USERTIME AND GAMESTARTTIME

        if (gameStatus === "NS" && !gameTime.expired) {
          e.push(game);
          let endId = "ends-" + index;
          let matchCard = "match-" + index;
          const timeout = (endId, matchCard) => {
            let x = setInterval(() => {
              const end = document.getElementById(endId);
              if (end) {
                gameTime = CalculateStartDiff(gameStartTime);
                if (!gameTime.expired) {
                  const hour = gameTime.counter.hours;
                  const days = gameTime.counter.days;
                  const minutes = gameTime.counter.minutes;
                  const seconds = gameTime.counter.seconds;
                  end.innerText = `Ends in ${hour}${minutes}${seconds}`;
                } else {
                  clearInterval(x);
                  const matchCardDiv = document.getElementById(matchCard);
                  //matchCard.style.display = 'none';
                  matchCardDiv.remove();
                  // console.log(gameTime, "expired");
                }
                //console.log(end);
              }
            }, 1000);
          };
          // if (gameStatus === "FT") {

          const scoreCard = (
            <div
              // ref={lastItemRef}
              id={matchCard}
              onClick={() => {
                navigate("/odd/" + game.fixture.id);
              }}
              key={game.fixture.id}
              className="score-div"
            >
              <div className="d-flex small-div opacity-50">
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
                <div id={endId} className="text-center  opacity-50">
                  Ends in
                </div>
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
                    Score - {game.fixture.status.short}{" "}
                  </div>
                  <div className="odd pe-5 ps-3 ">21.24%</div>
                </div>
              </div>
            </div>
          );
          timeout(endId, matchCard);
          return scoreCard;
        }
      })
    : "";

  useEffect(() => {
    if (checkData) {
      if (e[0]) {
        setLoadingNew(true);
      }
    }
  }, []);

  return (
    <div className="score-div-main">
      {newGames}
      {loading && <p>Loading...</p>}
      {hasMore && <div ref={lastElementRef} style={{ height: 20 }}></div>}

      {!e[0] ? <Loader /> : ""}
    </div>
  );
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

//First Code
//localStorage.removeItem("game");

// const DataContext = createContext();

// const DataProvider = ({ children }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedData = localStorage.getItem("data");
//         if (storedData) {
//           setData(JSON.parse(storedData));
//         } else {
//           // const response = await fetch("your-api-endpoint");
//           // const newData = await response.json();
//            const options = {
//             method: "GET",
//             url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
//             params: { date: getCurrentDate() },
//             headers: {
//               "X-RapidAPI-Key": "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
//               "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//             },
//     };

//       const newData = await axios.request(options);
//       setData(newData.data.response);
//       localStorage.setItem("data", JSON.stringify(newData.data.response));
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
//   );
// };

//   console.log(typeof getCurrentDate());

//   function stringify(obj) {
//     let cache = [];
//     let str = JSON.stringify(obj, function (key, value) {
//       if (typeof value === "object" && value !== null) {
//         if (cache.indexOf(value) !== -1) {
//           // Circular reference found, discard key
//           return;
//         }
//         // Store value in our collection
//         cache.push(value);
//       }
//       return value;
//     });
//     cache = null; // reset the cache
//     return str;
//   }

//   //Game api
//   async function getGames() {
//     const options = {
//       method: "GET",
//       url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
//       params: { date: getCurrentDate() },
//       headers: {
//         "X-RapidAPI-Key": "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
//         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await axios.request(options);

//       localStorage.setItem("game", stringify(response.data.response));
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getGames();
//   }, []);

//   if (localStorage.getItem("game") === null) {
//     getGames();
//   }

//   let games;

//   //Getting data from localstorage
//   if (localStorage.getItem("game") !== null) {
//     games = JSON.parse(localStorage.getItem("game"));
//     console.log(games);
//   }

//   // const dates = (timestamp) => {
//   //   const date = new Date(Number(timestamp)).toDateString();
//   //   console.log(timestamp);
//   //   return date;
//   // };

/**FILTER */

// const ids = [
//   1150460, 1168861, 1172155, 1173297, 1177969, 1151616, 1159374, 1148717,
//   1162707, 1166599, 1161603, 1166971, 1166972, 1162943, 1173079, 1180974,
//   1189876,
// ];

// // //Filters
//   // const NS = data.filter((game) => game.fixture.status.short === "NS");

//   //Filtered Game
//   function filterDataByIds(data, ids) {
//     // Filter the data based on the IDs in the ids array
//     const filteredData = data.filter((item) => ids.includes(item.fixture.id));

//     return filteredData;
//   }

//   const filteredData = filterDataByIds(data, ids);
//   //console.log(filteredData);
