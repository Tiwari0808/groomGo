import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Navbar = () => {
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const {user,logout} = useAuth();
    const handleLogin = async()=>{
      if(user){
        navigate('/')
        logout();
      }
      navigate('/login')
    }
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex flex-col md:flex-row justify-between md:justify-between sticky top-0 z-50" >
        <div  className="flex items-center justify-between">
           <h2 onClick={()=>navigate('/')} className="text-[26px] font-bold cursor-pointer"><span className="text-orange-500">G</span>roomGo</h2>
           <div onClick={()=>setOpen(!open)} className="md:hidden cursor-pointer">{open ? <RxCross2 className="h-7 w-7 text-orange-500"/> : <RxHamburgerMenu className="h-7 w-7 text-orange-500"/>}</div>
        </div>
        <div className={`md:flex ${!open ? 'hidden' : 'flex'} flex-col transition 0.3s md:flex-row mt-6 md:mt-0 md:w-[40%] justify-center md:justify-between gap-3 items-center`}>
            <a onClick={()=>navigate('/')} className="cursor-pointer hover:text-gray-300 text-center">Home</a>
            <a onClick={()=>navigate('/bookings')} className="cursor-pointer hover:text-gray-300">My Booking</a>
            <a onClick={()=>navigate('/admin')} className="cursor-pointer hover:text-gray-300">Admin</a>
            <div className="flex flex-col items-center">
              <p className="text-orange-600 text-[16px]">{user?.email}</p>
              <a onClick={()=>handleLogin()} className="cursor-pointer hover:text-gray-300">{!user ? 'Login' : 'Logout'}</a>
            </div>
            
        </div>
    </nav>
  )
}

export default Navbar;