import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db,auth } from '../firebase/firebaseConfig';

const ShopBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ownerId = user.uid;

        try {
          // Step 1: Get shops where current user is the owner
          const shopsRef = collection(db, 'shops');
          const shopQuery = query(shopsRef, where('ownerId', '==', ownerId));
          const shopSnap = await getDocs(shopQuery);

          const shopNames = shopSnap.docs.map(doc => doc.data().shopName);

          if (shopNames.length === 0) {
            setBookings([]); // no shops owned
            setLoading(false);
            return;
          }

          // Step 2: Get bookings where shopName is one of those
          const bookingsRef = collection(db, 'bookings');

          // Firestore does not support `where in` with more than 10 items
          const chunks = [];
          while (shopNames.length) {
            chunks.push(shopNames.splice(0, 10));
          }

          const allBookingDocs = [];
          for (let chunk of chunks) {
            const bookingQuery = query(bookingsRef, where('shopName', 'in', chunk));
            const bookingSnap = await getDocs(bookingQuery);
            allBookingDocs.push(...bookingSnap.docs);
          }

          const allBookings = allBookingDocs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBookings(allBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Shop Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-3 rounded-lg shadow-sm">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time Slot:</strong> {booking.selectedSlot}</p>
              <p><strong>Shop:</strong> {booking.shopName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopBookings;