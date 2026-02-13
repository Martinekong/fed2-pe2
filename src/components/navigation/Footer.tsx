import { Link } from 'react-router-dom';

import FooterBg from '../../assets/bg.webp';
import { useAuth } from '../../app/authContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { loggedIn, isVenueManager } = useAuth();

  return (
    <footer className="relative mt-16 flex flex-col items-center gap-4 bg-secondary p-8 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${FooterBg}')` }}
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-8 p-4 text-center text-white">
        <Link
          to="/"
          className="font-heading text-3xl font-medium capitalize tracking-wide"
        >
          holidaze
        </Link>

        <p className="h-px w-full bg-[#526E6B]"></p>

        <nav className="flex flex-wrap justify-center gap-4 tracking-wide">
          <Link to="/">Home</Link>
          <Divider />
          <Link to="/venues">Venues</Link>
          <Divider />
          <Link to="/favorites">Favorites</Link>
          <Divider />
          {loggedIn ? (
            <>
              <Link to="/profile">Profile</Link>
              <Divider />
              <Link to="/bookings">My bookings</Link>
              {isVenueManager && (
                <>
                  <Divider />
                  <Link to="/manager/venues">My venues</Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Divider />
              <Link to="/register">Sign up</Link>
            </>
          )}
        </nav>

        <p className="mt-4 text-sm tracking-wide">
          &copy; {currentYear} Martine Kongsrud. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Divider() {
  return <span className="mt-2 h-3 w-px bg-[#526E6B]" />;
}
