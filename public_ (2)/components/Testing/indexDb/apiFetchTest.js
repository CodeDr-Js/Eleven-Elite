// import React from 'react';
// import { openDB, addItem, fetchItems } from "./indexedDB"; // Import IndexedDB functions
// import { Axios } from 'axios';


// const ApiFetchTest = () => {
  

// const localStorageKey = "myData"; // Key for localStorage

// const fetchData = async (page) => {
//   try {
//     const db = await openDB(); // Open IndexedDB database

//     const currentDate = new Date().toISOString().split("T")[0];
//     const options = {
//       method: "GET",
//       url: "https://api-football-v1.p.rapidapi.com/v3/odds",
//       params: { date: currentDate, page },
//       headers: {
//         "X-RapidAPI-Key": "d027bd3bc0msh2c31f5071b16a05p191de8jsne2264e759a63",
//         "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//       },
//     };

//     const response = await axios.request(options);
//     const newData = response.data;

//     console.log(newData);

//     if (newData.results > 0) {
//       await addItem(db, newData.response); // Add new data to IndexedDB
//       return newData.response;
//     } else {
//       const items = await fetchItems(db); // Fetch all items from IndexedDB
//       console.log("All data fetched:", items);
//       return items;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Handle error gracefully
//   }
// };

//   return (
//     <div>ApiFetchTest</div>
//   )
// }

// export default ApiFetchTest