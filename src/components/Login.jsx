import { useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const clearForm = () => {
    setPassword('')
    setEmail('')
    setConfirmPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser(result.user);
        navigate(from,{replace:true})
        toast.success('Logged in successfully');
      } else {
        if (password !== confirmPassword) return toast.error('Confirm password didnt matched');
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setUser(result.user);
        setIsLogin(true)
        await setDoc(doc(db,'users',result.user.uid),{
          email:result.user.email,
          role:'user'
        })
        toast.success('registered successfully,Login now');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
      console.log(error);
    } finally {
      setIsLoading(false);
      clearForm()
    }
  }

  return (
    <div className="max-w-[400px] mx-auto mt-10 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login with Email' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        {!isLogin && <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />}

        <button
          disabled={isLoading}
          type='submit'
          className="bg-orange-500 text-white py-2 px-4 rounded w-full mb-4 cursor-pointer"
        >
          {!isLoading ? 'Submit' : <div className='flex justify-center items-center'><div className='animate-spin h-4 w-4 rounded-full border-1'></div></div>}
        </button>
      </form>
      <p className="text-center text-sm mt-2">
        {isLogin ? (
          <>Not a user? <span onClick={() => setIsLogin(false)} className="text-blue-600 cursor-pointer">Sign up now</span></>
        ) : (
          <>Already have an account? <span onClick={() => setIsLogin(true)} className="text-blue-600 cursor-pointer">Login</span></>
        )}
      </p>

    </div>
  );
};

export default Login;
