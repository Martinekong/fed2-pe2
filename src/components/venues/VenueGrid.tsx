import type { Venue } from '../../api/venues';
import VenueCard from './VenueCard';

type Props = {
  venues: Venue[];
  onFavoriteChange?: (venueId: string, nowFavorite: boolean) => void;
};

export default function VenueGrid({ venues, onFavoriteChange }: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          onFavoriteChange={onFavoriteChange}
        />
      ))}
    </div>
  );
}
