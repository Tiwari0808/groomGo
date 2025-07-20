import { useParams } from "react-router-dom";
import { useState } from "react";
import pic4 from '../assets/images/pic4.jpg';
import pic3 from '../assets/images/pic6.jpg';

const shops = [
  { id: '0', name: "Gentlemen's Cut", address: 'Shop No. G112, MG Road, Pune', image: pic4 },
  { id: '1', name: 'Modern Styles', address: 'Shop No. 10, FC Road, Pune', image: pic3 },
];

export default function Book() {
  const { id } = useParams();
  const shop = shops[id];



  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');


  const bookingData = {
    name,
    selectedSlot,
    phone
  }

  const clearData = ()=>{
    setName('');
    setSelectedSlot('');
    setPhone('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookingData);
    clearData();
    // TODO: Save booking to Firestore
    alert(`Booked for ${name} at ${selectedSlot}`);
  };

  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes}`;
  });

  return (
  <div className="p-6 max-w-md mx-auto mt-8 bg-gray-900 text-white rounded-xl shadow-lg space-y-4">
    <img
      src={shop.image}
      alt={shop.name}
      className="h-48 w-full object-cover rounded-lg"
    />

    <h1 className="text-3xl font-bold mt-4">{shop.name}</h1>
    <p className="text-gray-300">{shop.address}</p>

    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <select
        className="w-full bg-gray-800 border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
        className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full bg-gray-800 border border-gray-600 p-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold px-4 py-2 rounded"
      >
        Book Slot
      </button>
    </form>
  </div>
);

}
