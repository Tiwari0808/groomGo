
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Navbar from './components/Navbar'
import Admin from './components/Admin'
import Bookings from './components/Bookings'
import Book from './components/Book'
import ShopDetails from './components/ShopDetails'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white'>
      <Navbar />
      {/* <Login/> */}
        <Toaster/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='shopDetails/:id' element={<ShopDetails />} />
          <Route path='/book/:id' element={<ProtectedRoute><Book /></ProtectedRoute>} />
          <Route path='admin' element={<Admin />} />
          <Route path='/bookings' element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin-dashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
    </div>
  )
}

export default App
