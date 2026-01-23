import { Link, useNavigate } from 'react-router-dom';
import { getToken, getUsername, clearAuthStorage } from '../../lib/storage';
import toast from 'react-hot-toast';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const navigate = useNavigate();

  const token = getToken();
  const username = getUsername();

  const loggedIn = Boolean(token);
  const initial = username ? username.trim().charAt(0).toUpperCase() : '?';

  function handleLogout() {
    clearAuthStorage();
    toast.success('Logged out');
    navigate('/login');
  }

  return (
    <header className="sticky flex items-center justify-between p-4 shadow-lg md:grid md:grid-cols-3">
      <Link
        to="/"
        className="items-center font-heading text-2xl font-black capitalize"
      >
        holidaze
      </Link>

      <nav className="hidden justify-center md:flex md:gap-12">
        <Link to="/">Home</Link>
        <Link to="/venues">Venues</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      <div className="flex justify-end gap-4">
        {loggedIn ? (
          <>
            <Link
              to="/profile"
              aria-label="go to profile"
              className="header-profile-btn"
            >
              {initial}
            </Link>
            <button onClick={handleLogout} className="header-secondary-btn">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-primary-btn">
              Log in
            </Link>
            <Link to="/register" className="header-secondary-btn">
              Sign up
            </Link>
          </>
        )}

        <button className="md:hidden">
          <MenuIcon fontSize="medium" />
          {/* This button needs to open hamburger menu (<nav>) */}
        </button>
      </div>
    </header>
  );
}
