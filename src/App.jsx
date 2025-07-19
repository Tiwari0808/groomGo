
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Navbar from './components/Navbar'
import Admin from './components/Admin'
import Bookings from './components/Bookings'
import Book from './components/Book'
import ShopDetails from './components/ShopDetails'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='shopDetails/:id' element={<ShopDetails/>}/>
      <Route path='/book' element={<Book/>}/>
      <Route path='admin' element={<Admin/>}/>
      <Route path='/bookings' element={<Bookings/>}/>
    </Routes>
    </>
  )
}

export default App
