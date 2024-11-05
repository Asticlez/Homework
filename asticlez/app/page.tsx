"use client";

import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard'; // Correct import path
import { fetchBooks } from '../services/bookService'; // Correct import path

export default function HomePage() {
  const [bookData, setBookData] = useState<
    { id: number; title: string; author: string; imageUrl: string }[]
  >([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBookData(data); // This should include the image URLs from your API
    };

    getBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center py-4 bg-blue-600 text-white font-bold text-3xl">
        Book Collection
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {bookData.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </main>
    </div>
  );
}
