// DataContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();
const localStorageKey = "myData"; // Key for localStorage
const localStorageKey2 = "myData2"; // Key for localStorage

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);

  //Fetching odds
  // localStorage.clear();
  // localStorage.removeItem(localStorageKey);
  // localStorage.removeItem("lastUpdateDate");

  useEffect(() => {
    //fetchData();
  }, [page]); // Fetch data when page changes

  const fetchData = async () => {
    try {
      const localStorageData = localStorage.getItem(localStorageKey);
      const localStorageLastUpdatedDate =
        localStorage.getItem("lastUpdatedDate");

      if (localStorageData && localStorageLastUpdatedDate) {
        const parsedData = JSON.parse(localStorageData);
        const currentDate = new Date().toISOString().split("T")[0];

        // Check if data is up-to-date
        if (currentDate === localStorageLastUpdatedDate) {
          setAllData(parsedData);
          console.log("Odd Data is up-to-date:", parsedData);
          return; // Stop here if data is up-to-date
        }
      }

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
      if (page < 4) {
        // Update state with new data and page number
        setAllData((prevData) => [...prevData, ...newData.response]);
        setPage((prevPage) => prevPage + 1);
      } else {
        // All data fetched, log or use allData here
        console.log("All data fetched:", allData);

        // Store data and lastUpdatedDate in localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(allData));
        const currentDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("lastUpdatedDate", currentDate);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error gracefully
    }
  };

  //console.log(allData);

  //Fetching Data 2
  const [allData2, setAllData2] = useState([]);
  const [page2, setPage2] = useState(5);

  //Fetching odds
  // localStorage.clear();
  // localStorage.removeItem(localStorageKey2);
  // localStorage.removeItem("lastUpdateDate");

  useEffect(() => {
    //fetchData2();
  }, [page2]); // Fetch data when page changes

  const fetchData2 = async () => {
    try {
      const localStorageData = localStorage.getItem(localStorageKey2);
      const localStorageLastUpdatedDate =
        localStorage.getItem("lastUpdatedDate");

      if (localStorageData && localStorageLastUpdatedDate) {
        const parsedData = JSON.parse(localStorageData);
        const currentDate = new Date().toISOString().split("T")[0];

        // Check if data is up-to-date
        if (currentDate === localStorageLastUpdatedDate) {
          setAllData(parsedData);
          console.log("Odd2 Data is up-to-date:", parsedData);
          return; // Stop here if data is up-to-date
        }
      }

      // Data not found in localStorage or not up-to-date, fetch from API
      const currentDate = new Date().toISOString().split("T")[0];
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/odds",
        params: { date: currentDate, page: page2 },
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
      if (page2 < 8) {
        // Update state with new data and page number
        setAllData2((prevData) => [...prevData, ...newData.response]);
        setPage2((prevPage) => prevPage + 1);
      } else {
        // All data fetched, log or use allData here
        console.log("All data fetched:", allData2);

        // Store data and lastUpdatedDate in localStorage
        localStorage.setItem(localStorageKey2, JSON.stringify(allData2));
        const currentDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("lastUpdatedDate", currentDate);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error gracefully
    }
  };

  //console.log(allData2);

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
          console.error("Error fetching data from API:", error);
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

    fetchData();
  }, []);

  //Fetching Odds
  // useEffect(() => {
  //   fetchData();
  // }, [page]); // Fetch data when page changes

  // const fetchData = async () => {
  //   const options = {
  //     method: "GET",
  //     url: "https://api-football-v1.p.rapidapi.com/v3/odds",
  //     params: { date: "2024-04-14", page },
  //     headers: {
  //       "X-RapidAPI-Key": "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
  //       "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //     },
  //   };
  //   try {
  //     const currentDate = new Date().toISOString().split("T")[0];
  //     const response = await axios.request(options);
  //     const newData = response.data;

  //     if (newData.results > 0) {
  //       // Update state with new data and page number
  //       setAllData((prevData) => [...prevData, ...newData.response]);
  //       setPage((prevPage) => prevPage + 1);
  //     } else {
  //       // All data fetched, log or use allData here
  //       console.log("All data fetched:", allData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // Handle error gracefully
  //   }
  // };

  //console.log(allData);

  return (
    <DataContext.Provider value={{ data, allData }}>
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
