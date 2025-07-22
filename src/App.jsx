
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Admin from './components/Admin'
import Book from './components/Book'
import ShopDetails from './components/ShopDetails'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home1'
import ShopBookings from './components/ShopBookings'
import Bookings from './components/Bookings'

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white'>
      <Navbar />
      
      {/* <Login/> */}
        <Toaster/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='shopDetails/:id' element={<ShopDetails />} />
          <Route path='/book/:id' element={<ProtectedRoute><Book /></ProtectedRoute>} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/bookings' element={<ProtectedRoute><Bookings/></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/shop-bookings' element={<ProtectedRoute><ShopBookings /></ProtectedRoute>} />
        </Routes>
    </div>
  )
}

export default App;
