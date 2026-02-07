import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';

export default function AuthGuard() {
  const { loggedIn } = useAuth();
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
