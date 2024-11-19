"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Guitar {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

const GuitarPage = () => {
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editGuitar, setEditGuitar] = useState<Guitar | null>(null);

  // Fetch guitars from the API
  useEffect(() => {
    const fetchGuitars = async () => {
      const response = await fetch("/api/guitars");
      const data = await response.json();
      setGuitars(data);
    };
    fetchGuitars();
  }, []);

  // Add a new guitar
  const addGuitar = async () => {
    if (!name || !brand || !price || !imageUrl) {
      toast.error("Please fill out all fields!");
      return;
    }
    const newGuitar = { name, brand, price: Number(price), imageUrl };

    const response = await fetch("/api/guitars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGuitar),
    });

    if (response.ok) {
      const addedGuitar = await response.json();
      setGuitars((prev) => [...prev, addedGuitar]);
      toast.success("Guitar added successfully!");
      setName("");
      setBrand("");
      setPrice("");
      setImageUrl("");
    } else {
      const error = await response.json();
      toast.error(error.message || "Failed to add guitar!");
    }
  };

  // Delete a guitar
  const deleteGuitar = async (id: string) => {
    const response = await fetch("/api/guitars", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setGuitars((prev) => prev.filter((guitar) => guitar.id !== id));
      toast.success("Guitar deleted successfully!");
    } else {
      toast.error("Failed to delete guitar!");
    }
  };

  // Filter guitars based on the search query
  const filteredGuitars = guitars.filter((guitar) =>
    guitar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guitar.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Edit Guitar functionality
  const editGuitarDetails = (guitar: Guitar) => {
    setEditGuitar(guitar);
  };

  const saveChanges = async () => {
    if (!editGuitar) return;
    const { id, name, brand, price, imageUrl } = editGuitar;
    const response = await fetch(`/api/guitars`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, brand, price: Number(price), imageUrl }),
    });

    if (response.ok) {
      const updatedGuitar = await response.json();
      setGuitars((prev) =>
        prev.map((guitar) =>
          guitar.id === updatedGuitar.id ? updatedGuitar : guitar
        )
      );
      toast.success("Guitar updated successfully!");
      setEditGuitar(null);
    } else {
      toast.error("Failed to update guitar!");
    }
  };

  const cancelEdit = () => {
    setEditGuitar(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-black text-white p-5">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8">Music Shop</h1>
      <p className="text-center text-xl mb-6">The Best Place for Musical Instruments</p>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for your favorite instrument"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-md text-black mb-4"
        />
      </div>

      {/* Add New Guitar */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-md shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add a New Guitar</h2>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-black"
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-black"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md text-black"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <button
          onClick={addGuitar}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-md"
        >
          Add Guitar
        </button>
      </div>

      {/* Edit Guitar (if editing a guitar) */}
      {editGuitar && (
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-md shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Edit Guitar: {editGuitar.name}</h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              value={editGuitar.name}
              onChange={(e) =>
                setEditGuitar({ ...editGuitar, name: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md text-black"
            />
            <input
              type="text"
              value={editGuitar.brand}
              onChange={(e) =>
                setEditGuitar({ ...editGuitar, brand: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md text-black"
            />
            <input
              type="number"
              value={editGuitar.price}
              onChange={(e) =>
                setEditGuitar({ ...editGuitar, price: Number(e.target.value) })
              }
              className="p-2 border border-gray-300 rounded-md text-black"
            />
            <input
              type="url"
              value={editGuitar.imageUrl}
              onChange={(e) =>
                setEditGuitar({ ...editGuitar, imageUrl: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <button
            onClick={saveChanges}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md mb-4"
          >
            Save Changes
          </button>
          <button
            onClick={cancelEdit}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Guitar List */}
      <div className="max-w-4xl mx-auto">
        {filteredGuitars.length > 0 ? (
          filteredGuitars.map((guitar) => (
            <div
              key={guitar.id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-md shadow-md mb-4"
            >
              <div className="flex items-center">
                <img
                  src={guitar.imageUrl}
                  alt={guitar.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{guitar.name}</h3>
                  <p>Brand: {guitar.brand}</p>
                  <p>Price: ${guitar.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  onClick={() => editGuitarDetails(guitar)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => deleteGuitar(guitar.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No guitars found.</p>
        )}
      </div>
    </div>
  );
};

export default GuitarPage;