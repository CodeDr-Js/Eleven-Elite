import React, { useContext, useEffect, useState } from "react";
import OddNav from "./OddNav";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../APIs/Api";
import Bet from "./bet";
import { useCookies } from "react-cookie";
import { padNum } from "../../qickfun/qickfun";
import NoData from "../../noData/noData";


//import './Modal.css'
// import "./index.css";

const Odd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, allData, activeToken, setActiveToken, activities_g, user } =
    useContext(DataContext);
  const [token] = useCookies(["auth-token"]);

  //Checking for token/Activ
  useEffect(() => {
    const token1 = token["auth-token"];
    if (!token1) {
      console.log("Your token is", token1);
      navigate("/login");
      setActiveToken("");
    } else {
      setActiveToken(token1)
    }
  }, []);

  const [modalData, setModalData] = useState({});

  

  const onHandleClick = () => {
    e.preventDefault();
  };

  function timestampToReal(timestamp) {
    // Create a new Date object with the timestamp
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

    return date;
  }

  //Toggle Modal
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();

    const spans = e.currentTarget.querySelectorAll("span");
    const leagueName = document.getElementById("leagueName");
    const leagueFlag = document.getElementById("leagueFlag");
    const homeName = document.getElementById("homeName");
    const awayName = document.getElementById("awayName");
    const homeLogo = document.getElementById("homeLogo");
    const awayLogo = document.getElementById("awayLogo");
    const startDate = document.getElementById("startDate");

    // Get the values of the <span> elements
    setModalData({
      correctScore: spans[0].textContent,
      oddPer: spans[1].textContent,
      profit: spans[1].textContent,
      Gain: "1007",
      leagueName: leagueName.textContent.trim(),
      homeName: homeName.textContent.trim(),
      awayName: awayName.textContent.trim(),
      homeLogo: homeLogo.getAttribute("src"),
      awayLogo: awayLogo.getAttribute("src"),
      leagueFlag: leagueFlag.getAttribute("src"),
      startDate: startDate.textContent.trim(),
    });

    setIsOpen(!isOpen);
//    console.log(modalData);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsOpen(false);
    }
  };

  
  /**Ends */

  //Checkinig id

  const userTime = Date.now();

  const validId = data.filter(
    (
      value //value.fixture.id === Number(id)
    ) =>
      value.fixture.id === Number(id) &&
      value.fixture.status.short === "NS" &&
      userTime < value.fixture.timestamp * 1000
  );
  //1. console.log(validId, validId.length);

  /**Ends */

  //Filter Game and Odd
  const filteredIdGame = data.filter((item) => Number(id) === item.fixture.id);
  const filteredIdOdd = allData.filter(
    (item) => Number(id) === item.fixture.id
  );
  // console.log(filteredIdGame);
  // console.log(filteredIdOdd);

  //Mapping

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

  function timestampToDateAndMonth(timestamp) {
    // Create a new Date object with the timestamp
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

    // Get the date and month from the Date object
    const day = date.getDate(); // Get the day of the month (1-31)
    const month = date.toLocaleString("default", { month: "long" }); // Get the full name of the month

    return `${month} ${day}`;
  }

  const leagueShortName = (name) => {
    if (name.length > 15) {
      return name.toString().substr(0, 15) + "...";
    } else {
      return name;
    }
  };

  const leagueShortName2 = (name) => {
    if (name.length > 10) {
      return name.toString().substr(0, 10) + "...";
    } else {
      return name;
    }
  };

  let e = [];

  filteredIdOdd.forEach((bookmakers) => {
    bookmakers.bookmakers.forEach((item) => {
      if (item.name === "Bet365") {
        //console.log(item.bets);
        item.bets.forEach((scores) => {
          if (scores.name === "Exact Score") {
            // setOdds(scores.values);
            console.log("bet365", scores.values);
            e = scores.values;

            //     e.push(odds);
            //   }
            // scores.values.forEach((odds) => {
            //   console.log(odds);
            //   if(!e[0]) {
            //     e.push(odds);
            //   }
            // });
          }
        });
        return;
      }
      // if (item.name === "1xBet") {
      //   //console.log(item.bets);
      //   item.bets.forEach((scores) => {
      //     if (scores.name === "Exact Score") {
      //       // setOdds(scores.values);
      //       console.log("1x", scores.values);
      //       e = scores.values;

      //       //     e.push(odds);
      //       //   }
      //       // scores.values.forEach((odds) => {
      //       //   console.log(odds);
      //       //   if(!e[0]) {
      //       //     e.push(odds);
      //       //   }
      //       // });
      //     }
      //   });
      //   return;
      // }
      // if (item.name === "Betway") {
      //   //console.log(item.bets);
      //   item.bets.forEach((scores) => {
      //     if (scores.name === "Exact Score") {
      //       // setOdds(scores.values);
      //       console.log("betway", scores.values);
      //       e = scores.values;

      //       //     e.push(odds);
      //       //   }
      //       // scores.values.forEach((odds) => {
      //       //   console.log(odds);
      //       //   if(!e[0]) {
      //       //     e.push(odds);
      //       //   }
      //       // });
      //     }
      //   });
      //   return;
      // }
      // if (item.name === "10Bet") {
      //   //console.log(item.bets);
      //   item.bets.forEach((scores) => {
      //     if (scores.name === "Exact Score") {
      //       // setOdds(scores.values);
      //       console.log("10bet", scores.values);
      //       e = scores.values;

      //       //     e.push(odds);
      //       //   }
      //       // scores.values.forEach((odds) => {
      //       //   console.log(odds);
      //       //   if(!e[0]) {
      //       //     e.push(odds);
      //       //   }
      //       // });
      //     }
      //   });
      //   return;
      // }

      // if (item.name === "1xBet") {
      //   console.log(item.bets);
      //   item.bets.forEach((scores) => {
      //     if (scores.name === "Exact Score") {
      //       // setOdds(scores.values);
      //       scores.values.forEach((odds) => {
      //         // console.log(odds);
      //         e.push(odds);
      //       });
      //     }
      //   });
      //   return;
      // }

      // if (item.name === "Betway") {
      //   console.log(item.bets);
      //   item.bets.forEach((scores) => {
      //     if (scores.name === "Exact Score") {
      //       // setOdds(scores.values);
      //       scores.values.forEach((odds) => {
      //         // console.log(odds);
      //         e.push(odds);
      //       });
      //     }
      //   });
      //   return;
      // }

      // if (item.name === "10Bet") {
      //   console.log(item.bets);
      //   item.bets.forEach((scores) => {
      //     if (scores.name === "Exact Score") {
      //       // setOdds(scores.values);
      //       scores.values.forEach((odds) => {
      //         // console.log(odds);
      //         e.push(odds);
      //       });
      //     }
      //   });
      //   return
      // }
    });
  });
 
  //2. console.log(e);

  // e.sort((a, b) => a.odd - b.odd);
  // console.log(e);

  //e.reverse();
  // console.log(e);

  //function for picking a random number
  function getRandomNumberFromArray(array) {
    // Generate a random index within the range of the array length
    const randomIndex = Math.floor(Math.random() * array.length);

    // Return the element at the random index
    return array[randomIndex];
  }

  //Function to convert to percentage
  function convertToPercentage(odd) {
    const randomOdds = [12.0];
    const randomOdd = getRandomNumberFromArray(randomOdds);

    let divided = odd * 0.09;
    if (divided > 14 || divided === null || divided === undefined) {
      const newDividedRandom = randomOdd;
      return newDividedRandom.toFixed(2);
    } else {
      const newDivided = odd * 0.09;
      return newDivided.toFixed(2);
    }
  }

  //reversed odd
  const reversedOdds = e.map((item, index) => {
    const reversedIndex = e.length - index - 1;
    return { ...item, odd: e[reversedIndex].odd };
  });

  console.log(e);
  console.log(reversedOdds);
  //Fixing the Odds to Scores
  const homeOdds = reversedOdds.map((item) => {
    if (
      item.value === "1:0" ||
      item.value === "2:0" ||
      item.value === "2:1" ||
      item.value === "3:0" ||
      item.value === "3:1" ||
      item.value === "3:2" ||
      item.value === "4:0" ||
      item.value === "4:1" ||
      item.value === "4:2" ||
      item.value === "4:3"
    ) {
      return (
        <div>
          <div className="odd-sl d-flex" onClick={toggleModal}>
            <span className="me-auto odd-sl-span-1">
              {/* <input className="odd-sl" value={item.value} /> */}
              {item.value}
            </span>
            <span className="odd-sl-span-2">
              {convertToPercentage(Number(item.odd))}
            </span>
          </div>
        </div>
      );
    }
  });

  const drawOdds = reversedOdds.map((item) => {
    if (
      item.value === "0:0" ||
      item.value === "1:1" ||
      item.value === "2:2" ||
      item.value === "3:3" ||
      item.value === "4:4"
    ) {
      return (
        <div className="odd-sl d-flex" onClick={toggleModal}>
          <span className="me-auto odd-sl-span-1">{item.value}</span>
          <span className="odd-sl-span-2">
            {convertToPercentage(Number(item.odd))}
          </span>
        </div>
      );
    }
  });

  const awayOdds = reversedOdds.map((item) => {
    if (
      item.value === "0:1" ||
      item.value === "0:2" ||
      item.value === "1:2" ||
      item.value === "0:3" ||
      item.value === "1:3" ||
      item.value === "2:3" ||
      item.value === "0:4" ||
      item.value === "1:4" ||
      item.value === "2:4" ||
      item.value === "3:4"
    ) {
      return (
        <div>
          <div className="odd-sl d-flex" onClick={toggleModal}>
            <span className="me-auto odd-sl-span-1">{item.value}</span>
            <span className="odd-sl-span-2">
              {convertToPercentage(Number(item.odd))}
            </span>
          </div>
        </div>
      );
    }
  });

  // const draw4 = e.map((item) => {
  //   if (item.value === "4:4") {
  //     return (
  //       <div>
  //         <div className="odd-4 d-flex" onClick={toggleModal}>
  //           <span className="me-auto odd-sl-span-1">{item.value}</span>
  //           <span className="odd-sl-span-2">
  //             {convertToPercentage(Number(item.odd))}
  //           </span>
  //         </div>
  //       </div>
  //     );
  //   }
  // });

  // const bookmakers = filteredIdOdd.map((item) => item.bookmakers);
  // console.log(bookmakers);

  // const bookmaker = bookmakers.map((item) => {
  //   console.log(item.bets);
  //   if (
  //     item.name === "Bet365" ||
  //     item.name === "1xBet" ||
  //     item.name === "Betway" ||
  //     item.name === "10Bet"
  //   ) {
  //     console.log(item.bets);
  //   }
  // });

  // console.log(bookmaker);

  return (
    <>
    <OddNav />
      {validId.length === 1 ? (
        <div className="">
          <div className="margin">
            {filteredIdGame.map((value) => (
              <div className="odd-div odd-div-color" key={value.fixture.id}>
                <div className="odd-div-color ms-3 odd-league-name d-flex ">
                  <div className="odd-div-color mt-2 me-2 ">
                    <small className="me-auto d-none " id="startDate">
                      {value.fixture.timestamp}
                    </small>
                    <img
                      id="leagueFlag"
                      src={value.league.flag}
                      alt="flag"
                      style={{ width: "17px" }}
                    />
                  </div>
                  <div
                    id="leagueName"
                    className="odd-div-color opacity-50 mt-2 "
                  >
                    {value.league.country} {value.league.name}
                  </div>
                </div>

                <div className="odd-div-color  odd-div-2 d-flex  mt-4 ">
                  <div className="odd-div-color width-1 ">
                    <div className="odd-div-color d-flex flex-column align-items-center ">
                      <img
                        id="homeLogo"
                        src={value.teams.home.logo}
                        alt="logo"
                        className="rounded-circle"
                        style={{ width: "40px" }}
                      />
                      <p id="homeName" className="odd-div-color text-center">
                        {leagueShortName(value.teams.home.name)}
                      </p>
                    </div>
                    <div className="odd-div-color opacity-75 odd-img-text "></div>
                  </div>
                  {/* <div className="odd-div-color ">
                    <div className="odd-div-color odd-img-div ">
                      <img
                        id="homeLogo"
                        src={value.teams.home.logo}
                        alt="logo"
                        className="rounded-circle"
                        style={{ width: "40px" }}
                      />
                    </div>
                    <div className="odd-div-color opacity-75 odd-img-text ">
                      <p id="homeName" className="">
                        {leagueShortName(value.teams.home.name)}
                      </p>
                    </div>
                  </div> */}

                  <div className="odd-div-color odd-time-div d-flex flex-column align-items-center">
                    <div className="odd-div-color d-flex ">
                      <div className="odd-div-color odd-time-1">
                        {" "}
                        {padNum(
                          timestampToReal(value.fixture.timestamp).getHours()
                        )}
                      </div>
                      <div className="odd-div-color odd-time-2 ">:</div>
                      <div className="odd-div-color odd-time-3 ">
                        {padNum(
                          timestampToReal(value.fixture.timestamp).getMinutes()
                        )}
                      </div>
                    </div>
                    <div className="odd-div-color odd-date opacity-50 ">
                      {timestampToDateAndMonth(value.fixture.timestamp)}
                    </div>
                  </div>
                  {/* <div className="odd-div-color odd-time-div ps-5 d-flex flex-column align-items-center">
                    <div className="odd-div-color d-flex ">
                      <div className="odd-div-color odd-time-1"> 03</div>
                      <div className="odd-div-color odd-time-2 ">:</div>
                      <div className="odd-div-color odd-time-3 ">00</div>
                    </div>
                    <div className="odd-div-color odd-date opacity-50 ">
                      Apr 12
                    </div>
                  </div> */}

                  <div className="odd-div-color width-2 ">
                    <div className="odd-div-color d-flex flex-column align-items-center ">
                      <img
                        id="awayLogo"
                        src={value.teams.away.logo}
                        alt="logo"
                        className="rounded-circle"
                        style={{ width: "40px" }}
                      />
                      <p id="awayName" className="odd-div-color text-center">
                        {leagueShortName(value.teams.away.name)}
                      </p>
                    </div>
                  </div>
                  {/* <div className="odd-div-color ">
                    <div className="odd-div-color odd-img-div-2 ">
                      <img
                        id="awayLogo"
                        src={value.teams.away.logo}
                        alt="logo"
                        className="rounded-circle"
                        style={{ width: "40px" }}
                      />
                    </div>
                    <div className="odd-div-color ps-5">
                      <div className="odd-div-color odd-img-text-2 opacity-75 ">
                        <p id="awayName" className="">
                          {leagueShortName(value.teams.away.name)}
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}

            {/* Correct scores */}
            <div className="odd-cs">Correct Score</div>

            <div className="odd-score-div">
              <div className="odd-score-div-2">
                <div className="d-flex odd-score-div-3">
                  <div>
                    {/* Home Team here */}
                    {filteredIdGame.map((value) => (
                      <div className="odd-c-name-1">
                        <p className="text-center odd-c-text">
                          {leagueShortName2(value.teams.home.name)}
                        </p>
                      </div>
                    ))}
                    {homeOdds}
                    {/* <div className="odd-c-name-1">
                      <p className="text-center odd-c-text">Kashiwa Reysol</p>
                    </div>
                    
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">1-0</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">2-0</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">2-1</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">3-0</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">3-1</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">3-2</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">4-0</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">4-1</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">4-2</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">4-3</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div> */}
                  </div>
                  <div>
                    {/* Draw */}
                    <div className="odd-c-name-2">
                      <p className="text-center odd-c-text">Draw</p>
                    </div>
                    {drawOdds}
                    {/* <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">0-0</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">1-1</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">2-2</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">3-3</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div> */}
                  </div>
                  <div>
                    {/* Away */}
                    {filteredIdGame.map((value) => (
                      <div className="odd-c-name-3">
                        <p className="text-center odd-c-text">
                          {leagueShortName2(value.teams.away.name)}
                        </p>
                      </div>
                    ))}
                    {awayOdds}
                    {/* <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">0-1</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">0-2</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">1-2</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">0-3</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">1-3</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">2-3</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">0-4</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">1-4</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">2-4</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div>
                    <div className="odd-sl d-flex" onClick={toggleModal}>
                      <span className="me-auto odd-sl-span-1">3-4</span>
                      <span className="odd-sl-span-2">7.80</span>
                    </div> */}
                  </div>
                </div>

                {/* {draw4} */}
                {/* <div className="odd-4 d-flex" onClick={toggleModal}>
                  <span className="me-auto odd-sl-span-1">4-4</span>
                  <span className="odd-sl-span-2">7.80</span>
                </div> */}
              </div>

              <div className="odd-about container fixed-bottom">
                <p className="odd-about-div text-center">About Anti Score</p>
              </div>
            </div>
            {isOpen && (
              <div className="modal-overlay" onClick={handleCloseModal}>
                <Bet
                  correctScore={modalData.correctScore}
                  oddPer={modalData.oddPer}
                  profit={modalData.profit}
                  leagueName={modalData.leagueName}
                  homeName={modalData.homeName}
                  awayName={modalData.awayName}
                  homeLogo={modalData.homeLogo}
                  awayLogo={modalData.awayLogo}
                  leagueFlag={modalData.leagueFlag}
                  startDate={modalData.startDate}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div><NoData/></div>
      )}
    </>
  );
};

export default Odd;
