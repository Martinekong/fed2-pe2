import type { Venue } from '../../api/venues';
import PlaceholderImg from '../../assets/placeholder_image.jpg';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import VenueSpecifications from './VenueSpecifications';

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

      <VenueSpecifications maxGuests={venue.maxGuests} meta={venue.meta} />

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
