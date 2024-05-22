import React, { useState, useEffect } from "react";

function IndexedDBExample() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    // Open or create IndexedDB database
    const openDB = async () => {
      const request = window.indexedDB.open("myDatabase", 1);

      request.onerror = (event) => {
        console.error("IndexedDB error:", event.target.error);
      };

      request.onsuccess = (event) => {
        console.log("IndexedDB opened successfully");
        setDb(event.target.result);
      };

      request.onupgradeneeded = (event) => {
        console.log("IndexedDB upgrade needed");
        const db = event.target.result;
        const store = db.createObjectStore("myStore", {
          keyPath: "id",
          autoIncrement: true,
        });
        // Define store indexes if needed
      };
    };

    openDB();
  }, []);

  const addItem = async () => {
    const transaction = db.transaction(["myStore"], "readwrite");
    const store = transaction.objectStore("myStore");
    const newItem = { name: "New Item" };

    const request = store.add(newItem);

    request.onsuccess = () => {
      console.log("Item added to IndexedDB");
    };

    request.onerror = (event) => {
      console.error("Error adding item to IndexedDB:", event.target.error);
    };
  };

  const fetchItems = async () => {
    const transaction = db.transaction(["myStore"], "readonly");
    const store = transaction.objectStore("myStore");
    const request = store.getAll();

    request.onsuccess = () => {
      console.log("Items fetched from IndexedDB:", request.result);
    };

    request.onerror = (event) => {
      console.error("Error fetching items from IndexedDB:", event.target.error);
    };
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <button onClick={fetchItems}>Fetch Items</button>
    </div>
  );
}

export default IndexedDBExample;

//In this example:

// We use the useState hook to store the IndexedDB instance.
// In the useEffect hook, we open or create an IndexedDB database and set it to state.
// We define functions to add and fetch items from the database using transactions and object stores.
// We call these functions in response to user actions, like clicking buttons.
// Remember, this is a simplified example. In a real application, you might want to handle errors more gracefully, implement more complex database operations, and consider separating database logic into its own module for better organization.












