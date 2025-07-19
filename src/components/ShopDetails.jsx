import { useParams } from "react-router-dom";
import { useState } from "react";
import pic4 from '../assets/images/pic4.jpg'
import pic3 from '../assets/images/pic6.jpg'

const mockShops = {
  '1': { name: "Gentlemen's Cut", address: 'MG Road', image:pic4 },
  '2': { name: 'Modern Styles', address: 'FC Road',image:pic3 },
};

export default function ShopDetails() {
  const { id } = useParams();
  const shop = mockShops[id];

  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save booking to Firestore
    alert(`Booked for ${name} at ${selectedSlot}`);
  };

  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes}`;
  });

  return (
    <div className="p-4 max-w-xl mx-auto bg-[url()]">
      <h1 className="text-2xl font-bold mb-2">{shop.name}</h1>
      <p className="mb-4 text-gray-600">{shop.address}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border p-2 rounded"
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
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Book Slot
        </button>
      </form>
    </div>
  );
}
