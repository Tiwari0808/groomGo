
import { DefaultGallery } from './components/Gallary'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import ShopDetails from './components/ShopDetails'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='shop/:id' element={<ShopDetails/>}/>
    </Routes>
    </>
  )
}

export default App
