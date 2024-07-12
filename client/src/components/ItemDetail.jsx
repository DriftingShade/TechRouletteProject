import React, { useState, useEffect } from "react";

const ItemDetail = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/items/${itemId}/retrieve_item/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setItem(data))
      .catch((error) => {
        console.error("Error fetching item:", error);
        setError(error);
      });
  }, [itemId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card w-50 mx-auto my-3">
      <h3 className="card-title">Item Detail</h3>
      <div className="card-body">
        <p className="card-text">Name: {item.name}</p>
        <p className="card-text">Description: {item.description}</p>
      </div>
    </div>
  );
};

export default ItemDetail;
