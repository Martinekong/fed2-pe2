import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { nightsBetween } from '../../utils/date';

import {
  deleteBooking,
  getSingleBooking,
  updateBooking,
  type Booking,
} from '../../api/bookings';

import LoadingLine from '../../components/ui/LoadingLine';
import Button from '../../components/ui/Button';
import CalendarModal from '../../components/booking/CalendarModal';
import ConfirmModal from '../../components/ui/ConfirmModal';

import BookingDetails from '../../components/booking/BookingDetails';
import VenueImgCarousel from '../../components/venues/VenueImgCarousel';
import VenueDetails from '../../components/venues/VenueDetails';

export default function BookingPage() {
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        if (!id) {
          setBooking(null);
          setError('Missing booking id.');
          return;
        }

        const data = await getSingleBooking(id);
        setBooking(data);
      } catch {
        setError('Could not load booking. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [id]);

  const nights = booking ? nightsBetween(booking.dateFrom, booking.dateTo) : 0;
  const pricePerNight = booking?.venue?.price ?? 0;
  const total = nights * pricePerNight;

  return (
    <div className="page-wrapper md:grid md:grid-cols-2">
      <h1 className="md:col-span-2">Your Booking</h1>
      {isLoading && <LoadingLine text="Getting your booking..." />}
      {!isLoading && error && <p className="text-error">{error}</p>}
      {!isLoading && !error && !booking && <p>Booking not found.</p>}
      {!isLoading && !error && booking && (
        <>
          {booking.venue && (
            <div className="md:col-span-2">
              <VenueImgCarousel
                venueId={booking.venue.id}
                media={booking.venue.media}
                name={booking.venue.name}
              />
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <h2>Booking details</h2>

              <BookingDetails
                name={booking.customer.name}
                guests={booking.guests}
                price={pricePerNight}
                dateFrom={booking.dateFrom}
                dateTo={booking.dateTo}
              />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="border-b border-t border-secondary py-8 tracking-wider">
                Total: ${total}
              </h3>

              <div className="mt-auto">
                <Button
                  variant="primary"
                  className="mb-4 w-72"
                  type="button"
                  onClick={() => setEditOpen(true)}
                  disabled={isEditing || isDeleting}
                >
                  Edit booking
                </Button>
                <Button
                  variant="tertiary"
                  className="w-72"
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  disabled={isEditing || isDeleting}
                >
                  Delete booking
                </Button>
              </div>
            </div>
          </div>

          {booking.venue && (
            <div className="flex flex-col gap-8">
              <h2>Venue details</h2>
              <VenueDetails
                venue={booking.venue}
                showPrice={false}
                titleAs="h3"
              />
            </div>
          )}

          <CalendarModal
            open={editOpen}
            booking={booking}
            isSaving={isEditing}
            onClose={() => !isEditing && setEditOpen(false)}
            onSave={async (next) => {
              setIsEditing(true);
              try {
                const updated = await updateBooking(booking.id, next);

                setBooking((prev) => (prev ? { ...prev, ...updated } : prev));

                toast.success('Your booking has been updated!');
                setEditOpen(false);
              } catch {
                toast.error('Could not update booking. Please try again.');
              } finally {
                setIsEditing(false);
              }
            }}
          />

          <ConfirmModal
            open={deleteOpen}
            title="booking"
            isConfirming={isDeleting}
            onClose={() => !isDeleting && setDeleteOpen(false)}
            onConfirm={async () => {
              setIsDeleting(true);
              try {
                await deleteBooking(booking.id);
                toast.success('Your booking has been deleted!');
                navigate('/bookings');
              } catch {
                toast.error('Could not delete booking. Please try again.');
              } finally {
                setIsDeleting(false);
              }
            }}
          />
        </>
      )}
    </div>
  );
}
