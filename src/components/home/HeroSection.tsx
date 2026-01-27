import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import hero1 from '../../assets/hero/hero-1.webp';
import hero2 from '../../assets/hero/hero-2.webp';
import hero3 from '../../assets/hero/hero-3.webp';
import hero4 from '../../assets/hero/hero-4.webp';
import Button from '../ui/Button';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

type HeroItem = {
  id: number;
  title: string;
  image: string;
  alt: string;
  query: string;
};

export default function HeroSection() {
  const navigate = useNavigate();

  const items: HeroItem[] = [
    {
      id: 1,
      title: 'vietnam',
      image: hero1,
      alt: 'water temple in between mountains',
      query: 'vietnam',
    },
    {
      id: 2,
      title: 'greece',
      image: hero2,
      alt: 'seaside town with an island',
      query: 'greece',
    },
    {
      id: 3,
      title: 'kenya',
      image: hero3,
      alt: 'a lone tree in sunset on safari',
      query: 'kenya',
    },
    {
      id: 4,
      title: 'canada',
      image: hero4,
      alt: 'white mountains over lake',
      query: 'canada',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  function goToVenues() {
    navigate(`/venues?search=${encodeURIComponent(active.query)}`);
  }

  return (
    <section className="relative mb-8 h-[94svh] w-full">
      <img
        src={active.image}
        alt={active.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative h-full">
        <div className="mx-auto flex h-full max-w-5xl flex-row items-center gap-8 px-8 sm:gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-8">
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show ${item.title}`}
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 font-semibold transition ${isActive ? 'border-white bg-white text-black' : 'border-white/60 bg-white/20 text-white/80 hover:border-white hover:text-white'}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="text-white">
            <p className="pb-4 font-heading text-5xl font-bold capitalize sm:text-7xl md:text-8xl">
              explore
            </p>
            <p className="font-heading text-6xl font-bold capitalize sm:text-9xl md:text-[10rem]">
              {active.title}
            </p>

            <div className="mt-6">
              <Button
                variant="secondary"
                type="button"
                onClick={goToVenues}
                className="w-40 border-white text-white hover:bg-white/10 hover:text-white"
              >
                Venues
              </Button>
            </div>
          </div>
        </div>
        <a
          href="#discover"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/90 hover:text-white"
        >
          View more
          <KeyboardDoubleArrowDownIcon />
        </a>
      </div>
    </section>
  );
}
