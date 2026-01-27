import { Link } from 'react-router-dom';
import type { Venue } from '../../api/venues';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PetsIcon from '@mui/icons-material/Pets';

type Props = {
  venue: Venue;
};

export default function VenueCard({ venue }: Props) {
  const image = venue.media[0].url;

  return (
    <Link
      to={`/venues/${venue.id}`}
      className="group flex flex-col rounded-2xl shadow-md transition hover:shadow-lg"
    >
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={venue.media[0].alt ?? venue.name}
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
    </Link>
  );
}
