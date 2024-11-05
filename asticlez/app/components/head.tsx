import Image from "next/image";
import background from "../image/bg.jpg";
import pheader from "../image/tt.png";

export default function Head() {
  return (
    <header
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-screen w-full relative rounded-b-lg overflow-hidden"
    >
      <div className="sticky top-0 z-10" style={{ backgroundColor: 'rgba(26, 32, 44, 0.9)' }}>
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Music Shop</h1>
          <div className="flex gap-4">
            <button className="text-white">Home</button>
            <button className="text-white">Our Shop</button>
            <button className="text-white">Product Details</button>
            <button className="text-white">Contact Us</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">SIGN IN</button>
          </div>
        </nav>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 text-center">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between mt-12">
            <div className="text-left lg:w-1/2">
              <h1 className="text-4xl font-bold text-white">WELCOME TO MUSIC SHOP</h1>
              <h2 className="text-4xl font-bold text-white mt-4">THE BEST PLACE FOR MUSICAL INSTRUMENTS!</h2>
              <p className="text-white mt-4">
                At our Music Shop, we are dedicated to providing high-quality instruments for musicians of all levels. 
                Whether you are a beginner or a professional, you will find the perfect instrument that suits your needs. 
                Explore our wide range of guitars, pianos, violins, and more!
              </p>
              <div className="relative mt-6">
                <input
                  type="search"
                  placeholder="Search for your favorite instrument"
                  className="rounded-full px-6 py-3 text-lg font-normal focus:outline-none focus:ring w-[380px]"
                />
                <button
                  className="rounded-full bg-red-500 px-6 py-3 text-lg text-white transition hover:bg-indigo-700 ml-4 focus:outline-none focus:ring"
                  type="button"
                >
                  SEARCH NOW
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <Image
                  src={pheader}
                  alt="Musical Instruments"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}