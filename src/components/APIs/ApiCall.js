import React, { useEffect, createContext, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "./Api";
import {
  openDB,
  addItem,
  fetchItems,
  setLastUpdateDate,
  getLastUpdateDate,
  updateDataInIndexedDB, // Import the new function
} from "./indexedDB";

import {
  retriveData,
  IDBConfig,
  saveStoreObj, // Import the new function
} from "./index_db";

const localStorageKey = "myData"; // Key for localStorage

const ApiCall = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);

  const dbFetch = async (data) => {
    try {
      // Check if data is found in IndexedDB storage
      const currentDateNow = new Date().toISOString().split("T")[0];
      // const expiredDate = "2024-04-18";

      const retriveOldData = await retriveData(currentDateNow);

      //console.log(retriveOldData);

      // const fixture = JSON.parse(localStorage.getItem("data"));
      // const odds = JSON.parse(localStorage.getItem("myData"));

      //console.log(fixture, odds);

      const timeOut = setInterval(() => {
        const dbData = IDBConfig.working_dir.data;
        if (dbData !== null) {
          clearInterval(timeOut);
          run();
        }
      }, 100);

      const run = () => {
        const dbData = IDBConfig.working_dir.data;
        // console.log(Object.keys(dbData).length);
        //console.log(Object.keys(dbData)[0]);
        if (!Object.keys(dbData)[0]) {
          fetchOddData(dbData);
          fetchFixtures(dbData);

          //saveStoreObj(IDBConfig.working_dir);
          //Object.assign(dbData, { fixture, odds });
        } else {
          //console.log("Data is up to date", IDBConfig.working_dir);
        }

        if(!Object.keys(dbData).includes("odds")) {
          fetchOddData(dbData);
        } else {
          //console.log("Odd is found", IDBConfig.working_dir.data.odds )
        }
        //console.log(IDBConfig);
      };
    } catch (error) {}
  };

  useEffect(() => {
    dbFetch();
  }, [page]);

  const fetchOddData = async (dbData) => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/odds",
        params: { date: currentDate, page },
        headers: {
          "X-RapidAPI-Key":
            "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      const newData = response.data;

//      console.log(newData);

      // if (newData.results > 0) {
      if (page < 3) {
        // Update state with new data and page number
        setAllData((prevData) => [...prevData, ...newData.response]);
        setPage((prevPage) => prevPage + 1);
      } else {
        // All data fetched, log or use allData here
  //      console.log("All data fetched:", allData);
        Object.assign(dbData, { odds: allData });
    //    console.log(IDBConfig.working_dir);
        saveStoreObj(IDBConfig.working_dir);

        // Store data and lastUpdatedDate in localStorage
        const currentDate = new Date().toISOString().split("T")[0];
        // await updateDataInIndexedDB(db, allData); // Update data in IndexedDB
        // await setLastUpdateDate(db, currentDate);
      }
    } catch (error) {}
  };

  async function fetchFixtures(dbData) {
    try {
      // Get the current date
      const currentDate = new Date().toISOString().split("T")[0];
      // console.log(currentDate);

      // Fetch data from the API
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
        params: { date: currentDate },
        //params: { date: "2024-04-14" },
        headers: {
          "X-RapidAPI-Key":
            "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      const newData = await axios.request(options);
      setData(newData.data.response);

      // Save data and current date to localStorage
      //  localStorage.setItem("data", JSON.stringify(newData.data.response));
      //  localStorage.setItem("lastUpdateDate", currentDate);
      Object.assign(dbData, { fixtures: newData.data.response });
      //console.log(IDBConfig.working_dir);
      saveStoreObj(IDBConfig.working_dir);

      // console.log("Data saved to localStorage:", data);
    } catch (error) {
      //console.error("Error fetching data from API:", error);
    }
  }

  return;

  // // Fetching odds
  // localStorage.clear();
  // localStorage.removeItem(localStorageKey);
  // localStorage.removeItem("lastUpdateDate");

  useEffect(() => {
    fetchData();
  }, [page]); // Fetch data when page changes

  const fetchData = async () => {
    try {
      // Check if data is found in IndexedDB storage
      const currentDateNow = new Date().toISOString().split("T")[0];
      // const expiredDate = "2024-04-18";

      const retriveOldData = await retriveData(currentDateNow);

      //console.log(retriveOldData);

      const fixture = JSON.parse(localStorage.getItem("data"));
      const odds = JSON.parse(localStorage.getItem("myData"));

      //console.log(fixture, odds);

      const timeOut = setInterval(() => {
        const dbData = IDBConfig.working_dir.data;
        if (dbData !== null) {
          clearInterval(timeOut);
          run();
        }
      }, 100);

      const run = () => {
        const dbData = IDBConfig.working_dir.data;
        // console.log(Object.keys(dbData).length);
        //console.log(Object.keys(dbData)[0]);
        if (!Object.keys(dbData)[0]) {
          Object.assign(dbData, { fixture, odds });
        } else {
          //console.log("Data is up to date", IDBConfig.working_dir);
        }
        //console.log(IDBConfig);
      };
      saveStoreObj(IDBConfig.working_dir);
      return;

      // const lastUpdateDate = await getLastUpdateDate(db);

      // console.log("Datas returned first from IndexDB" + items);
      // console.log("lastUpdatedDated ruturned", lastUpdateDate);

      // if (items && lastUpdateDate) {
      //   const currentDate = new Date().toISOString().split("T")[0];

      //   // Check if data is up-to-date
      //   if (currentDate === lastUpdateDate) {
      //     setAllData(items);
      //     console.log("Odd Data is up-to-date:", items);
      //     return; // Stop here if data is up-to-date
      //   }
      // }

      // Data not found in localStorage or not up-to-date, fetch from API

      const currentDate = new Date().toISOString().split("T")[0];
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/odds",
        params: { date: currentDate, page },
        headers: {
          "X-RapidAPI-Key":
            "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      const newData = response.data;

      console.log(newData);

      // if (newData.results > 0) {
      if (page < 3) {
        // Update state with new data and page number
        setAllData((prevData) => [...prevData, ...newData.response]);
        setPage((prevPage) => prevPage + 1);
      } else {
        // All data fetched, log or use allData here
        //console.log("All data fetched:", allData);

        // Store data and lastUpdatedDate in localStorage
        const currentDate = new Date().toISOString().split("T")[0];
        // await updateDataInIndexedDB(db, allData); // Update data in IndexedDB
        // await setLastUpdateDate(db, currentDate);
      }
    } catch (error) {
      //console.error("Error fetching data:", error);
      // Handle error gracefully
    }
  };

  //console.log(allData);

  //Fetch Games
  // localStorage.clear();
  // localStorage.removeItem("data");
  // localStorage.removeItem("lastUpdateDate");

  useEffect(() => {
    const fetchData = async () => {
      async function fetchDataAndUpdateLocalStorage() {
        try {
          // Get the current date
          const currentDate = new Date().toISOString().split("T")[0];
          // console.log(currentDate);

          // Fetch data from the API
          const options = {
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
            params: { date: currentDate },
            //params: { date: "2024-04-14" },
            headers: {
              "X-RapidAPI-Key":
                "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
              "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
          };

          const newData = await axios.request(options);
          setData(newData.data.response);

          // Save data and current date to localStorage
          localStorage.setItem("data", JSON.stringify(newData.data.response));
          localStorage.setItem("lastUpdateDate", currentDate);

          // console.log("Data saved to localStorage:", data);
        } catch (error) {
        //  console.error("Error fetching data from API:", error);
        }
      }

      function getDataFromLocalStorage() {
        const storedData = localStorage.getItem("data");
        const lastUpdateDate = localStorage.getItem("lastUpdateDate");
        //console.log(lastUpdateDate);

        if (storedData && lastUpdateDate) {
          // Check if data is up-to-date
          const currentDate = new Date().toISOString().split("T")[0];
          if (currentDate === lastUpdateDate) {
            //if (lastUpdateDate === "2024-04-14") {
            setData(JSON.parse(storedData));
            console.log("Data is up-to-date:", JSON.parse(storedData));
          } else {
            // Fetch new data and update localStorage
            fetchDataAndUpdateLocalStorage();
          }
        } else {
          // Data not found in localStorage, fetch it from the API
          fetchDataAndUpdateLocalStorage();
        }
      }

      // Example usage:
      getDataFromLocalStorage();
    };

    //fetchData();
  }, []);

  // const [allData, setAllData] = useState([]);
  // const [page, setPage] = useState(1);

  // //Fetching odds
  // useEffect(() => {
  //   fetchData();
  // }, [page]); // Fetch data when page changes

  // const fetchData = async () => {
  //   try {
  //     const localStorageData = localStorage.getItem(localStorageKey);
  //     const localStorageLastUpdatedDate =
  //       localStorage.getItem("lastUpdatedDate");

  //     if (localStorageData && localStorageLastUpdatedDate) {
  //       const parsedData = JSON.parse(localStorageData);
  //       const currentDate = new Date().toISOString().split("T")[0];

  //       // Check if data is up-to-date
  //       if (currentDate === localStorageLastUpdatedDate) {
  //         setAllData(parsedData);
  //         return; // Stop here if data is up-to-date
  //       }
  //     }

  //     // Data not found in localStorage or not up-to-date, fetch from API
  //     const currentDate = new Date().toISOString().split("T")[0];
  //     const options = {
  //       method: "GET",
  //       url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //       params: { date: currentDate, page: page.toString() },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
  //         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //       },
  //     };

  //     const response = await axios.request(options);
  //     const newData = response.data;

  //     console.log(newData);

  //     // if (newData.results > 0) {
  //     if (page < 3) {
  //       // Update state with new data and page number
  //       setAllData((prevData) => [...prevData, ...newData.response]);
  //       setPage((prevPage) => prevPage + 1);

  //       // Store data and lastUpdatedDate in localStorage
  //       localStorage.setItem(localStorageKey, JSON.stringify(allData));
  //       const currentDate = new Date().toISOString().split("T")[0];
  //       localStorage.setItem("lastUpdatedDate", currentDate);
  //     } else {
  //       // All data fetched, log or use allData here
  //       console.log("All data fetched:", allData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // Handle error gracefully
  //   }
  // };

  // console.log(allData);

  // const [allData, setAllData] = useState([]);
  // const [page, setPage] = useState(1);

  // const fetchLocal = () => {
  //   const localStorageData = localStorage.getItem("code");
  //   const localStorageLastUpdatedDate = localStorage.getItem("codedr");

  //   if (localStorageData && localStorageLastUpdatedDate) {
  //     const parsedData = JSON.parse(localStorageData);
  //     console.log(parsedData);
  //     const currentDate = new Date().toISOString().split("T")[0];

  //     // // Check if data is up-to-date
  //     // if (currentDate === localStorageLastUpdatedDate) {
  //     //   setAllData(parsedData);
  //     //   console.log(allData);
  //     //   return; // Stop here if data is up-to-date
  //     // }
  //   }
  // };
  // //fetchLocal();

  // // localStorage.removeItem("code");
  // // localStorage.removeItem("codedr");
  // // localStorage.clear();

  // useEffect(() => {
  //   //fetchData();
  // }, [page]); // Fetch data when page changes

  // const fetchData = async () => {
  //   const localStorageData = localStorage.getItem("code");
  //   const localStorageLastUpdatedDate = localStorage.getItem("codedr");

  //   if (localStorageData && localStorageLastUpdatedDate) {
  //     const parsedData = JSON.parse(localStorageData);
  //     console.log(parsedData);
  //     const currentDate = new Date().toISOString().split("T")[0];

  //     // Check if data is up-to-date
  //     if (currentDate === localStorageLastUpdatedDate) {
  //       setAllData(parsedData);
  //       console.log(allData);
  //       return; // Stop here if data is up-to-date
  //     }
  //   }

  //   const options = {
  //     method: "GET",
  //     url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //     params: { date: "2024-04-15", page },
  //     headers: {
  //       "X-RapidAPI-Key": "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
  //       "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //     },
  //   };
  //   try {
  //     const response = await axios.request(options);
  //     const newData = response.data;

  //     // if (newData.results > 0) {
  //     if (page < 21) {
  //       // Update state with new data and page number
  //       setAllData((prevData) => [...prevData, ...newData.response]);
  //       setPage((prevPage) => prevPage + 3);
  //     } else {
  //       // All data fetched, log or use allData here

  //       console.log("All data fetched:", allData);
  //       console.log(allData.length);
  //       console.log(page * 10);

  //       localStorage.setItem("code", JSON.stringify(allData));
  //       const currentDate = new Date().toISOString().split("T")[0];
  //       localStorage.setItem("codedr", currentDate);

  //       setTimeout(() => {
  //         // Store data and lastUpdatedDate in localStorage
  //         console.log("All data fetched Timed:", allData);
  //         console.log(allData.length);
  //         console.log(page * 10);
  //       }, 5000);

  //       // try {
  //       //   const allDatas = await allData;
  //       //   console.log("All data fetched:", allDatas);

  //       // } catch (error) {
  //       //   console.log(error);
  //       // }
  //       // console.log("All data fetched:", allData);
  //       // console.log(allData.length);
  //       // console.log(page * 10);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // Handle error gracefully
  //   }
  // };

  // console.log(allData);

  // const testFetch = async () => {
  //   const options = {
  //     method: "GET",
  //     url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //     params: { date: "2024-04-16" },
  //     headers: {
  //       "X-RapidAPI-Key": "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
  //       "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // testFetch();

  // const dataFilter = data.filter((e) => e.fixture.status.short === "NS");

  // async function fetchOdd() {
  //   const options = {
  //     method: "GET",
  //     url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //     params: { date: "2024-04-14", page: "6" },
  //     headers: {
  //       "X-RapidAPI-Key": "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
  //       "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  //fetchOdd();

  //Fetching Odds
  // const [odds, setOdds] = useState([]);

  // async function fetchDataForIds() {
  //   try {
  //     // Create an array to store promises for fetching data
  //     const promises = dataFilter.map(async (result) => {
  //       const id = result.fixture.id;
  //       try {
  //         // Fetch data for the current ID using Axios
  //         const options = {
  //           method: "GET",
  //           url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //           params: { fixture: id.toString() },
  //           headers: {
  //             "X-RapidAPI-Key":
  //               "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
  //             "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //           },
  //         };

  //         const response = await axios.request(options);

  //         // Extract data from the response
  //         const datas = response.data;

  //         // Return the data along with the ID
  //         return { id, datas };
  //       } catch (error) {
  //         //console.error(`Error fetching data for ID ${id}:`);
  //         // Return null if there was an error fetching data for the current ID
  //         return { id, datas: null };
  //       }
  //     });

  //     // Wait for all promises to resolve
  //     const results = await Promise.all(promises);

  //     console.log(results);

  //     // Filter out results where data is null
  //     const filteredResults = results.filter((result) => result.datas !== null);
  //     console.log(filteredResults);

  //     const mapFilter = filteredResults.filter(
  //       (r) => r.datas.response.length > 0
  //     );
  //     //console.log(mapFilter);

  //     mapFilter.map((e) => {
  //       //console.log(e.id);
  //     });

  //     return filteredResults;
  //   } catch (error) {
  //     //console.error("Error fetching data:", error.message);
  //     //console.error("Error fetching data:");
  //     return [];
  //   }
  // }

  // // Example usage:
  // fetchDataForIds().then((filteredResults) => {
  //   filteredResults.map((game) => {
  //     const fewGames = game.datas.response;
  //     fewGames.map((data) => {
  //       console.log(data);
  //       console.log(data.league.fixture.id);
  //     });
  //     //console.log(game);
  //   });
  //   //console.log(filteredResults);
  // });

  const newGames = data.map((game) => {
    return <div></div>;
  });

  return <div className="score-div-main">{newGames}</div>;
};

export default ApiCall;

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
