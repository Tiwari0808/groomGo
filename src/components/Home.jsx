import ShopCard from "./shopCard";
import pic4 from '../assets/images/pic4.jpg'
import pic3 from '../assets/images/pic6.jpg'
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import Spinner from "./Spinner";
export default function Home() {
  // const shops = [
  //   { id: '0', name: "Gentlemen's Cut", address: 'Shop No. G112, MG Road, Pune', image: pic4 },
  //   { id: '1', name: 'Modern Styles', address: 'Shop No. 10, FC Road, Pune', image: pic3 },
  // ];
  const [shops, setShop] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const getData = async () => {
    const snapshot = await getDocs(collection(db, 'shops'));
    const shops = snapshot.docs.map((shop) => ({
      id: shop.id,
      ...shop.data()
    }))
    setShop(shops);
    setIsLoading(false);
  }
  getData()

  return !isloading ? (
    <div className="p-4 grid grid-cols-1 md:grid-cols-1 lg:px-30 gap-4">
      <section className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-6 md:px-12 my-[5%]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Your Haircut Without Waiting
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Find nearby barber shops and book your slot to skip the line. Save time. Look sharp. Stay ahead.
          </p>
          <a
            href="#nearbyShops"
            className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-700 transition"
          >
            Explore Barber Shops
          </a>
        </div>
      </section>
      <h2 id="nearbyShops" className="text-[20px] font-medium scroll-mt-20">Shops Near You</h2>
      {shops.map((shop) => (
        <>
          <ShopCard key={shop.id} shop={shop} />
        </>
      ))}
    </div>
  ) : <Spinner />
}