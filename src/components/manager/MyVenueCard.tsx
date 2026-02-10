import { Link } from 'react-router-dom';

import type { Venue } from '../../api/venues';
import PlaceholderImage from '../../assets/placeholder_image.jpg';

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
  const imageUrl = venue.media?.[0]?.url || PlaceholderImage;
  const imageAlt = venue.media?.[0]?.alt || venue.name;

  const upcomingCount = countUpcomingBookings(venue);

  return (
    <Link
      to={`/venues/${venue.id}`}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg sm:max-h-40 sm:flex-row"
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="h-40 w-full object-cover sm:h-auto sm:min-h-40 sm:w-56 sm:shrink-0"
      />

      <div className="flex w-full justify-between gap-4 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3>{venue?.name}</h3>
            <div className="flex items-center gap-2">
              <FmdGoodOutlinedIcon fontSize="small" />
              <p className="text-sm">
                {venue?.location.city ?? 'Unknown'},{' '}
                {venue?.location.country ?? 'unknown'}
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

        <div className="flex flex-col justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit(venue.id);
            }}
            className="hover:underline"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(venue.id);
            }}
            className="text-error hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}
