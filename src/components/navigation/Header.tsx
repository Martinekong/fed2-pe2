import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import headerBg from '../../assets/bg.webp';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDropdown from './MenuDropdown';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  return (
    <header
      className={`relative ${isHome ? 'absolute top-0 z-50 sm:top-4 sm:mx-4 md:top-6 md:mx-6' : 'mb-4 sm:m-4 md:m-6'} `}
    >
      {isHome && (
        <div className="absolute inset-0 mx-auto max-w-[1240px] bg-black/60 shadow-xl backdrop-blur-md sm:rounded-2xl" />
      )}

      {!isHome && (
        <>
          <div
            className="absolute inset-0 mx-auto max-w-[1240px] bg-cover bg-center shadow-xl sm:rounded-2xl"
            style={{
              backgroundImage: `url('${headerBg}')`,
            }}
          />
          <div className="absolute inset-0 mx-auto max-w-[1240px] border border-white/30 bg-black/45 shadow-lg sm:rounded-2xl" />
        </>
      )}

      <div className="relative z-10 mx-auto flex max-w-[1240px] items-center justify-between p-4 text-white sm:py-3 md:px-6 lg:px-8">
        <Link to="/" className="font-heading text-lg font-bold tracking-wider">
          Holidaze
        </Link>

        <nav className="flex gap-4 sm:gap-8 md:gap-12">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `pb-2 pt-[10px] text-sm tracking-wider transition md:tracking-widest ${isActive ? 'border-b-2 border-white' : 'border-b-2 border-transparent'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/venues"
            className={({ isActive }) =>
              `pb-2 pt-[10px] text-sm tracking-wider transition md:tracking-widest ${isActive ? 'border-b-2 border-white' : 'border-b-2 border-transparent'}`
            }
          >
            Venues
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `pb-2 pt-[10px] text-sm tracking-wider transition md:tracking-widest ${isActive ? 'border-b-2 border-white' : 'border-b-2 border-transparent'}`
            }
          >
            Favorites
          </NavLink>
        </nav>

        <button
          type="button"
          className="p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>

        {menuOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
        )}

        <MenuDropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
