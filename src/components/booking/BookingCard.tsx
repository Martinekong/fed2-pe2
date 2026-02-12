import type { Booking } from '../../api/bookings';

import HorizontalCard from '../profile/HorizontalCard';
import CardActions from '../profile/CardActions';

import { nightsBetween, formatDateRange } from '../../utils/date';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

type Props = {
  booking: Booking;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function BookingCard({ booking, onEdit, onDelete }: Props) {
  const venue = booking.venue;

  const nights = nightsBetween(booking.dateFrom, booking.dateTo);
  const total = venue ? nights * venue.price : null;

  return (
    <HorizontalCard
      to={`/bookings/${booking.id}`}
      imageSrc={venue?.media[0]?.url}
      imageAlt={venue?.media[0]?.alt || venue?.name || 'Venue image'}
    >
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

      <CardActions
        onEdit={() => onEdit(booking.id)}
        onDelete={() => onDelete(booking.id)}
      />
    </HorizontalCard>
  );
}
