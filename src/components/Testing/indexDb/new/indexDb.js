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
      store.createIndex("lastUpdateDate", "lastUpdateDate", { unique: true });
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

const setLastUpdateDate = (db, date) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.put({ lastUpdateDate: date }, "lastUpdateDate");

    request.onsuccess = () => {
      resolve("Last update date set in IndexedDB");
    };

    request.onerror = (event) => {
      reject(
        "Error setting last update date in IndexedDB: " + event.target.error
      );
    };
  });
};

const getLastUpdateDate = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const index = store.index("lastUpdateDate");
    const request = index.get("lastUpdateDate");

    request.onsuccess = () => {
      resolve(request.result ? request.result.lastUpdateDate : null);
    };

    request.onerror = (event) => {
      reject(
        "Error getting last update date from IndexedDB: " + event.target.error
      );
    };
  });
};

const updateDataInIndexedDB = (db, newData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    // Clear the existing data in the object store
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      // Add the new data to the object store
      newData.forEach((newItem) => {
        store.add(newItem);
      });

      transaction.oncomplete = () => {
        resolve("Data updated in IndexedDB");
      };

      transaction.onerror = (event) => {
        reject("Error updating data in IndexedDB: " + event.target.error);
      };
    };

    clearRequest.onerror = () => {
      reject("Error clearing data in IndexedDB: " + clearRequest.error);
    };
  });
};

export {
  openDB,
  addItem,
  fetchItems,
  setLastUpdateDate,
  getLastUpdateDate,
  updateDataInIndexedDB,
};

// const dbName = "myDatabase";
// const storeName = "myStore";

// const openDB = () => {
//   return new Promise((resolve, reject) => {
//     const request = window.indexedDB.open(dbName, 1);

//     request.onerror = (event) => {
//       reject("IndexedDB error: " + event.target.error);
//     };

//     request.onsuccess = (event) => {
//       console.log("IndexedDB opened successfully");
//       resolve(event.target.result);
//     };

//     request.onupgradeneeded = (event) => {
//       console.log("IndexedDB upgrade needed");
//       const db = event.target.result;
//       const store = db.createObjectStore(storeName, {
//         keyPath: "id",
//         autoIncrement: true,
//       });
//       // Define store indexes if needed
//       store.createIndex("lastUpdateDate", "lastUpdateDate", { unique: true });
//     };
//   });
// };

// const addItem = (db, newData) => {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([storeName], "readwrite");
//     const store = transaction.objectStore(storeName);

//     newData.forEach((data) => {
//       store.add(data);
//     });

//     transaction.oncomplete = () => {
//       resolve("Items added to IndexedDB");
//     };

//     transaction.onerror = (event) => {
//       reject("Error adding items to IndexedDB: " + event.target.error);
//     };
//   });
// };

// const fetchItems = (db) => {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([storeName], "readonly");
//     const store = transaction.objectStore(storeName);
//     const request = store.getAll();

//     request.onsuccess = () => {
//       resolve(request.result);
//     };

//     request.onerror = (event) => {
//       reject("Error fetching items from IndexedDB: " + event.target.error);
//     };
//   });
// };

// const setLastUpdateDate = (db, date) => {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([storeName], "readwrite");
//     const store = transaction.objectStore(storeName);

//     const request = store.put({ lastUpdateDate: date }, "lastUpdateDate");

//     request.onsuccess = () => {
//       resolve("Last update date set in IndexedDB");
//     };

//     request.onerror = (event) => {
//       reject(
//         "Error setting last update date in IndexedDB: " + event.target.error
//       );
//     };
//   });
// };

// const getLastUpdateDate = (db) => {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([storeName], "readonly");
//     const store = transaction.objectStore(storeName);
//     const index = store.index("lastUpdateDate");
//     const request = index.get("lastUpdateDate");

//     request.onsuccess = () => {
//       resolve(request.result ? request.result.lastUpdateDate : null);
//     };

//     request.onerror = (event) => {
//       reject(
//         "Error getting last update date from IndexedDB: " + event.target.error
//       );
//     };
//   });
// };

// export { openDB, addItem, fetchItems, setLastUpdateDate, getLastUpdateDate };
