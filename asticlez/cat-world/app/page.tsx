"use client";

import { useState, useEffect } from "react";

// Define the type for a Cat
interface Cat {
  id: number;
  name: string;
  color: string;
}

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]); // Array of Cat objects
  const [name, setName] = useState<string>(""); // Name input state
  const [color, setColor] = useState<string>(""); // Color input state

  // Fetch cats data on component mount
  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    const res = await fetch("/api/cats");
    if (res.ok) {
      const data: Cat[] = await res.json(); // Expect an array of Cat objects
      setCats(data);
    }
  };

  const addCat = async () => {
    if (!name.trim() || !color.trim()) {
      alert("Name and color are required!");
      return;
    }

    const res = await fetch("/api/cats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, color }),
    });

    if (res.ok) {
      fetchCats();
      setName(""); // Clear the name field
      setColor(""); // Clear the color field
    }
  };

  const deleteCat = async (id: number) => {
    const res = await fetch("/api/cats", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) fetchCats();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome to the Cat World!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Static Card */}
        <div className="border p-4 rounded shadow-lg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg"
            alt="Cat"
            className="rounded mb-4"
          />
          <h2 className="text-xl font-bold">Name: Maew meo 1</h2>
          <p className="text-gray-600">Color: white</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Edit
          </button>
        </div>

        {/* Dynamic Cards */}
        {cats.map((cat) => (
          <div
            key={cat.id}
            className="border p-4 rounded shadow-lg flex flex-col"
          >
            <h2 className="text-xl font-bold">Name: {cat.name}</h2>
            <p className="text-gray-600">Color: {cat.color}</p>
            <div className="flex justify-between mt-4">
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

      {/* Add New Cat Form */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Add a New Cat</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 flex-1"
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border p-2 flex-1"
          />
          <button
            onClick={addCat}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}