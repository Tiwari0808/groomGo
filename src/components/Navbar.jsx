import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <>
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center sticky" >
        <div onClick={()=>navigate('/')} className="">
           <h2 className="text-[26px] font-bold cursor-pointer">BookYourCut</h2>
        </div>
        <div className="flex w-[40%] justify-evenly">
            <a onClick={()=>navigate('/')} className="cursor-pointer hover:text-gray-300">Home</a>
            <a onClick={()=>navigate('/bookings')} className="cursor-pointer hover:text-gray-300">My Booking</a>
            <a onClick={()=>navigate('/admin')} className="cursor-pointer hover:text-gray-300">Admin</a>
        </div>
    </nav>
    </>
  )
}

export default Navbar