import type { Venue } from '../../api/venues';

import VenueLocation from './VenueLocation';
import VenuePrice from './VenuePrice';
import VenueDescription from './VenueDescription';
import VenueSpecifications from './VenueSpecifications';
import VenueOwner from './VenueOwner';

type Props = {
  venue: Venue;
  showPrice?: boolean;
  titleAs?: 'h1' | 'h3';
};

export default function VenueDetails({
  venue,
  showPrice = true,
  titleAs = 'h1',
}: Props) {
  const Title = titleAs;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Title>{venue.name}</Title>
        <VenueLocation
          city={venue.location.city}
          country={venue.location.country}
        />
      </div>

      {showPrice && <VenuePrice price={venue.price} />}

      <VenueDescription description={venue.description} />
      <VenueSpecifications maxGuests={venue.maxGuests} meta={venue.meta} />
      <VenueOwner
        name={venue.owner.name}
        avatarUrl={venue.owner.avatar?.url}
        avatarAlt={venue.owner.avatar?.alt}
      />
    </div>
  );
}
