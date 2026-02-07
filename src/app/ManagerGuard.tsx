import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authContext';

export default function ManagerGuard() {
  const { loggedIn, isVenueManager, isLoadingProfile } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoadingProfile) {
    return null;
  }

  if (!isVenueManager) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
