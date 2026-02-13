import type { Venue } from '../../api/venues';

import HorizontalCard from '../profile/HorizontalCard';
import CardActions from '../profile/CardActions';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

type Props = {
  venue: Venue;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

function countUpcomingBookings(venue: Venue) {
  const now = new Date();
  return (venue.bookings ?? []).filter((b) => new Date(b.dateTo) >= now).length;
}

export default function MyVenueCard({ venue, onEdit, onDelete }: Props) {
  const upcomingCount = countUpcomingBookings(venue);

  return (
    <HorizontalCard
      to={`/venues/${venue.id}`}
      imageSrc={venue.media?.[0]?.url}
      imageAlt={venue.media?.[0]?.alt || venue.name || 'Venue image'}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3>{venue.name}</h3>
          <div className="flex items-center gap-2">
            <FmdGoodOutlinedIcon fontSize="small" />
            <p className="text-sm">
              {venue.location?.city ?? 'Unknown'},{' '}
              {venue.location?.country ?? 'unknown'}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2">
            <AccountBalanceWalletOutlinedIcon fontSize="small" />
            <p className="text-small">${venue.price}/night</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarMonthOutlinedIcon fontSize="small" />
            <p className="text-small">{upcomingCount} upcoming bookings</p>
          </div>
        </div>
      </div>

      <CardActions
        onEdit={() => onEdit(venue.id)}
        onDelete={() => onDelete(venue.id)}
      />
    </HorizontalCard>
  );
}
