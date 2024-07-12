import React, { useState } from "react";

const AddItem = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, description };

    fetch("http://localhost:8000/api/items/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item added:", data);
        onAdd(data);
        setName("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control w-50 mx-auto">
        <label className="form-label">
          Name:
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="form-control w-50 mx-auto">
        <label className="form-label">
          Description:
          <input
            className="form-control"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary my-3">
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
