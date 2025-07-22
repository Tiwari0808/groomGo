import { useNavigate, useParams } from "react-router-dom"
import { Gallery } from "./Gallary";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { FaStar } from "react-icons/fa";

const ShopDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isloading, setIsLoading] = useState(true);
    const [shop, setShop] = useState('');
    const getShop = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'shops'));
            const shops = snapshot.docs.map((shop) => ({
                id: shop.id,
                ...shop.data()
            }))
            const shop = shops.find((item) => item.id === id);
            setShop(shop)
            setIsLoading(false);
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    useEffect(() => {
        getShop();
    }, [])

    return !isloading ? (
        <>
            <div className="flex flex-col md:flex-row px-4 py-15 gap-8 md:gap-12 md:px-12 text-white rounded-xl mx-auto shadow-2xl">

                {/* Image and Button */}
                <div className="w-full flex flex-col gap-6 items-center text-center">
                    <img
                        src={shop.image}
                        alt={shop.shopName}
                        className="w-full md:w-[60%] h-[50vh] object-cover rounded-xl shadow-md"
                    />
                </div>

                {/* Shop Info */}
                <div className="space-y-4">
                    <div>
                     <h2 className="text-2xl lg:text-3xl font-bold">{shop.shopName}</h2>
                     <div className="flex items-center gap-2">
                        <FaStar className="text-orange-500"/>
                        {shop.rating}
                     </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                        {shop.description}
                    </p>
                    <button
                        onClick={() => navigate(`/book/${id}`)}
                        className="bg-orange-500 cursor-pointer hover:bg-orange-700 px-6 py-2 text-white font-semibold text-lg rounded-full transition duration-200"
                    >
                        Book Now
                    </button>
                </div>

                {/* Gallery */}

            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6 px-5 ">Gallery</h2>
                <Gallery />
            </div>
        </>
    ) : <Spinner />
}

export default ShopDetails