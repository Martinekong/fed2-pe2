import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

import VenuesPage from '../pages/venues/VenuesPage';
import VenuePage from '../pages/venues/VenuePage';
import FavoritesPage from '../pages/venues/FavoritesPage';

import ProfilePage from '../pages/profile/ProfilePage';
import EditProfilePage from '../pages/profile/EditProfilePage';

import MyBookingsPage from '../pages/bookings/MyBookingsPage';
import BookingPage from '../pages/bookings/BookingPage';

import MyVenuesPage from '../pages/manager/MyVenuesPage';
import CreateVenuePage from '../pages/manager/CreateVenuePage';
import EditVenuePage from '../pages/manager/EditVenuePage';

import NotFoundPage from '../pages/NotFoundPage';
import AuthGuard from '../components/navigation/AuthGuard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/venues" element={<VenuesPage />} />
      <Route path="/venues/:id" element={<VenuePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />

      <Route element={<AuthGuard />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />

        <Route path="/bookings" element={<MyBookingsPage />} />
        <Route path="/bookings/:id" element={<BookingPage />} />
      </Route>

      <Route path="/manager/venues" element={<MyVenuesPage />} />
      <Route path="/manager/venues/create" element={<CreateVenuePage />} />
      <Route path="/manager/venues/:id/edit" element={<EditVenuePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
