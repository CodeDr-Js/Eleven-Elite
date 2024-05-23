// DataContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// import {
//   retriveData,
//   IDBConfig,
//   saveStoreObj, // Import the new function
// } from "./index_db";
import { useCookies } from "react-cookie";
import { API } from "../api-service/api-service";
import { useNavigate } from "react-router-dom";
import { getRealTimeDate, range } from "../qickfun/qickfun";
import worker from "../../worker";
import WebWorker, { fetchUsers } from "../../WebWorker";
let client_timezone,client_date_str;
const webWorker = new WebWorker(worker);



const DataContext = createContext();
const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token,setToken, removeToken] = useCookies(["auth-token"]);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [checkData, setCheckData] = useState();
  const [page, setPage] = useState(1);
  const [activities_g, setActivities_g] = useState({});
  const [openBet_g, setOpenBet_g] = useState({});
  const [settled_g, setSettled_g] = useState({});
  const [user_g, setUser_g] = useState({});
  const [activeToken, setActiveToken] = useState("");
  const [result, setResult] = useState({});
  const [notification, setNotification] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [invite , setInvite] = useState(null);
  const [pending, setPending] = useState(null);
  const [loadingNew, setLoadingNew] = useState();

 // console.log(allData);
  
  const checkToken = () => {
    const token1 = token["auth-token"];
    if (token1 ) {
      //console.log("token", token1);
      setActiveToken(token1)
    } else {
      setActiveToken("");
    }

  }


  useEffect(()=> {
    checkToken();
  }, [token])
  
  useEffect(() => {
    dbFetch()
  },[])

  // useEffect(() => {
  //   dbFetch(true)
  // },[])

  //console.log(data, allData);
  //handling logout token
   const handleLogout = async () => {
     try {
      API.logout(token['auth-token'])
      .then((result)=> {
        console.log(result);
        if(result.success) {
          removeToken("auth-token");
        } else {
           removeToken("auth-token");
        }
      })
     } catch (error) {
        console.log(error);
     }
     ;
   };
  // const dbFetch = async () => {
  //   try {
  //     // Check if data is found in IndexedDB storage
  //     const currentDateNow = new Date().toISOString().split("T")[0];
  //     // const expiredDate = "2024-04-18";

  //     const retriveOldData = await retriveData(currentDateNow);

  //     const timeOut = setInterval(() => {
  //       // const dbData = IDBConfig.working_dir.data;
  //       if (IDBConfig.working_dir !== null) {
  //         clearInterval(timeOut);
  //         run();
  //       }
  //     }, 100);

  //     const run = () => {
  //       const dbData = IDBConfig.working_dir.data;
  //       // console.log(Object.keys(dbData).length);
  //       //console.log(Object.keys(dbData)[0]);
  //       if (!Object.keys(dbData)[0]) {
  //         fetchOddData(dbData);
  //         fetchFixtures(dbData);

  //         //saveStoreObj(IDBConfig.working_dir);
  //         //Object.assign(dbData, { fixture, odds });
  //       } else {
  //         setData(IDBConfig.working_dir.data.fixtures);
  //         console.log("Data is up to date", IDBConfig.working_dir);
  //       }

  //       if (!Object.keys(dbData).includes("odds")) {
  //         fetchOddData(dbData);
  //       } else {
  //         console.log("Odd is found", IDBConfig.working_dir.data.odds);
  //         setAllData(IDBConfig.working_dir.data.odds);
  //       }
  //       console.log(IDBConfig);
  //     };
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   //dbFetch();
  // }, [page]);

  // const fetchOddData = async (dbData) => {
  //   try {
  //     const currentDate = new Date().toISOString().split("T")[0];
  //     const options = {
  //       method: "GET",
  //       url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //       params: { date: currentDate, page },
  //       //params: { date: "2024-04-27", page },
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
  //     if (page < 10) {
  //       // Update state with new data and page number
       
  //       setAllData((prevData) => [...prevData, ...newData.response]);
  //       setPage((prevPage) => prevPage + 1);
  //     } else {
  //       // All data fetched, log or use allData here
  //       console.log("All data fetched:", allData);
  //       Object.assign(dbData, { odds: allData });
  //       console.log(IDBConfig.working_dir);
  //       saveStoreObj(IDBConfig.working_dir);

  //       // Store data and lastUpdatedDate in localStorage
  //       const currentDate = new Date().toISOString().split("T")[0];
  //       // await updateDataInIndexedDB(db, allData); // Update data in IndexedDB
  //       // await setLastUpdateDate(db, currentDate);
  //     }
  //     console.log({ page });
  //   } catch (error) {}
  // };

  // async function fetchFixtures(dbData) {
  //   try {
  //     // Get the current date
  //     const currentDate = new Date().toISOString().split("T")[0];
  //     // console.log(currentDate);

  //     // Fetch data from the API
  //     const options = {
  //       method: "GET",
  //       url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
  //       params: { date: currentDate },
  //       //params: { date: "2024-04-27" },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
  //         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //       },
  //     };

  //     const newData = await axios.request(options);
  //     setData(newData.data.response);

  //     // Save data and current date to localStorage
  //     //  localStorage.setItem("data", JSON.stringify(newData.data.response));
  //     //  localStorage.setItem("lastUpdateDate", currentDate);
  //     Object.assign(dbData, { fixtures: newData.data.response });
  //     console.log(IDBConfig.working_dir);
  //     saveStoreObj(IDBConfig.working_dir);

  //     // console.log("Data saved to localStorage:", data);
  //   } catch (error) {
  //     console.error("Error fetching data from API:", error);
  //   }
  // }
  function addHours(date,hours,action = "add") { if (action === 'remove') { date.setHours(date.getHours() - hours); } else { date.setHours(date.getHours() + hours); }; return date; }

  // useEffect(()=> {
  //   // console.log("LoadingNew:",loadingNew);
  //   // if(loadingNew){
     
  //   // }
  //   dbFetch(true);
  // }, [])

  const dbFetch = async (req_next_date=false) => {
     try {
       // Check if data is found in IndexedDB storage
       let client = await getRealTimeDate() ;
       client_timezone=client.timezone
    //   console.log({client});
       let currentDateNow = new Date(client.datetime).toISOString().split("T")[0];
       
       if(req_next_date){
         let add_24 =  addHours(new Date(currentDateNow),24);
         currentDateNow=add_24.toISOString().split("T")[0]
       }
       // let remove_24 =  addHours(new Date(currentDateNow),24,'remove')

       // console.log({add_24,remove_24})

       // currentDateNow=remove_24.toISOString().split("T")[0]
       // currentDateNow=add_24.toISOString().split("T")[0]

       client_date_str=currentDateNow

       webWorker.postMessage([currentDateNow,client_timezone,client_date_str]);
     
       webWorker.addEventListener('message', (event) => {
         let webWorkerData = event.data;
      //   console.log({webWorkerData});
         if (webWorkerData.type=='setData'){
           setData(webWorkerData.data)
         }else{
          // setAllData((prevData) => ({
          //   ...prevData,
          //   data: {
          //     ...prevData.data,
          //     ...webWorkerData.data,
          //   },
          // }));
         
           setAllData((prevData) => [...prevData, ...webWorkerData.data])
            if(webWorkerData.lastPage) {setCheckData(true)
        //      console.log("Last page updated success:");
            }
         }
       });
     } catch (error) {console.log(error);}
 };

  // const fetchOddData = async (dbData,currentDate) => {

  //   console.log('NOW RUNNING ODDS FUNC');
  //   if(!Object.keys(dbData).includes('odds')){dbData['odds']=[]}

    
  //   /** 
  //    const retrieve_odds
  //    try to retrive the odd data from server
  //    !dbData.total_page
  //    const server_odd_data = await API.fetchOdd({req_date:client_date_str,timezone:client_timezone})
  //    console.log({server_odd_data})
  //   */
   
  //   const request_APi = async (page) =>{
  //     const options = {
  //       method: "GET",
  //       url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //       params: { date: currentDate, page },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
  //         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //       },
  //     };

  //     const response = await axios.request(options)
  //     return response.data
  //   }

      
  //   if(!dbData.total_page||dbData.total_page>dbData.run_list.current_page){
  //     // update IDB odd data with football APi ODD    

  //     let loop_paginations,newData;
      
  //     if(!dbData.total_page){ 

  //       let page1 = await request_APi(1);

  //       // set Datas >><<
  //       dbData.run_list = { 
  //         to_run:range(0,page1.paging.total),
  //         ran:[0],
  //         current_page:1
  //       }
      
  //       dbData['odds'].push(...page1.response);
  //       dbData.total_page=page1.paging.total;

  //       saveStoreObj(IDBConfig.working_dir)
  //       setAllData((prevData) => [...prevData, ...page1.response])
        
  //       // save odd page to server

  //     }

  //     // filter pages left from pages available
  //     loop_paginations = dbData.run_list.to_run.filter(function(item) {
  //       return !dbData.run_list.ran.includes(item) ? true : false;
  //     });

  //     console.log({loop_paginations});
     
  //     //loop pages left to save >><<
  //     loop_paginations.map(async (page,index) => {
         
  //        let odds_pagination =  await request_APi(page)
          
  //        console.log('UPDATING>><<',{odds_pagination:odds_pagination.response,page})
            
  //         dbData['odds'].push(...odds_pagination.response);
  //         dbData.run_list.current_page += 1
  //         dbData.run_list.ran[page]=page

  //         saveStoreObj(IDBConfig.working_dir) //save to IDB
  //         setAllData((prevData) => [...prevData, ...odds_pagination.response]); //send to users element
          
  //         // save odd page to server
           
  //         if (dbData.run_list.current_page>=dbData.run_list.to_run.length){
  //           console.log('DONE LOOPING ',{IDBConfig})
  //         }

  //     });
  //   }
   
  // }

  // async function fetchFixtures(dbData,currentDate) {
  //   try {
  //     // Get the current date
  //     // const currentDate = new Date().toISOString().split("T")[0];
  //     // console.log(currentDate);

  //     // Fetch data from the API
  //     const options = {
  //       method: "GET",
  //       url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
  //       params: { date: currentDate },
  //       //params: { date: "2024-04-25" },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
  //         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //       },
  //     };

  //     const newData = await axios.request(options);
  //     setData(newData.data.response);
  //     Object.assign(dbData, { fixtures: newData.data.response });
  //     saveStoreObj(IDBConfig.working_dir); //save to index DB
  //     API.saveFixtures({timezone:client_timezone,fixtures:newData.data.response,req_date:client_date_str}) //save to server
    
  //     // console.log("Data saved to localStorage:", data);
  //   } catch (error) {
  //     console.error("Error fetching data from API:", error);
  //   }
  // }

  async function getUserData() {
   
    //console.log("Token sending....", activeToken);
   
    if (activeToken || token["auth-token"]) {
      //console.log("token", activeToken);
      API.retrieveData(activeToken || token["auth-token"]).then((result) => {
        //console.log("Running API retrieve always",result);
        //console.log("Running API retrieve always");
        if(result.success || result.message === "success") {

          setResult(result); 
          setActivities_g(result.activities);
          setUser_g(result.user);
          setSettled_g(result.activities.bet.settled);
          setOpenBet_g(result.activities.bet.openbet);
        } else if(result.detail) {
          //console.log("removing token");
          navigate("/login")
          setActiveToken("");
          removeToken("auth-token");
          //console.log("It has removed the token and the token is :",token["auth-token"]);;

        }
       
      }).catch((err)=> console.log(err))
    } else {
      //console.log("Token not found");
      //removeToken('auth-token');
      setActiveToken("");
      setActivities_g([]);
      setUser_g([]);
    }
  }
  useEffect(() => {
    getUserData();
  }, [activeToken]);

  // useEffect(() => {
  //   API.notification(token["auth-token"])
  //   .then((result) => {
  //     console.log(result);
  //     if(result.success) {
  //       setNotification(result.activities.notification)
  //     }
  //   })
  //   .catch((err) => console.log(err))
  // }, [0])


  // useEffect(() => {
  //   API.promotion(token["auth-token"])
  //   .then((result) => {
  //     if(result.success) {
  //       setPromotion(result)
  //     }
  //   })
  //   .catch((err) => console.log(err))
    
  // }, [0]);


  // useEffect(() => {
  //   API.invite(token["auth-token"])
  //   .then((result) => {
  //     if(result.success) {
  //       setInvite(result)
  //       console.log("Console loggin invite_reward:",result);
  //     }
     
  //   })
  //   .catch((err) => console.log(err))
  // }, [0])

  // useEffect(() => {
  //   API.pending(token["auth-token"])
  //   .then((result) => {
  //     console.log("Pending datas",result);
  //     if(result.success) {
  //       setPending(result)
  //     }
  //   })
  //   .catch((err) => console.log(err))
  // }, [0])

  //console.log(activities_g);

  return (
    <DataContext.Provider
      value={{ data, allData, activeToken, activities_g, setActivities_g, user_g, setUser_g, openBet_g, setOpenBet_g, settled_g, setSettled_g, setActiveToken, result, setResult, notification, setNotification, promotion, setPromotion , pending, setPending , invite, setInvite, checkData, setCheckData, loadingNew, setLoadingNew }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

//WORLD DATE
// async function getCurrentDate1() {
//     try {
//       // Make a GET request to the World Time API to get the current time
//       const response = await fetch("http://worldtimeapi.org/api/ip");

//       // Check if the response is successful
//       if (!response.ok) {
//         throw new Error("Failed to fetch time from API");
//       }

//       // Parse the JSON response
//       const data = await response.json();

//       // Extract the date from the response
//       const date = data.datetime.split("T")[0];

//       return date;
//     } catch (error) {
//       console.error("Error fetching time from API:", error);
//       return null;
//     }
//   }

//   // Example usage:
//   console.log(getCurrentDate1());

//   getCurrentDate1().then((currentDate) => {
//     localStorage.setItem("date", currentDate);
//     setDate(localStorage.getItem("date"));
//   });

// async function fetchDataAndUpdateLocalStorage() {
//   try {
//     // Fetch data from the API
//     const response = await fetch("https://api.example.com/data");
//     const data = await response.json();

//     // Get the current date
//     const currentDate = new Date().toISOString().split("T")[0];

//     // Save data and current date to localStorage
//     localStorage.setItem("apiData", JSON.stringify(data));
//     localStorage.setItem("lastUpdateDate", currentDate);

//     console.log("Data saved to localStorage:", data);
//   } catch (error) {
//     console.error("Error fetching data from API:", error);
//   }
// }

// function getDataFromLocalStorage() {
//   const storedData = localStorage.getItem("apiData");
//   const lastUpdateDate = localStorage.getItem("lastUpdateDate");

//   if (storedData && lastUpdateDate) {
//     // Check if data is up-to-date
//     const currentDate = new Date().toISOString().split("T")[0];
//     if (currentDate === lastUpdateDate) {
//       console.log("Data is up-to-date:", JSON.parse(storedData));
//     } else {
//       // Fetch new data and update localStorage
//       fetchDataAndUpdateLocalStorage();
//     }
//   } else {
//     // Data not found in localStorage, fetch it from the API
//     fetchDataAndUpdateLocalStorage();
//   }
// }

// // Example usage:
// getDataFromLocalStorage();

//OLD FETCHED DATA CODE

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedData = localStorage.getItem("data");
//         // const storedDate = localStorage.getItem("date");

//         if (storedData) {
//           setData(JSON.parse(storedData));
//         } else {
//           const options = {
//             method: "GET",
//             url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
//             params: { date: date },
//             // params: { date: "2024-04-13" },
//             headers: {
//               "X-RapidAPI-Key":
//                 "04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe",
//               "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//             },
//           };

//           const newData = await axios.request(options);
//           setData(newData.data.response);
//           localStorage.setItem("data", JSON.stringify(newData.data.response));
//           // localStorage.setItem("date", date);
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

//USER DATE
// function getCurrentDate() {
//   // Create a new Date object for the current time
//   var currentDate = new Date();

//   // Extract the various components of the date
//   var year = currentDate.getFullYear();
//   var month = currentDate.getMonth() + 1; // Months are zero-based
//   var day = currentDate.getDate();

//   // Format the date components
//   var formattedDate =
//     year +
//     "-" +
//     (month < 10 ? "0" : "") +
//     month +
//     "-" +
//     (day < 10 ? "0" : "") +
//     day;

//   return formattedDate;
// }
