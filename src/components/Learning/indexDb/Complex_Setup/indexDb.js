// indexedDB.js

const dbName = "myDatabase";
const storeName = "myStore";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      reject("IndexedDB error: " + event.target.error);
    };

    request.onsuccess = (event) => {
      console.log("IndexedDB opened successfully");
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      console.log("IndexedDB upgrade needed");
      const db = event.target.result;
      const store = db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true,
      });
      // Define store indexes if needed
    };
  });
};

const addItem = (db, newItem) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.add(newItem);

    request.onsuccess = () => {
      resolve("Item added to IndexedDB");
    };

    request.onerror = (event) => {
      reject("Error adding item to IndexedDB: " + event.target.error);
    };
  });
};

const fetchItems = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject("Error fetching items from IndexedDB: " + event.target.error);
    };
  });
};

export { openDB, addItem, fetchItems };

/**
 * In this module:

We define functions for opening the database, adding items, and fetching items.
Each function returns a Promise to handle asynchronous operations.
We export these functions to be used in other parts of our application.
Now, in your React component, you can import these functions and use them:
 */