import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { deleteVenue, type Venue } from '../../api/venues';
import { ApiError } from '../../api/client';

import CalendarCard from '../booking/CalendarCard';
import ConfirmModal from '../ui/ConfirmModal';
import Button from '../ui/Button';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import { useAuth } from '../../app/authContext';

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
  const navigate = useNavigate();

  const { username, loggedIn } = useAuth();

  const ownerName = venue.owner?.name.toLowerCase();
  const isOwner = loggedIn && username?.toLowerCase() === ownerName;

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteVenue(venue.id);
      toast.success('Venue deleted!');
      setDeleteOpen(false);
      navigate('/manager/venues');
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : 'Could not delete venue',
      );
    } finally {
      setIsDeleting(false);
    }
  }

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
    const now = new Date();
    const upcoming = (venue.bookings ?? [])
      .filter((b) => new Date(b.dateTo) >= now)
      .sort(
        (a, b) =>
          new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
      );

    return (
      <div className="flex flex-col gap-8">
        <div>
          <h2>Manage venue</h2>
          <p className="mt-1 text-sm opacity-80">This venue belongs to you.</p>
        </div>
        <Link to={`/manager/venues/${venue.id}/edit`}>
          <Button variant="primary" className="w-72">
            Edit venue
          </Button>
        </Link>

        <Button
          variant="tertiary"
          className="w-72"
          type="button"
          disabled={isDeleting}
          onClick={() => setDeleteOpen(true)}
        >
          Delete venue
        </Button>

        <ConfirmModal
          open={deleteOpen}
          title="venue"
          isConfirming={isDeleting}
          onClose={() => !isDeleting && setDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />

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
