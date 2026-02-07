import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authContext';

export default function AuthGuard() {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
