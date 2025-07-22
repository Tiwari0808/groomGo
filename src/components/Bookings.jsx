import { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import toast from 'react-hot-toast'
import Spinner from './Spinner'

const Bookings = () => {
  const { user } = useAuth();
  const uid = user?.uid;
  const [isLoading, setisLoading] = useState(true);

  const [booking, setBooking] = useState([]);
  const getBookings = async () => {
    try {
      if (!user) return;
      const q = query(collection(db, 'bookings'), where('userId', '==', uid))
      const snapshot = await getDocs(q);
      const bookings = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }))
      setBooking(bookings);
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setisLoading(false)
    }
  }
  useEffect(() => {
    getBookings()
  }, [user])

  return !isLoading ? (
    <div className='mt-6 px-6'>
      <h2 className='text-2xl mb-6'>Bookings</h2>
       <div>
        {booking.length > 0 ? (booking.map((item, index) => (
          <div key={item.id} className='flex items-center md:gap-2 flex-wrap'>
            <p>{`${index + 1}. ${item.name} at ${item.selectedSlot} on ${item.date}`}</p>
            <p className='text-orange-500'>{item.shopName}</p>
          </div>
        )
        )):<h2 className='text-center mt-6 text-orange-500'>no bookings available</h2>}
      </div> 
    </div>
  ) : <Spinner/>
}

export default Bookings;



