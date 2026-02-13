import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import hero1 from '../../assets/hero/hero-1.webp';
import hero2 from '../../assets/hero/hero-2.webp';
import hero3 from '../../assets/hero/hero-3.webp';
import hero4 from '../../assets/hero/hero-4.webp';
import Button from '../ui/Button';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

type HeroItem = {
  id: number;
  title: string;
  image: string;
  alt: string;
  query: string;
};

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

export default function HeroSection() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  function goToVenues() {
    navigate(`/venues?search=${encodeURIComponent(active.query)}`);
  }

  return (
    <section className="relative -mt-[76px] mb-8 h-[100svh] w-full bg-black sm:-mt-[66px]">
      <img
        src={active.image}
        alt={active.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative h-full">
        <div className="mx-auto flex h-full max-w-5xl flex-row items-center gap-6 px-5 sm:gap-10 sm:px-8 md:gap-12">
          <div className="flex flex-col items-center gap-8 md:gap-12 lg:gap-14">
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`grid h-8 w-8 place-items-center rounded-full border font-semibold backdrop-blur-sm transition sm:h-10 sm:w-10 ${isActive ? 'border-white bg-white text-black' : 'border-white/60 bg-black/35 text-white/80 hover:border-white hover:bg-black/45 hover:text-white'}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="text-white [text-shadow:_0_6px_30px_rgba(0,0,0,0.7)]">
            <p className="pb-2 font-heading text-4xl capitalize tracking-wider sm:text-5xl md:text-6xl">
              explore
            </p>
            <p className="font-heading text-7xl font-bold capitalize sm:text-9xl md:text-[10rem] lg:text-[12rem]">
              {active.title}
            </p>

            <div className="ml-2 mt-[30px]">
              <Button
                variant="secondary"
                type="button"
                onClick={goToVenues}
                className="flex w-52 items-center rounded-full border border-white/60 bg-black/35 text-white backdrop-blur-sm hover:border-white hover:bg-black/45 hover:text-white"
              >
                Venues
                <KeyboardArrowRightOutlinedIcon className="pt-0.5" />
              </Button>
            </div>
          </div>
        </div>
        <a
          href="#discover"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-4 py-2 text-sm tracking-wide text-white shadow-lg ring-1 ring-white/10 backdrop-blur-sm hover:bg-black/45 hover:text-white"
        >
          More destinations
          <KeyboardDoubleArrowDownIcon />
        </a>
      </div>
    </section>
  );
}
