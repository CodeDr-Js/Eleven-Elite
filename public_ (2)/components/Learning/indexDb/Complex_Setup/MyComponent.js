// MyComponent.js
import React, { useState, useEffect } from "react";
import { openDB, addItem, fetchItems } from "./indexedDB";

function MyComponent() {
  const [db, setDb] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    openDB()
      .then((dbInstance) => {
        setDb(dbInstance);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddItem = () => {
    const newItem = { name: "New Item" };
    addItem(db, newItem)
      .then((message) => {
        console.log(message);
        fetchAllItems();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAllItems = () => {
    fetchItems(db)
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;
/** 
 * This setup allows you to manage IndexedDB interactions separately from your React components, making your code more modular and easier to maintain. Additionally, it provides a clear separation of concerns between database logic and UI logic.
*/