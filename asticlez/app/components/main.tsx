"use client";
import React, { useState } from 'react';
import './Main.css';

const instruments = [
  {
    name: 'Acoustic Guitars',
    price: 210,
    original_price: 630,
    image_url: 'https://th.yamaha.com/en/files/product_thumb_fg800_0e49b530e9cdad5d518808c174e29492.jpg?impolicy=resize&imwid=735&imhei=735',
    is_new: false,
    likes: 1578,
  },
  {
    name: 'Electric Guitars',
    price: 875,
    image_url: 'https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/p/a/pacs_12m_black_front_0001.jpg',
    is_new: false,
    likes: 2300,
  },
  {
    name: 'Bass Guitars',
    price: 1155,
    image_url: 'https://i5.walmartimages.com/seo/Costway-Black-Full-Size-4-String-Electric-Bass-Guitar-with-Strap-Guitar-Bag-Amp-Cord_896a667c-f1ae-4dd0-a501-438e0ccda5d6_1.ff1dafdfb447715aa4315e6fd34a0400.jpeg',
    is_new: false,
    likes: 99999999,
  },
  {
    name: 'Digital Pianos/Keyboards',
    price: 470,
    original_price: 1470,
    image_url: 'https://musicspace.co.th/wp-content/uploads/2017/04/kurzweil_cup2_electric-piano.jpg',
    is_new: false,
    likes: 655,
  },
  {
    name: 'Drum Sets',
    price: 105.5,
    original_price: 1015,
    image_url: 'https://th.yamaha.com/en/files/Image-index_LCHO_1080x1080_da372253d5402fff26f65cb70f769c67.jpg?impolicy=resize&imwid=396&imhei=396',
    is_new: false,
    likes: 0,
  },
  {
    name: 'Ukuleles',
    price: 1206,
    image_url: 'https://marcato.co.th/wp-content/uploads/2020/07/Maestro_Ukulele_US-10.jpg',
    is_new: false,
    likes: 1,
  },
  {
    name: 'Saxophone',
    price: 1680,
    image_url: 'https://th.yamaha.com/th/files/yts-62_bc0ccc376eb4879487e6a061ea5db9f8.jpg?impolicy=resize&imwid=396&imhei=396',
    is_new: false,
    likes: 728,
  },
  {
    name: 'Trumpet',
    price: 550,
    original_price: 770,
    image_url: 'https://media.musicarts.com/is/image/MMGS7/463676000420000-01-720x720.jpg',
    is_new: false,
    likes: 3125,
  },
  {
    name: 'Clarinet',
    price: 365,
    original_price: 1365,
    image_url: 'https://ralamusic.com/wp-content/uploads/2018/05/golden-cup-clarinet-JYCL1301-01.jpg',
    is_new: false,
    likes: 700,
  },
  {
    name: 'Violin',
    price: 1085,
    image_url: 'https://www.theeramusic.com/wp-content/uploads/2021/11/MV014E-.F.jpg',
    is_new: false,
    likes: 80,
  },
];

export default function Main() {
  const [instrumentsList, setInstrumentsList] = useState(instruments);

  const handleLike = (index) => {
    const newLikes = [...instrumentsList];
    newLikes[index].likes += 1;
    setInstrumentsList(newLikes);
  };

  const handleAddInstrument = () => {
    const name = prompt('Enter the instrument name:');
    if (!name) return; // If the user cancels or enters nothing

    const priceInput = prompt('Enter the instrument price:');
    const price = parseFloat(priceInput);
    if (isNaN(price) || price < 0) {
      alert('Please enter a valid price.'); // Notify user of invalid price
      return; 
    }

    const image_url = prompt('Enter the image URL:');
    if (!image_url) return; // If the user cancels or enters nothing

    const newInstrument = {
      name,
      price,
      image_url,
      is_new: true,
      likes: 0, // Starting likes for a new instrument
    };

    setInstrumentsList((prev) => [...prev, newInstrument]);
  };

  return (
    <main className="container">
      <div className="header flex justify-between items-center">
        <h2>Trending Instruments</h2>
        <div className="flex gap-4">
          <button className="view-all hover:bg-indigo-700">View All</button>
          <button onClick={handleAddInstrument} className="view-all hover:bg-indigo-700">+ Add Instrument</button>
        </div>
      </div>
      <div className="game-grid">
        {instrumentsList.map((instrument, index) => (
          <div key={index} className="game-card">
            <img src={instrument.image_url} alt={instrument.name} className="game-image" />

            <div className="game-details flex items-center justify-between m-5">
              <div>
                {instrument.original_price ? (
                  <div className="price-tag">
                    <span className="original-price">${instrument.original_price}</span>
                    <span className="discount-price">${instrument.price}</span>
                  </div>
                ) : (
                  <span className="price">${instrument.price}</span>
                )}
                <h3>{instrument.name}</h3>
              </div>

              <div className="like-section">
                <button onClick={() => handleLike(index)} className="like-button">Like</button>
                <span>{instrument.likes} Likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
