"use client"; // Add this line at the top to mark the component as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Update the import to use next/navigation
import "./Main.css";

const initialInstruments = [
  {
    id: 1,
    name: "Acoustic Guitars",
    price: 210,
    original_price: 630,
    image_url: "https://th.yamaha.com/en/files/product_thumb_fg800_0e49b530e9cdad5d518808c174e29492.jpg?impolicy=resize&imwid=735&imhei=735",
    is_new: false,
    likes: 1578,
  },
  {
    id: 2,
    name: "Electric Guitars",
    price: 875,
    image_url: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/p/a/pacs_12m_black_front_0001.jpg",
    is_new: false,
    likes: 2300,
  },
  {
    id: 3,
    name: "Bass Guitars",
    price: 1155,
    image_url: "https://i5.walmartimages.com/seo/Costway-Black-Full-Size-4-String-Electric-Bass-Guitar-with-Strap-Guitar-Bag-Amp-Cord_896a667c-f1ae-4dd0-a501-438e0ccda5d6_1.ff1dafdfb447715aa4315e6fd34a0400.jpeg",
    is_new: false,
    likes: 99999999,
  },
  {
    id: 4,
    name: "Digital Pianos/Keyboards",
    price: 470,
    original_price: 1470,
    image_url: "https://musicspace.co.th/wp-content/uploads/2017/04/kurzweil_cup2_electric-piano.jpg",
    is_new: false,
    likes: 655,
  },
  {
    id: 5,
    name: "Drum Sets",
    price: 105.5,
    original_price: 1015,
    image_url: "https://th.yamaha.com/en/files/Image-index_LCHO_1080x1080_da372253d5402fff26f65cb70f769c67.jpg?impolicy=resize&imwid=396&imhei=396",
    is_new: false,
    likes: 0,
  },
  {
    id: 6,
    name: "Ukuleles",
    price: 1206,
    image_url: "https://marcato.co.th/wp-content/uploads/2020/07/Maestro_Ukulele_US-10.jpg",
    is_new: false,
    likes: 1,
  },
  {
    id: 7,
    name: "Saxophone",
    price: 1680,
    image_url: "https://th.yamaha.com/th/files/yts-62_bc0ccc376eb4879487e6a061ea5db9f8.jpg?impolicy=resize&imwid=396&imhei=396",
    is_new: false,
    likes: 728,
  },
  {
    id: 8,
    name: "Trumpet",
    price: 550,
    original_price: 770,
    image_url: "https://media.musicarts.com/is/image/MMGS7/463676000420000-01-720x720.jpg",
    is_new: false,
    likes: 3125,
  },
  {
    id: 9,
    name: "Clarinet",
    price: 365,
    original_price: 1365,
    image_url: "https://ralamusic.com/wp-content/uploads/2018/05/golden-cup-clarinet-JYCL1301-01.jpg",
    is_new: false,
    likes: 700,
  },
  {
    id: 10,
    name: "Violin",
    price: 1085,
    image_url: "https://www.theeramusic.com/wp-content/uploads/2021/11/MV014E-.F.jpg",
    is_new: false,
    likes: 80,
  },
];

export default function Main() {
  const router = useRouter();
  const [instruments, setInstruments] = useState<Instrument[]>(initialInstruments);
  const [searchTerm, setSearchTerm] = useState("");

  // New state for handling the input of a new instrument
  const [newInstrument, setNewInstrument] = useState<Instrument>({
    id: 0, // Temporary ID
    name: "",
    price: 0,
    image_url: "",
    original_price: undefined,
    is_new: false,
    likes: 0,
  });

  const [editMode, setEditMode] = useState(false);
  const [editingInstrumentId, setEditingInstrumentId] = useState<number | null>(null);
  
  const handleAddInstrument = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, price, image_url, original_price } = newInstrument;

    if (name && price && image_url) {
      setInstruments((prevInstruments) => [
        ...prevInstruments,
        {
          ...newInstrument,
          id: prevInstruments.length + 1, 
          price: Number(price),
          original_price: original_price ? Number(original_price) : undefined,
          likes: 0,
        },
      ]);

      setNewInstrument({
        id: 0,
        name: "",
        price: 0,
        image_url: "",
        original_price: undefined,
        is_new: false,
        likes: 0,
      });
    }
  };

  const handleEditInstrument = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, price, image_url, original_price } = newInstrument;

    if (name && price && image_url && editingInstrumentId !== null) {
      setInstruments((prevInstruments) => 
        prevInstruments.map((instrument) =>
          instrument.id === editingInstrumentId
            ? { ...instrument, name, price: Number(price), image_url, original_price: original_price ? Number(original_price) : undefined }
            : instrument
        )
      );

      
      setNewInstrument({
        id: 0,
        name: "",
        price: 0,
        image_url: "",
        original_price: undefined,
        is_new: false,
        likes: 0,
      });
      setEditMode(false);
      setEditingInstrumentId(null);
    }
  };
  
 
  const handleLike = (index: number) => {
    const updatedInstruments = [...instruments];
    updatedInstruments[index] = {
      ...updatedInstruments[index],
      likes: updatedInstruments[index].likes + 1,
    };
    setInstruments(updatedInstruments);
  };

  
  const handleDelete = (id: number) => {
    setInstruments((prevInstruments) =>
      prevInstruments.filter((instrument) => instrument.id !== id)
    );
  };

  
  const handleEditClick = (instrument: Instrument) => {
    setNewInstrument(instrument);
    setEditMode(true);
    setEditingInstrumentId(instrument.id);
  };

  
  const filteredInstruments = instruments.filter((instrument) =>
    instrument.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
      <input
        type="text"
        placeholder="Search Instruments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar border border-black rounded p-2 mb-4" // Added styles for the search bar
      />

      {/* Add New Instrument Form */}
      <form onSubmit={editMode ? handleEditInstrument : handleAddInstrument} className="mb-4">
        <h3 className="text-xl font-bold text-black">Add New Instrument</h3> {/* Set text color to black */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newInstrument.name}
            onChange={(e) =>
              setNewInstrument({ ...newInstrument, name: e.target.value })
            }
            className="flex-1 p-2 border border-black rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newInstrument.price || ""}
            onChange={(e) =>
              setNewInstrument({ ...newInstrument, price: Number(e.target.value) })
            }
            className="flex-1 p-2 border border-black rounded text-black" // Added blue text color for price input
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newInstrument.image_url}
            onChange={(e) =>
              setNewInstrument({
                ...newInstrument,
                image_url: e.target.value,
              })
            }
            className="flex-1 p-2 border border-black rounded"
            required
          />
          <input
            type="number"
            placeholder="Original Price (optional)"
            value={newInstrument.original_price || ""}
            onChange={(e) =>
              setNewInstrument({
                ...newInstrument,
                original_price: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="flex-1 p-2 border border-black rounded text-black"
          />
          <button
            type="submit"
            className={`border border-black rounded p-2 ${editMode ? 'bg-green-500' : 'bg-red-500'}`} // Color changes based on edit mode
          >
            {editMode ? "Update Instrument" : "Add Instrument"}
          </button>
        </div>
      </form>

      <div className="game-grid">
        {filteredInstruments.map((instrument, index) => (
          <div key={instrument.id} className="game-card">
            <img
              src={instrument.image_url}
              alt={instrument.name}
              className="game-image"
            />
            <div className="game-details flex items-center justify-between m-5">
              <div>
                <div className="price-tag">
                  {instrument.original_price ? (
                    <>
                      <span className="original-price text-black line-through">${instrument.original_price}</span>
                      <span className="current-price text-black">${instrument.price}</span>
                    </>
                  ) : (
                    <span className="current-price text-black">${instrument.price}</span>
                  )}
                </div>
                <h2>{instrument.name}</h2>
                <span className="likes">Likes: {instrument.likes}</span>
              </div>
              <div className="buttons flex flex-col">
                <button className="like-button" onClick={() => handleLike(index)}>Like</button>
                <button className="delete-button" onClick={() => handleDelete(instrument.id)}>Delete</button>
                <button className="edit-button" onClick={() => handleEditClick(instrument)}>Edit</button>
                <button className="view-details-button" onClick={() => router.push(`/product/${instrument.id}`)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
