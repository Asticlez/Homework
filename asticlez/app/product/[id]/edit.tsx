"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Full product data array
const products = [
  { 
    id: 1, 
    name: "Acoustic Guitars", 
    price: 210, 
    description: "This high-quality acoustic guitar features a solid spruce top, mahogany back and sides, and a smooth neck for easy playability. Perfect for both beginners and seasoned musicians, it delivers rich, warm tones.", 
    image_url: "https://th.yamaha.com/en/files/product_thumb_fg800_0e49b530e9cdad5d518808c174e29492.jpg" 
  },
  { 
    id: 2, 
    name: "Electric Guitars", 
    price: 875, 
    description: "The versatile electric guitar is designed for various music genres. With its double-cutaway body and powerful pickups, this guitar provides a bright, cutting sound, making it ideal for rock, blues, and jazz.", 
    image_url: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/p/a/pacs_12m_black_front_0001.jpg" 
  },
  { 
    id: 3, 
    name: "Bass Guitars", 
    price: 1155, 
    description: "This electric bass guitar offers a deep, resonant sound with its solid body and quality pickups. Its comfortable neck and excellent balance make it easy to play, perfect for both practice and live performances.", 
    image_url: "https://i5.walmartimages.com/seo/Costway-Black-Full-Size-4-String-Electric-Bass-Guitar-with-Strap-Guitar-Bag-Amp-Cord_896a667c-f1ae-4dd0-a501-438e0ccda5d6_1.ff1dafdfb447715aa4315e6fd34a0400.jpeg" 
  },
  { 
    id: 4, 
    name: "Digital Pianos/Keyboards", 
    price: 470, 
    description: "Experience a true piano feel with this digital piano, featuring weighted keys and advanced sound technology. It includes various instrument voices, effects, and a built-in metronome, making it perfect for practice and performance.", 
    image_url: "https://musicspace.co.th/wp-content/uploads/2017/04/kurzweil_cup2_electric-piano.jpg" 
  },
  { 
    id: 5, 
    name: "Drum Sets", 
    price: 105.5, 
    description: "This durable drum set is designed for both practice and performance. Featuring high-quality shells and hardware, it produces powerful, resonant tones, making it ideal for drummers of all skill levels.", 
    image_url: "https://th.yamaha.com/en/files/Image-index_LCHO_1080x1080_da372253d5402fff26f65cb70f769c67.jpg" 
  },
  { 
    id: 6, 
    name: "Ukuleles", 
    price: 1206, 
    description: "This lightweight ukulele is perfect for on-the-go musicians. Its bright, cheerful sound and comfortable neck make it ideal for beginners and experienced players alike. Comes with a beautiful finish and easy-to-use tuning pegs.", 
    image_url: "https://marcato.co.th/wp-content/uploads/2020/07/Maestro_Ukulele_US-10.jpg" 
  },
  { 
    id: 7, 
    name: "Saxophone", 
    price: 1680, 
    description: "This professional saxophone is crafted from high-quality brass, producing a rich, warm tone with excellent response. It's perfect for both jazz and classical music, and it comes with a mouthpiece and a carrying case.", 
    image_url: "https://th.yamaha.com/th/files/yts-62_bc0ccc376eb4879487e6a061ea5db9f8.jpg" 
  },
  { 
    id: 8, 
    name: "Trumpet", 
    price: 550, 
    description: "This brass trumpet features a bright, resonant sound that is perfect for all skill levels. Its durable construction and easy-to-press valves make it an excellent choice for beginners and advanced players alike.", 
    image_url: "https://media.musicarts.com/is/image/MMGS7/463676000420000-01-720x720.jpg" 
  },
  { 
    id: 9, 
    name: "Clarinet", 
    price: 365, 
    description: "This quality clarinet offers excellent sound and playability, with a beautiful wooden body and precise key action. Ideal for students and professional musicians, it provides a rich, warm tone suitable for various music styles.", 
    image_url: "https://ralamusic.com/wp-content/uploads/2018/05/golden-cup-clarinet-JYCL1301-01.jpg" 
  },
  { 
    id: 10, 
    name: "Violin", 
    price: 1085, 
    description: "This handcrafted violin delivers a warm, rich tone with its solid wood construction. It is designed for both beginners and advanced players, featuring quality strings and a beautiful finish for an elegant appearance.", 
    image_url: "https://www.theeramusic.com/wp-content/uploads/2021/11/MV014E-.F.jpg" 
  },
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
