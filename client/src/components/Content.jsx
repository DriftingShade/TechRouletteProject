import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";
import ItemDetail from "./ItemDetail";

const Content = () => {
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/items/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  const handleAddItem = (item) => {
    setData([...data, item]);
  };

  const handleItemClick = (id) => {
    setSelectedItemId(id);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="my-3">Add An Item</h2>
      <AddItem onAdd={handleAddItem} />
      {selectedItemId && <ItemDetail itemId={selectedItemId} />}
      <h3 className="my-3">Current Items</h3>
      <ul className="list-group w-50 mx-auto">
        {data.map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(item.id)}
            className="list-group-item"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;
