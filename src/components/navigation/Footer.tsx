import { useState } from 'react';
import { Link } from 'react-router-dom';

import headerBg from '../../assets/header-bg.jpg';
import { getToken } from '../../lib/storage';

export default function Footer() {
  const [currentYear] = useState(() => new Date().getFullYear());
  const token = getToken();
  const loggedIn = Boolean(token);

  return (
    <footer className="relative mt-16 flex flex-col items-center gap-4 bg-secondary p-8 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${headerBg}')` }}
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
          <p className="mt-1 h-3 w-px bg-[#526E6B]"></p>
          <Link to="/venues">Venues</Link>
          <p className="mt-1 h-3 w-px bg-[#526E6B]"></p>
          <Link to="/favorites">Favorites</Link>
          <p className="mt-1 h-3 w-px bg-[#526E6B]"></p>
          {loggedIn ? (
            <>
              <Link to="/profile">Profile</Link>
              <p className="mt-1 h-3 w-px bg-[#526E6B]"></p>
              <Link to="/bookings">My bookings</Link>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <p className="mt-1 h-3 w-px bg-[#526E6B]"></p>
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
