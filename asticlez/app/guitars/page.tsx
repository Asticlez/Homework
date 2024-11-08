'use client'

import { useState, useEffect } from 'react'
import prisma from '../utils/db'

interface Guitar {
  id: string
  name: string
  brand: string
  price: number
}

export default function GuitarPage() {
  const [guitars, setGuitars] = useState<Guitar[]>([])
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    const fetchGuitars = async () => {
      const response = await fetch('/api/guitars')
      const data = await response.json()
      setGuitars(data)
    }
    fetchGuitars()
  }, [])


  const addGuitar = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/guitars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, brand, price: parseFloat(price) }),
    })

    if (response.ok) {
      const newGuitar = await response.json()
      setGuitars([...guitars, newGuitar])
      setName('')
      setBrand('')
      setPrice('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guitar List</h1>

      <form onSubmit={addGuitar} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Guitar
        </button>
      </form>

      <ul className="space-y-4">
        {guitars.map((guitar) => (
          <li key={guitar.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{guitar.name}</h2>
            <p>Brand: {guitar.brand}</p>
            <p>Price: ${guitar.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}