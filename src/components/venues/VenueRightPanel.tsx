import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { getToken, getUsername } from '../../lib/storage';
import type { Venue } from '../../api/venues';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';

import CalendarCard from '../booking/CalendarCard';

type Props = {
  venue: Venue;
};

function formatDateRange(from: string, to: string) {
  const start = new Date(from);
  const end = new Date(to);
  const fmt = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return `${fmt.format(start)} - ${fmt.format(end)}`;
}

export default function VenueRightPanel({ venue }: Props) {
  const token = getToken();
  const username = getUsername();
  const loggedIn = Boolean(token);

  const isOwner =
    loggedIn &&
    username &&
    venue.owner?.name &&
    username.toLowerCase() === venue.owner.name.toLowerCase();

  const now = new Date();
  const upcoming = (venue.bookings ?? [])
    .filter((b) => new Date(b.dateTo) >= now)
    .sort(
      (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
    );

  if (!loggedIn) {
    return (
      <div className="flex flex-col gap-4">
        <h3>Booking</h3>
        <p>You must be logged in to book this venue.</p>
        <Link to="/login">
          <Button variant="primary" className="w-40">
            Log in
          </Button>
        </Link>
      </div>
    );
  }

  if (isOwner) {
    return (
      <div className="flex flex-col gap-8">
        <h2>Manage venue</h2>
        <Link to={`/manager/venues/${venue.id}/edit`}>
          <Button variant="primary" className="w-40">
            Edit venue
          </Button>
        </Link>

        <Button
          variant="tertiary"
          className="w-40"
          type="button"
          onClick={() => {
            //TODO: confirm modal / dialog and call delete endpoint
          }}
        >
          Delete venue
        </Button>

        <div>
          <h3 className="py-4">Upcoming bookings</h3>

          {upcoming.length === 0 ? (
            <p>No upcoming bookings yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {upcoming.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col gap-3 rounded-2xl border border-tertiary bg-white p-4 shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <CalendarMonthOutlinedIcon fontSize="small" />
                    <p className="text-sm">
                      {formatDateRange(b.dateFrom, b.dateTo)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <PermIdentityOutlinedIcon fontSize="small" />
                    <p className="text-sm">{b.customer.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <BedOutlinedIcon fontSize="small" />
                    <p className="text-sm">{b.guests} guests</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3>Booking</h3>
      <CalendarCard venue={venue} />
    </div>
  );
}
