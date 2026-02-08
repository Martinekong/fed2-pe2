import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../app/authContext';

import Button from '../../components/ui/Button';
import BookingCard from '../../components/booking/BookingCard';

import { getBookingsByProfile } from '../../api/profiles';
import { updateBooking, deleteBooking, type Booking } from '../../api/bookings';
import toast from 'react-hot-toast';

import CalendarModal from '../../components/booking/CalendarModal';
import ConfirmModal from '../../components/ui/ConfirmModal';
import LoadingLine from '../../components/ui/LoadingLine';

export default function MyBookingsPage() {
  const { username } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        if (!username) {
          setError('Missing username. Please log in again.');
          setBookings([]);
          return;
        }

        const data = await getBookingsByProfile(username);
        const sorted = [...data].sort(
          (a, b) =>
            new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
        );
        setBookings(sorted);
        console.log('data:', data);
      } catch {
        setError('Could not load bookings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [username]);

  const bookingToEdit = bookings.find((b) => b.id === editId) ?? null;

  function handleEditClick(id: string) {
    if (isEditing || isDeleting || isLoading) return;
    setEditId(id);
  }

  function handleDeleteClick(id: string) {
    if (isEditing || isDeleting || isLoading) return;
    setDeleteId(id);
  }

  async function handleConfirmDelete() {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteBooking(deleteId);
      setBookings((prev) => prev.filter((b) => b.id !== deleteId));
      toast.success('Booking deleted');
      setDeleteId(null);
    } catch {
      toast.error('Could not delete booking');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="page-wrapper gap-8">
      <h1>My Bookings</h1>

      {isLoading && <LoadingLine text="Getting your bookings..." />}
      {!isLoading && error && <p className="text-error">{error}</p>}
      {!isLoading && !error && bookings.length === 0 && (
        <p>You have no bookings yet.</p>
      )}

      {!isLoading && !error && bookings.length > 0 && (
        <>
          <p>You have {bookings.length} upcoming bookings:</p>
          <div className="flex flex-col gap-8">
            {bookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          <Link to="/venues">
            <Button variant="primary" className="w-56">
              Go to venues
            </Button>
          </Link>

          <CalendarModal
            open={editId !== null}
            booking={bookingToEdit}
            isSaving={isEditing}
            onClose={() => !isEditing && setEditId(null)}
            onSave={async (next) => {
              if (!bookingToEdit) return;

              setIsEditing(true);
              try {
                await updateBooking(bookingToEdit.id, next);

                toast.success('Booking updated!');
                setEditId(null);

                if (username) {
                  const data = await getBookingsByProfile(username);
                  const sorted = [...data].sort(
                    (a, b) =>
                      new Date(a.dateFrom).getTime() -
                      new Date(b.dateFrom).getTime(),
                  );
                  setBookings(sorted);
                }
              } catch {
                toast.error('Could not update booking');
              } finally {
                setIsEditing(false);
              }
            }}
          />

          <ConfirmModal
            open={deleteId !== null}
            title="booking"
            onClose={() => !isDeleting && setDeleteId(null)}
            onConfirm={handleConfirmDelete}
            isConfirming={isDeleting}
          />
        </>
      )}
    </div>
  );
}
