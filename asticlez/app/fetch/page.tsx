'use client'

// import Image from 'next/image'
import { useEffect, useState } from 'react'

type UserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: number,
            lng: number
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

export default function MyFetch() {
    const [data, setData] = useState<UserType[]>()

    useEffect(() => {
        async function getData() {
            try {
                const result = await fetch('/api/vercel')
                const data2 = await result.json()
                console.log("Data: ", data2) 
                setData(data2)
            }
            catch (error) {
                console.error("Error: ", error)
            }      
        }
        getData()
    }, [])
  
    if (!data) return <>...loading!!</>

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {data.map((item) => (
                    <div key={item.id} style={{
                        width: '300px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        textAlign: 'left',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <div style={{ marginBottom: '15px' }}>
                            <img
                                src={`https://robohash.org/${item.id}.png?set=set5&size=100x100`}
                                alt={`${item.username} avatar`}
                                style={{ borderRadius: '50%', display: 'block', margin: '0 auto' }}
                            />
                        </div>
                        <p><strong>ID:</strong> {item.id}</p>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Username:</strong> {item.username}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Address:</strong> {item.address.street}, {item.address.suite}, {item.address.city}, {item.address.zipcode}</p>
                        <p><strong>Phone:</strong> {item.phone}</p>
                        <p><strong>Website:</strong> <a href={`https://${item.website}`} target="_blank" rel="noopener noreferrer">{item.website}</a></p>
                        <p><strong>Company:</strong> {item.company.name}</p>
                        <p><em>"{item.company.catchPhrase}"</em></p>
                    </div>
                ))}
            </div>
        </>
    )
}