import ShopCard from "./ShopCard";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
const Home = ()=> {

  const [shops, setShop] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'shops'));
      const shops = snapshot.docs.map((shop) => ({
        id: shop.id,
        ...shop.data()
      }))
      setShop(shops);
      setIsLoading(false);
    } catch (error) {
      toast.error('Something went wrong')
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getData();
  }, [])

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
        <div key={shop.id} >
          <ShopCard key={shop.id} shop={shop} />
        </div>
      ))}
    </div>
  ) : <Spinner />
}

export default Home