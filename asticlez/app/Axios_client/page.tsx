"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

type PostType = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
};

type PhotoType = {
  id: number;
  title: string;
};

export default function Page() {
  const [url, setUrl] = useState("");
  const [obj, setObj] = useState<PostType[] | null>(null);
  const [photos, setPhotos] = useState<PhotoType[]>([]);

  useEffect(() => {
    async function getImage() {
      try {
        const { data } = await axios.get("https://api.github.com/users/nikisidama");
        setUrl(data.avatar_url);
      } catch (e) {
        console.error(e);
      }
    }

    async function getJSON() {
      try {
        const { data } = await axios.get("/api/vercel");
        setObj(data);
      } catch (e) {
        console.error(e);
      }
    }

    async function getPhotoTitles() {
      try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos");
        setPhotos(data.map((photo: { id: number; title: string }) => ({ id: photo.id, title: photo.title })));
      } catch (e) {
        console.error(e);
      }
    }

    getImage();
    getJSON();
    getPhotoTitles();
  }, []);

  if (!url || !obj) return (
    <div className="flex items-center justify-center h-screen bg-black">
      <p className="text-2xl font-semibold text-gray-500">...loading!!</p>
    </div>
  );

  return (
    <div className="container mx-auto p-8 min-h-screen bg-gradient-to-br from-black to-red-900">
      <div className="flex items-center justify-center mb-8">
      <Image
        src="https://otakuepico.com/wp-content/uploads/2024/08/Dandadan-Turbo-Granny.jpg.webp"
         alt="User Avatar"
        width={150}
         height={150}
         className="rounded-full shadow-lg border-4 border-red-600"
      />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => {
          const item = obj.find((o) => o.id === photo.id);
          if (!item) return null;
          return (
            <div
              key={photo.id}
              className="bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-700 transition-transform transform hover:scale-105 hover:border-red-600 hover:bg-gray-700"
            >
              <h2 className="text-xl font-bold text-red-500 mb-2">{photo.title}</h2>
              <p className="text-gray-300"><strong>ID:</strong> {item.id}</p>
              <p className="text-gray-400 mt-2"><strong>Content:</strong> {item.content}</p>
              <p className="text-gray-300 mt-2"><strong>Author:</strong> {item.author}</p>
              <p className="text-gray-400 mt-2"><strong>Date:</strong> {item.date}</p>
              <p className="text-gray-300 mt-2"><strong>Category:</strong> {item.category}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}