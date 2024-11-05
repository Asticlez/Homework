import React, { useState } from 'react';
import InstrumentCard from './InstrumentCard'; // Assuming we have the InstrumentCard component

function App() {
    // Initial list of instruments
    const [instruments, setInstruments] = useState([
        { name: "Fender Guitar", price: 300, image_url: "https://example.com/fender.jpg", like: 20, is_new: true },
        { name: "Yamaha Piano", price: 1000, image_url: "https://example.com/yamaha.jpg", like: 15, is_new: false }
        // ... add other instruments
    ]);

    // New instrument state (for form inputs)
    const [newInstrument, setNewInstrument] = useState({
        name: '',
        price: '',
        image_url: '',
        like: 0,
        is_new: false
    });

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add new instrument to the list
        setInstruments([...instruments, newInstrument]);
        // Reset form fields
        setNewInstrument({ name: '', price: '', image_url: '', like: 0, is_new: false });
    };

    // Function to handle input changes
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNewInstrument({
            ...newInstrument,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div>
            <h1>Music Store</h1>

            {/* Display the list of instruments */}
            <div>
                {instruments.map((instrument, index) => (
                    <InstrumentCard 
                        key={index} 
                        name={instrument.name} 
                        price={instrument.price} 
                        image_url={instrument.image_url} 
                        like={instrument.like} 
                        is_new={instrument.is_new} 
                    />
                ))}
            </div>

            {/* Form to add new instrument */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Instrument Name" 
                    value={newInstrument.name}
                    onChange={handleInputChange}
                />
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={newInstrument.price}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name="image_url" 
                    placeholder="Image URL" 
                    value={newInstrument.image_url}
                    onChange={handleInputChange}
                />
                <input 
                    type="number" 
                    name="like" 
                    placeholder="Likes" 
                    value={newInstrument.like}
                    onChange={handleInputChange}
                />
                <label>
                    Is New: 
                    <input 
                        type="checkbox" 
                        name="is_new" 
                        checked={newInstrument.is_new}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Add Instrument</button>
            </form>
        </div>
    );
}

export default App;