// components/BookCard.tsx
import React from 'react';
import BookCard from '../components/BookCard';

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    imageUrl: string; // Using image link from API
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
      <img
        src={book.imageUrl} // Image URL from your API or mock data
        alt={book.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="mt-2 font-bold text-xl">{book.title}</h2>
      <p className="text-gray-600">by {book.author}</p>
    </div>
  );
};

export default BookCard;