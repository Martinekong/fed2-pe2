import { useEffect, useState } from 'react';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 left-2 z-40">
      <div className="mx-auto max-w-[1240px]">
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-black/55 text-white shadow-md backdrop-blur-md transition hover:scale-105 hover:bg-black/70 active:scale-95"
        >
          <KeyboardArrowUpOutlinedIcon />
        </button>
      </div>
    </div>
  );
}
