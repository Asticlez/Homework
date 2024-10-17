"use client";
import { useParams } from 'next/navigation';

const products = [
  { id: 1, name: "Acoustic Guitars", price: 210, image_url: "https://th.yamaha.com/en/files/product_thumb_fg800_0e49b530e9cdad5d518808c174e29492.jpg" },
  { id: 2, name: "Electric Guitars", price: 875, image_url: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/p/a/pacs_12m_black_front_0001.jpg" },
  { id: 3, name: "Bass Guitars", price: 1155, image_url: "https://i5.walmartimages.com/seo/Costway-Black-Full-Size-4-String-Electric-Bass-Guitar-with-Strap-Guitar-Bag-Amp-Cord_896a667c-f1ae-4dd0-a501-438e0ccda5d6_1.ff1dafdfb447715aa4315e6fd34a0400.jpeg" },
  { id: 4, name: "Digital Pianos/Keyboards", price: 470, image_url: "https://musicspace.co.th/wp-content/uploads/2017/04/kurzweil_cup2_electric-piano.jpg" },
  { id: 5, name: "Drum Sets", price: 105.5, image_url: "https://th.yamaha.com/en/files/Image-index_LCHO_1080x1080_da372253d5402fff26f65cb70f769c67.jpg" },
  { id: 6, name: "Ukuleles", price: 1206, image_url: "https://marcato.co.th/wp-content/uploads/2020/07/Maestro_Ukulele_US-10.jpg" },
  { id: 7, name: "Saxophone", price: 1680, image_url: "https://th.yamaha.com/th/files/yts-62_bc0ccc376eb4879487e6a061ea5db9f8.jpg" },
  { id: 8, name: "Trumpet", price: 550, image_url: "https://media.musicarts.com/is/image/MMGS7/463676000420000-01-720x720.jpg" },
  { id: 9, name: "Clarinet", price: 365, image_url: "https://ralamusic.com/wp-content/uploads/2018/05/golden-cup-clarinet-JYCL1301-01.jpg" },
  { id: 10, name: "Violin", price: 1085, image_url: "https://www.theeramusic.com/wp-content/uploads/2021/11/MV014E-.F.jpg" },
];

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} style={{ maxWidth: "300px" }} />
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductPage;
