import type { Booking } from '../../api/bookings';
import { Link } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import PlaceholderImage from '../../assets/placeholder_image.jpg';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

type Props = {
  booking: Booking;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatDateRange(from: string, to: string) {
  const start = new Date(from);
  const end = new Date(to);
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
}

function nightsBetween(from: string, to: string) {
  return Math.max(0, differenceInCalendarDays(new Date(to), new Date(from)));
}

export default function BookingCard({ booking, onEdit, onDelete }: Props) {
  const venue = booking.venue;

  const imageUrl = venue?.media[0]?.url || PlaceholderImage;
  const imageAlt = venue?.media[0]?.alt || venue?.name || 'Venue image';

  const nights = nightsBetween(booking.dateFrom, booking.dateTo);
  const total = venue?.price ? nights * venue.price : null;

  return (
    <Link
      to={`/bookings/${booking.id}`}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg sm:max-h-[170px] sm:flex-row"
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="h-40 w-full object-cover sm:h-auto sm:w-56"
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
              <BedOutlinedIcon fontSize="small" />
              <p className="text-sm">{booking.guests} guests</p>
            </div>
            <div className="flex items-center gap-2">
              <AccountBalanceWalletOutlinedIcon fontSize="small" />
              <p className="text-sm">
                {total !== null ? `$${total.toLocaleString('en-GB')}` : '-'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CalendarMonthOutlinedIcon fontSize="small" />
              <p className="text-sm">
                {formatDateRange(booking.dateFrom, booking.dateTo)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit(booking.id);
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
              onDelete(booking.id);
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
