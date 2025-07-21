import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import pic4 from '../assets/images/pic4.jpg';
import pic3 from '../assets/images/pic6.jpg';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { useAuth } from "../context/Auth";



export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('')
  const [isLoading, setisLoading] = useState(false);
  const [shop, setShop] = useState('');
  const { user } = useAuth();


  const getShop = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const snapshot = await getDocs(collection(db, 'shops'));
      const shops = snapshot.docs.map((shop) => ({
        id: shop.id,
        ...shop.data()
      }))
      const shop = shops.find((shop) => shop.id === id);
      setShop(shop);
      setisLoading(false);
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const bookingData = {
    userId: user?user.uid:'',
    shopName:shop.shopName,
    name,
    date,
    selectedSlot,
    phone
  }

  const clearData = () => {
    setName('');
    setSelectedSlot('');
    setPhone('');
    setDate('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    
    try {

      await addDoc(collection(db, 'bookings'), bookingData);
      toast.success(`Booked for ${name} at ${selectedSlot}`);
      clearData();
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setisLoading(false)
    }
  };

  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes}`;
  });

  useEffect(() => {
    getShop()
  }, [])

  return shop ? (
    <div className="p-6 max-w-md mx-auto mt-8 bg-gray-900 text-white rounded-xl shadow-lg space-y-4">
      <img
        src={shop.image}
        alt={shop.name}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-4">{shop.name}</h1>
      <p className="text-gray-300">{shop.address}</p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Select a date" className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        <select
          className="w-full bg-gray-800 border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button
          disabled={isLoading}
          type="submit"
          className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-4 py-2 rounded"
        >
          Book Slot
        </button>
      </form>
    </div>
  ) : <Spinner />

}
