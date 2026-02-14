import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import type { Venue } from '../../api/venues';

import SafeImage from '../ui/SafeImage';

import { toggleFavorite, isFavorite } from '../../lib/storage';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
  venue: Venue;
  onFavoriteChange?: (venueId: string, nowFavorite: boolean) => void;
};

export default function VenueCard({ venue, onFavoriteChange }: Props) {
  const [favorite, setFavorite] = useState(() => isFavorite(venue.id));

  function handleFavoriteClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const nowFavorite = toggleFavorite(venue.id);
    setFavorite(nowFavorite);

    toast.success(
      nowFavorite ? 'Venue added to favorites' : 'Venue removed from favorites',
    );

    onFavoriteChange?.(venue.id, nowFavorite);
  }

  return (
    <Link
      to={`/venues/${venue.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg transition hover:shadow-xl"
    >
      <div className="overflow-hidden rounded-t-2xl">
        <SafeImage
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt ?? venue.name}
          className="h-60 w-full rounded-t-2xl object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="truncate">{venue.name}</h3>
          <div className="flex opacity-70">
            <FmdGoodOutlinedIcon fontSize="small" />
            <p className="text-sm">
              {venue.location?.city ?? 'Unknown'},{' '}
              {venue.location?.country ?? 'unknown'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {venue.meta.wifi && (
            <div className="flex gap-1">
              <WifiIcon fontSize="small" />
              <p className="text-sm">Wifi</p>
            </div>
          )}

          {venue.meta.breakfast && (
            <div className="flex gap-1">
              <RestaurantIcon fontSize="small" />
              <p className="text-sm">Breakfast</p>
            </div>
          )}

          {venue.meta.pets && (
            <div className="flex gap-1">
              <PetsIcon fontSize="small" />
              <p className="text-sm">Pets</p>
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center gap-1">
          <p className="text-xl font-bold">${venue.price}</p>
          <p className="pt-1 text-sm">/ night</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-black/50 p-3 text-white shadow-xl backdrop-blur transition duration-300 hover:bg-black/60"
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
    </Link>
  );
}
