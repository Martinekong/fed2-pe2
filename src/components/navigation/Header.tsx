import { useState } from 'react';
import { Link } from 'react-router-dom';

import headerBg from '../../assets/header-bg.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDropdown from './MenuDropdown';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative mb-4 sm:m-4 md:m-6">
      <div
        className="absolute inset-0 mx-auto max-w-[1240px] bg-cover bg-center sm:rounded-2xl"
        style={{
          backgroundImage: `url('${headerBg}')`,
        }}
      />
      <div className="absolute inset-0 mx-auto max-w-[1240px] bg-black/30 sm:rounded-2xl" />

      <div className="relative z-10 mx-auto flex max-w-[1240px] items-center justify-between p-4 text-white md:px-6 lg:px-8">
        <Link to="/" className="font-heading text-lg font-bold tracking-wider">
          Holidaze
        </Link>

        <nav className="flex gap-4 sm:gap-8">
          <Link to="/" className="py-2 text-sm">
            Home
          </Link>
          <Link to="/venues" className="py-2 text-sm">
            Venues
          </Link>
          <Link to="/favorites" className="py-2 text-sm">
            Favorites
          </Link>
        </nav>

        <button
          type="button"
          className="p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
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
