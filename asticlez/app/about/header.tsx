"use client"
import Image from "next/image"
export default function Header(){
    return (<body className="font-serif bg-gray-100">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <div className="logo mr-4">
                    <Image
                    src={"/image/music (3).svg"}
                    width={20}
                    height={20}
                    alt="skibidi"
                    />
                    {/* <img src="/image/music (3).svg" alt="" className="invert"> </img> */}
                </div>
                <h1 className="text-white text-3xl">Music Store</h1>
            </div>
            <div>
                <button className="btn bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-8 rounded-lg hover:from-yellow-500 hover:to-red-500"
                onClick={() => alert('NOOB')}
                >
                Sign in
                </button>
            </div>
        </header>
    </body>)
}