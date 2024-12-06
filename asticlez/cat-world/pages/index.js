import { useState, useEffect } from "react";

export default function Home() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    const res = await fetch("/api/cats");
    const data = await res.json();
    setCats(data);
  };

  const addCat = async () => {
    const res = await fetch("/api/cats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, color }),
    });
    if (res.ok) {
      fetchCats();
      setName("");
      setColor("");
    }
  };

  const deleteCat = async (id) => {
    const res = await fetch("/api/cats", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchCats();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Cat World!</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addCat} className="bg-blue-500 text-white p-2 rounded">
          Add Cat
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map((cat) => (
          <div key={cat.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{cat.name}</h2>
            <p className="text-gray-600">Color: {cat.color}</p>
            <button
              onClick={() => deleteCat(cat.id)}
              className="bg-red-500 text-white p-2 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}