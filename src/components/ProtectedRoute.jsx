import { useAuth } from '../context/Auth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
  return user ? (
    children
  ) : <Navigate to={'/login'} state={{from: location.pathname}} replace/>
}

export default ProtectedRoute;