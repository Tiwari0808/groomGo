import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <>
    <nav className="bg-cyan-500 px-10 py-3 flex items-center text-amber-50 justify-between" >
        <div onClick={()=>navigate('/')} className="">
           <h2 className="text-[26px] font-bold cursor-pointer">BookYourCut</h2>
        </div>
        <div className="cursor-pointer">Your Booking</div>
    </nav>
    </>
  )
}

export default Navbar