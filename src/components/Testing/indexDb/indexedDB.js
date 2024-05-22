// indexedDB.js

const dbName = "myDatabase";
const storeName = "oddsStore";

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

const addItem = (db, newData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    newData.forEach((data) => {
      store.add(data);
    });

    transaction.oncomplete = () => {
      resolve("Items added to IndexedDB");
    };

    transaction.onerror = (event) => {
      reject("Error adding items to IndexedDB: " + event.target.error);
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
