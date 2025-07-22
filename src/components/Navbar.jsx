import { useEffect, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [role, setRole] = useState(null); // Initialize as null
  const [isAdmin, setIsAdmin] = useState(false);

  const getRole = async () => {
    if (!user?.uid) {
      setRole(null);
      setIsAdmin(false);
      return;
    }

    try {
      const docRef = doc(db, 'users', user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const fetchedRole = snap.data()?.role || 'user';
        setRole(fetchedRole);
        setIsAdmin(fetchedRole === 'admin');
      } else {
        setRole('admin');
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error fetching role:", error);
      setRole(null);
      setIsAdmin(false);
    }
  };

  const handleLogin = async () => {
    if (user) {
      await logout();
      setRole(null);
      setIsAdmin(false);
      navigate('/');
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    getRole();
  }, [user?.uid]); // Only trigger when user.uid changes

  useEffect(() => {
  }, [role, isAdmin]);
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex flex-col md:flex-row justify-between md:justify-between sticky top-0 z-50" >
      <div className="flex items-center justify-between">
        <h2 onClick={() => navigate('/')} className="text-[26px] font-bold cursor-pointer"><span className="text-orange-500">G</span>roomGo</h2>
        {role === 'admin' && <span className="bg-amber-700 rounded-[5px] p-1 text-[10px] md:ml-3">Admin</span>}
        <div onClick={() => setOpen(!open)} className="md:hidden cursor-pointer">{open ? <RxCross2 className="h-7 w-7 text-orange-500" /> : <RxHamburgerMenu className="h-7 w-7 text-orange-500" />}</div>
      </div>
      <div className={`md:flex ${!open ? 'hidden' : 'flex'} flex-col transition 0.3s md:flex-row mt-6 md:mt-0 md:w-[40%] justify-center md:justify-between gap-3 items-center`}>
        {<NavLink to={'/'} onClick={() => setOpen(!open)} className= {({isActive})=>`${isActive ? 'text-orange-500' : ''} cursor-pointer hover:text-gray-300 text-center`}>Home</NavLink>}
        <NavLink to={'/bookings'} onClick={() => setOpen(!open)} className= {({isActive})=>`${isActive ? 'text-orange-500' : ''} cursor-pointer hover:text-gray-300 text-center`}>My Booking</NavLink>
        {role !== 'admin' && <NavLink to={'/admin'} onClick={() => {setOpen(!open)}} className= {({isActive})=>`${isActive ? 'text-orange-500' : ''} cursor-pointer hover:text-gray-300 text-center`}>Admin</NavLink>}
        <div className="flex flex-col items-center">
          <p className="text-orange-600 text-[16px]">{user?.email}</p>
          <NavLink onClick={() => handleLogin()} className="cursor-pointer hover:text-gray-300">{!user ? 'Login' : 'Logout'}</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;