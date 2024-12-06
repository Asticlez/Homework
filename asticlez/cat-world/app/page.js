"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch("/api/cat");
      const data = await response.json();
      setCats(data);
    };
    fetchCats();
  }, []);

  const deleteCat = async (id) => {
    const response = await fetch("/api/cat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setCats(cats.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Welcome to the Cat World!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Static Card */}
        <div className="border p-4 rounded shadow-lg flex flex-col items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg"
            alt="Cat"
            className="rounded mb-4 w-full h-auto"
          />
          <h2 className="text-xl font-bold text-center">Name: Maew meo 1</h2>
          <p className="text-gray-600 text-center">Color: white</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Edit
          </button>
        </div>

        {/* Dynamic Cards */}
        {cats.map((cat) => (
          <div
            key={cat.id}
            className="border p-4 rounded shadow-lg flex flex-col items-center"
          >
            <h2 className="text-xl font-bold text-center">Name: {cat.name}</h2>
            <p className="text-gray-600 text-center">Color: {cat.color}</p>
            <div className="flex space-x-2 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button
                onClick={() => deleteCat(cat.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New and User Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button className="bg-green-500 text-white px-6 py-2 rounded">
          New
        </button>
        <button className="bg-gray-500 text-white px-6 py-2 rounded">
          User
        </button>
      </div>
    </div>
  );
}