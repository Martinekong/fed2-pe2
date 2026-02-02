import type { Venue } from '../../api/venues';
import PlaceholderImg from '../../assets/placeholder_image.jpg';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';

type Props = {
  venue: Venue;
};

export default function VenueDetails({ venue }: Props) {
  const city = venue.location?.city ?? 'Unknown';
  const country = venue.location?.country ?? 'unknown';

  const ownerName = venue.owner?.name ?? 'Unknown';
  const ownerAvatarURl = venue.owner?.avatar?.url || PlaceholderImg;
  const ownerAvatarAlt = venue.owner?.avatar?.alt ?? ownerName;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1>{venue.name}</h1>
        <div className="flex opacity-70">
          <FmdGoodOutlinedIcon fontSize="small" />
          <p className="text-sm">
            {city}, {country}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-1">
        <p className="text-4xl font-bold">${venue.price}</p>
        <p className="pt-4 text-sm">/ night</p>
      </div>

      <div>
        <h3>Description</h3>
        <p>{venue.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <h3>Specifications</h3>

        <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
          <BedOutlinedIcon />
          <p className="text-sm">Up to {venue.maxGuests} guests</p>
        </div>

        {venue.meta.wifi && (
          <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
            <WifiOutlinedIcon />
            <p className="text-sm">Wifi</p>
          </div>
        )}

        {venue.meta.breakfast && (
          <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
            <RestaurantOutlinedIcon />
            <p className="text-sm">Breakfast</p>
          </div>
        )}

        {venue.meta.parking && (
          <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
            <LocalParkingOutlinedIcon />
            <p className="text-sm">Parking</p>
          </div>
        )}

        {venue.meta.pets && (
          <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
            <PetsOutlinedIcon />
            <p className="text-sm">Pets allowed</p>
          </div>
        )}
      </div>

      <div>
        <h3>Venue Owner</h3>
        <div className="flex items-center gap-4 pt-4">
          <img
            src={ownerAvatarURl}
            alt={ownerAvatarAlt}
            className="h-10 w-10 rounded-full object-cover"
          />
          <p>{ownerName}</p>
        </div>
      </div>
    </div>
  );
}
