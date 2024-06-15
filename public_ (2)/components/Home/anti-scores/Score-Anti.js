import React, {
  useEffect,
  createContext,
  useState,
  useContext,
  useRef,
} from "react";
import "./index.css";
import axios from "axios";
import { DataContext, IDBConfig, saveStoreObj} from "../../APIs/Api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CalculateStartDiff, AddImg } from "../../qickfun/qickfun";
import NoData from "../../noData/noData";
import Loader from "../../loader/loader";

const ScoreAnti = () => {
  const navigate = useNavigate();
  const {activities_g, data, allData, activeToken, setActiveToken, activities, user, checkData, setCheckDate, loadingNew, setLoadingNew,filteredFixtures } =
  useContext(DataContext);

  const [token] = useCookies(["auth-token"]);
  const [hasNewFixtureSave, sethasNewFixtureSave] = useState(false);


  //Checking for token/Activ
  useEffect(() => {
    const token1 = token["auth-token"];
    if (!token1) {
      console.log("Your token is", token1);
      navigate("/login");
      setActiveToken("")
    } else {
      setActiveToken(token1)
    }

  }, []);



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

  
  const filterIds = new Set(allData.map((item) => item.fixture.id));
  //console.log(filterIds);

  // Filtering data100 based on whether their ID exists in data20
  const filteredData = data[0] ? data.filter((item) => filterIds.has(item.fixture.id)) : "";
  console.log({filteredData});

  const e = [];
  const newGames = [ ]
  let filteredDataLen = filteredData.length

  let x= filteredData[0]? filteredData.map((game, index) => {
   
    let properties=game.properties
    
    const gameStatus = game.fixture.status.short;
    const gameStartTime = game.fixture.timestamp * 1000;
    let gameTime = CalculateStartDiff(gameStartTime);

    if (gameStatus === "NS" && !gameTime.expired) {
      e.push(game);
      
      let gameID=game.fixture.id
      let endId = "ends-" + gameID;
      let matchCard = "match-" + gameID;
      
      if (!properties) {
        console.log('Setting data')
        game.properties = {
            'volume':'1003K+',
            timestamp:new Date()
        };
        properties=game.properties;
        console.log(filteredFixtures)
        if(!IDBConfig.filteredFixtures){
          IDBConfig.filteredFixtures = [ ]
        }
        IDBConfig.filteredFixtures.push(game)
        sethasNewFixtureSave(true);
      }
      else{
        console.log('DATA EXIST>><<')
      }
      
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
                {/* <span> */}
                  {AddImg(game.teams.home.logo,[15,15,'📷'])}
                  {/* <img
                    className="me-2 rounded-circle"
                    src={game.teams.home.logo}
                    alt="Logo"
                    style={{ width: "15px" }}
                  /> */}
                {/* </span> */}
                <div>{game.teams.home.name}</div>
              </div>

              <div className="fw-bold d-flex">
                   {AddImg(game.teams.away.logo,[15,15,'📷'])}
                {/* <span> */}
                  {/* <img
                    className="me-2 rounded-circle"
                    src={game.teams.away.logo}
                    alt="Logo"
                    style={{ width: "15px" }}
                  /> */}
                {/* </span> */}
                <div>{game.teams.away.name}</div>
              </div>
            </div>
            <div className="rounded-circle volume-div ms-3 shadow ">
              <div>
                <div className="">Volume</div>
                <div>{properties.volume}</div>
              </div>
            </div>
          </div>

          <div>
            <div translate="no" id={endId} className="text-center  opacity-50 ends-in">
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
      newGames.push(scoreCard);
    }
    
    console.log({filteredDataLen,index,lastPage:IDBConfig.lastPage})
    if(index+1>=filteredData.length&&IDBConfig.lastPage&&!IDBConfig.working_dir.data.filteredData){
      IDBConfig.working_dir.data.fixtures.response=IDBConfig.filteredData;
      IDBConfig.working_dir.data.filteredData=true;
      // saveStoreObj(IDBConfig.working_dir)
      console.log(
          'DONE NOW', {IDBConfig}
      )
    }

  }) : "";

  useEffect(()=> {
    if(checkData) {
      if(e[0]) {
        setLoadingNew(true);
      }
    };
  },[])

  console.log({e})

  return  <div className="score-div-main">{newGames} {!e[0]? <Loader/>:""}</div>;
};

export default ScoreAnti;
