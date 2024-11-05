// "use client";  // Mark this as a Client Component

// import React from 'react'
// import { useRouter } from 'next/navigation'

// type Props = {}

// export default function NotFound({}: Props) {
//   const router = useRouter();

//   const handleGoHome = () => {
//     router.push('/');  // Navigate back to the home page
//   };

//   return (
//     <div 
//       className='flex justify-center items-center flex-col h-screen' 
//       style={{ 
//         background: 'linear-gradient(to bottom, #ff0000, #000000)', // Red at the top fading to black at the bottom
//         color: '#f5f5f5' // Light text for contrast
//       }}
//     >
//       <img 
//         src="https://media.tenor.com/uqDNFL83d7cAAAAM/fridge-dissapointed.gif" 
//         alt="Error Bro" 
//         width={400}  // Increased the width to 400
//         className="border border-black border-2 m-4"
//       />

//       <h1 className='text-red-600 text-3xl m-4'>⚠ 404? Nah, bro, it’s more like 404-ever lost! ⚠</h1>
//       <h2 className='text-white text-lg m-4'> You’ve entered the twilight zone of missing pages. </h2>
//       <h3 className='text-gray-400 text-md m-4'>⚠ This page doesn't exist, just like my future ⚠</h3>
//       <h4 className='text-yellow-300 text-md m-4'>Now GET LOST!</h4>

//       {/* Go Home button */}
//       <button 
//         onClick={handleGoHome} 
//         className='mt-6 px-6 py-3 bg-yellow-500 text-black rounded-lg text-lg hover:bg-yellow-600 transition duration-300'
//       >
//         ⚠ GET OUT! 🤬 ⚠
//       </button>
//     </div>
//   )
// }
