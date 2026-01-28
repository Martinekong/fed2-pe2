import { Link } from 'react-router-dom';
import type { Venue } from '../../api/venues';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PetsIcon from '@mui/icons-material/Pets';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { toggleFavorite, isFavorite } from '../../lib/storage';

import PlaceholderImage from '../../assets/placeholder_image.jpg';

type Props = {
  venue: Venue;
};

export default function VenueCard({ venue }: Props) {
  const [favorite, setFavorite] = useState(() => isFavorite(venue.id));

  function handleFavoriteClick(e: React.MouseEvent) {
    e.preventDefault();

    const nowFavorite = toggleFavorite(venue.id);
    setFavorite(nowFavorite);

    toast.success(
      nowFavorite ? 'Venue added to favorites' : 'Venue removed from favorites',
    );
  }

  const imageUrl = venue.media[0]?.url || PlaceholderImage;
  const imageAlt = venue.media[0]?.alt || venue.name;

  return (
    <Link
      to={`/venues/${venue.id}`}
      className="group relative flex flex-col rounded-2xl shadow-md transition hover:shadow-lg"
    >
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-60 w-full rounded-t-2xl object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h3>{venue.name}</h3>
          <div className="flex opacity-70">
            <FmdGoodOutlinedIcon fontSize="small" />
            <p className="text-sm">
              {venue.location.city ?? 'Unknown'},{' '}
              {venue.location.country ?? 'unknown'}
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
          <p className="text-2xl font-bold">${venue.price}</p>
          <p className="pt-2 text-sm">/ night</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-black/50 p-3 text-white"
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
    </Link>
  );
}
