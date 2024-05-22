import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  openDB,
  addItem,
  fetchItems,
  setLastUpdateDate,
  getLastUpdateDate,
  updateDataInIndexedDB, // Import the new function
} from "./indexedDB";

function MyComponent() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchData = async (page) => {
    try {
      const db = await openDB(); // Open IndexedDB database

      // Check if data is found in IndexedDB storage
      const items = await fetchItems(db);
      if (items.length > 0) {
        console.log("Data found in IndexedDB:", items);
        return items;
      }

      const currentDate = new Date().toISOString().split("T")[0];
      const lastUpdateDate = await getLastUpdateDate(db);

      if (lastUpdateDate !== currentDate) {
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

        if (newData.results > 0) {
          await updateDataInIndexedDB(db, newData.response); // Update data in IndexedDB
          await setLastUpdateDate(db, currentDate); // Update lastUpdateDate in IndexedDB
          return newData.response;
        }
      } else {
        console.log("Data in IndexedDB is up-to-date");
        return items;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error gracefully
    }
  };

  const fetchAllData = async () => {
    let allData = [];
    let page = 1;

    while (true) {
      const newData = await fetchData(page);
      if (newData && newData.length > 0) {
        allData = [...allData, ...newData];
        page++;
      } else {
        break; // Stop fetching if no data is returned from the API
      }
    }

    setAllData(allData); // Update state with allData
  };

  return <div>{/* Render your data here using the allData state */}</div>;
}

export default MyComponent;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   openDB,
//   addItem,
//   fetchItems,
//   setLastUpdateDate,
//   getLastUpdateDate,
// } from "./indexedDB";

// function MyComponent() {
//   const [allData, setAllData] = useState([]);

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchData = async (page) => {
//     try {
//       const db = await openDB(); // Open IndexedDB database

//       // Check if data is found in IndexedDB storage
//       const items = await fetchItems(db);
//       if (items.length > 0) {
//         console.log("Data found in IndexedDB:", items);
//         return items;
//       }

//       const currentDate = new Date().toISOString().split("T")[0];
//       const lastUpdateDate = await getLastUpdateDate(db);

//       if (lastUpdateDate !== currentDate) {
//         const options = {
//           method: "GET",
//           url: "https://api-football-v1.p.rapidapi.com/v3/odds",
//           params: { date: currentDate, page },
//           headers: {
//             "X-RapidAPI-Key":
//               "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
//             "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//           },
//         };

//         const response = await axios.request(options);
//         const newData = response.data;

//         console.log(newData);

//         if (newData.results > 0) {
//           await addItem(db, newData.response); // Add new data to IndexedDB
//           await setLastUpdateDate(db, currentDate); // Update lastUpdateDate in IndexedDB
//           return newData.response;
//         }
//       } else {
//         console.log("Data in IndexedDB is up-to-date");
//         return items;
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle error gracefully
//     }
//   };

//   const fetchAllData = async () => {
//     let allData = [];
//     let page = 1;

//     while (true) {
//       const newData = await fetchData(page);
//       if (newData && newData.length > 0) {
//         allData = [...allData, ...newData];
//         page++;
//       } else {
//         break; // Stop fetching if no data is returned from the API
//       }
//     }

//     setAllData(allData); // Update state with allData
//   };

//   return <div>{/* Render your data here using the allData state */}</div>;
// }

// export default MyComponent;
