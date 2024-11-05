"use client"; // Mark the component as a Client Component
import { useState, useEffect } from 'react';
import Image from 'next/image';
const useFetchUser = (username) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResult(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [username]);
    return { result, loading, error };
};
export default function MyFetch() {
    const { result, loading, error } = useFetchUser('wwarodom'); // Use the hook
    if (loading) return <>...loading!!</>; // Show loading while fetching data
    if (error) return <>Error: {error}</>; // Show error if it occurs
    return (
      <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
        <h1>Hi Fetch</h1>
        <hr />
        
        {/* Displaying the gif from Tenor */}
        <Image 
          src="https://media1.tenor.com/m/zprdJ_657HAAAAAC/dancing-black.gif"  // Image URL
          alt="Dancing Gif"
          width={300}  // Set image width
          height={300}  // Set image height
          style={{ backgroundColor: 'white' }}  // Optional: Add background if needed
        />
        {/* Display fetched user data */}
        <div>
          <h2>User Info:</h2>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Avatar URL:</strong> {result.avatar_url}</p>
          <img src={result.avatar_url} alt="User Avatar" width={100} height={100} />
        </div>
      </div>
    );
}