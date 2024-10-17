"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const products = [
  { id: 1, name: "Acoustic Guitars", price: 210, description: "This high-quality acoustic guitar features a solid spruce top.", image_url: "https://th.yamaha.com/en/files/product_thumb_fg800_0e49b530e9cdad5d518808c174e29492.jpg" },
  { id: 2, name: "Electric Guitars", price: 875, description: "The versatile electric guitar is designed for various music genres.", image_url: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/p/a/pacs_12m_black_front_0001.jpg" },
  // Add other products here...
];

const EditProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product updated!");
    router.push(`/product/${productId}`); // Redirect to the product detail page
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              rows="4"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
