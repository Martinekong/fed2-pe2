import { useState } from 'react';
import toast from 'react-hot-toast';

import { isFavorite, toggleFavorite } from '../../lib/storage';

import PlaceholderImage from '../../assets/placeholder_image.jpg';
import SafeImage from '../ui/SafeImage';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type MediaItem = {
  url: string;
  alt?: string;
};

type Props = {
  venueId: string;
  media?: MediaItem[];
  name: string;
};

export default function VenueImgCarousel({ venueId, media = [], name }: Props) {
  const [favorite, setFavorite] = useState(() => isFavorite(venueId));
  const [index, setIndex] = useState(0);

  const cleaned = media.filter((m) => m?.url);
  const images =
    cleaned.length > 0 ? cleaned : [{ url: PlaceholderImage, alt: name }];

  const total = images.length;
  const safeIndex = Math.min(index, total - 1);
  const active = images[safeIndex];

  function prev() {
    setIndex((i) => (i - 1 + total) % total);
  }

  function next() {
    setIndex((i) => (i + 1) % total);
  }

  function handleToggleFavorite() {
    const nowFavorite = toggleFavorite(venueId);
    setFavorite(nowFavorite);
    toast.success(
      nowFavorite ? 'Venue added to favorites' : 'Venue removed from favorites',
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md">
      <SafeImage
        src={active.url}
        alt={active.alt || name}
        className="h-64 w-full object-cover md:h-[460px]"
      />

      <button
        type="button"
        onClick={handleToggleFavorite}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-black/50 p-3 text-white backdrop-blur"
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute bottom-0 left-0 rounded-bl-2xl rounded-tr-2xl bg-black/50 p-3 text-white backdrop-blur"
          >
            <ArrowBackIcon />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute bottom-0 right-0 rounded-br-2xl rounded-tl-2xl bg-black/50 p-3 text-white backdrop-blur"
          >
            <ArrowForwardIcon />
          </button>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-2 backdrop-blur">
            <div className="flex items-center gap-3">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    'h-2 w-2 rounded-full transition',
                    i === safeIndex ? 'bg-white' : 'bg-white/30',
                  ].join(' ')}
                ></span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
