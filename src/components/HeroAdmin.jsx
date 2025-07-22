import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const HeroAdmin = () => {
    const navigate = useNavigate();
    const {logout} = useAuth()
    const adminLoginHandler = async()=>{
      alert("You'll be logout as user.continue?")
      logout();
      navigate('/shop-bookings')
    }
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-gray-800 px-4">
      <div className="max-w-3xl text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome Back, Admin
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-300">
          Access your dashboard to manage barber shop listings, view bookings, and maintain the GroomGo platform.
        </p>
        <button
          onClick={()=>adminLoginHandler()}
          className="inline-block cursor-pointer bg-orange-500 hover:bg-orange-600 transition-colors px-6 py-3 rounded-xl text-lg font-medium shadow-lg"
        >
          Go to Admin Login
        </button>
        <p className="text-blue-500 text-[14px] mt-3">You'll be logged out as user</p>
      </div>
    </section>
  );
};

export default HeroAdmin;
