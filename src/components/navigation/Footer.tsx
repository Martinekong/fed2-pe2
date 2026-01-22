import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [currentYear] = useState(() => new Date().getFullYear());

  return (
    <footer className="flex flex-col items-center gap-4 bg-secondary p-4 text-white">
      <Link
        to="/"
        className="w-[60%] border-b pb-4 text-center font-heading text-2xl font-black capitalize"
      >
        holidaze
      </Link>
      <p>&copy; {currentYear} Martine Kongsrud. All rights reserved.</p>
    </footer>
  );
}
