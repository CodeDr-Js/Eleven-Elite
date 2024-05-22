import React, { createContext, useContext, useEffect, useState } from "react";
import { openDB, fetchItems } from "./indexedDB"; // Import IndexedDB functions

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromIndexedDB = async () => {
      try {
        const db = await openDB();
        const items = await fetchItems(db);
        setData(items);
      } catch (error) {
        console.error("Error fetching data from IndexedDB:", error);
      }
    };

    fetchDataFromIndexedDB();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};
